// ========================================================
// Audio Playback Engine
// Online CDN Streaming + Offline Blob Fallback + MediaSession API
// ========================================================

class QuranAudioManager {
  constructor() {
    this.audio = new Audio();
    this.currentSurah = null;
    this.currentQari = '05'; // Default: Misyari Rasyid
    this.isTranslation = false; // false = Murottal Only, true = Murottal + Terjemahan
    this.isPlaying = false;
    this.isLoading = false;
    this.repeatMode = 'all'; // 'off' | 'one' | 'all'
    this.sleepTimerId = null;
    this.sleepTimerEnd = null;

    this.currentBlobUrl = null;

    this.listeners = {
      play: [],
      pause: [],
      timeupdate: [],
      ended: [],
      loading: [],
      error: [],
      trackchange: [],
      timerupdate: []
    };

    this._bindAudioEvents();
  }

  _bindAudioEvents() {
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this._emit('play', this.currentSurah);
      this._updateMediaSessionState();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this._emit('pause', this.currentSurah);
      this._updateMediaSessionState();
    });

    this.audio.addEventListener('timeupdate', () => {
      this._emit('timeupdate', {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration || 0,
        percent: this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0
      });
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoading = true;
      this._emit('loading', true);
    });

    this.audio.addEventListener('canplay', () => {
      this.isLoading = false;
      this._emit('loading', false);
    });

    this.audio.addEventListener('ended', () => {
      this._handleTrackEnd();
    });

    this.audio.addEventListener('error', (e) => {
      this.isLoading = false;
      console.error('Audio playback error:', e);
      this._emit('error', 'Gagal memuat audio. Periksa koneksi internet atau coba Qari lain.');
    });

    // Check sleep timer periodically
    setInterval(() => {
      if (this.sleepTimerEnd) {
        const remaining = Math.max(0, Math.round((this.sleepTimerEnd - Date.now()) / 1000));
        this._emit('timerupdate', remaining);
        if (remaining <= 0) {
          this.pause();
          this.cancelSleepTimer();
        }
      }
    }, 1000);
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  _emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  getAudioUrlForSurah(surah) {
    if (this.isTranslation && surah.audioTerjemahan) {
      return { url: surah.audioTerjemahan, isTerjemahan: true };
    }
    const qariKey = this.currentQari;
    const url = (surah.audioFull && surah.audioFull[qariKey]) ||
                (surah.audioFull && surah.audioFull['05']) ||
                `https://cdn.equran.id/audio-full/Misyari-Rasyid-Al-Afasi/${String(surah.nomor).padStart(3, '0')}.mp3`;
    return { url, isTerjemahan: false };
  }

  async playSurah(surah, autoPlay = true) {
    if (!surah) return;
    this.currentSurah = surah;
    this.isLoading = true;
    this._emit('loading', true);
    this._emit('trackchange', surah);

    // Revoke previous blob URL if exists to avoid memory leak
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }

    let sourceUrl = '';
    let isOffline = false;

    // Check if available offline in IndexedDB
    try {
      const offlineBlob = await window.StorageManager.getAudio(
        surah.nomor,
        this.currentQari,
        this.isTranslation
      );
      if (offlineBlob) {
        this.currentBlobUrl = URL.createObjectURL(offlineBlob);
        sourceUrl = this.currentBlobUrl;
        isOffline = true;
      }
    } catch (err) {
      console.warn('Storage check failed:', err);
    }

    if (!sourceUrl) {
      const target = this.getAudioUrlForSurah(surah);
      sourceUrl = target.url;
    }

    this.audio.src = sourceUrl;
    this.audio.load();

    if (autoPlay) {
      try {
        await this.audio.play();
      } catch (err) {
        console.warn('AutoPlay prevented or failed:', err);
      }
    }

    this._setupMediaSession(isOffline);
    this._saveLastPlayed(surah);
    return isOffline;
  }

  togglePlayPause() {
    if (!this.currentSurah) return;
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(e => console.error(e));
    }
  }

  pause() {
    this.audio.pause();
  }

  seek(seconds) {
    if (!isNaN(seconds) && this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration));
    }
  }

  skip(seconds) {
    if (this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(this.audio.currentTime + seconds, this.audio.duration));
    }
  }

  setVolume(val) {
    this.audio.volume = Math.max(0, Math.min(1, val));
  }

  setPlaybackRate(rate) {
    this.audio.playbackRate = rate;
  }

  setQari(qariId) {
    this.currentQari = qariId;
    if (this.currentSurah) {
      const wasPlaying = this.isPlaying;
      const curTime = this.audio.currentTime;
      this.playSurah(this.currentSurah, wasPlaying).then(() => {
        // seek back approximately if changing reciter
        if (curTime > 0) this.seek(curTime);
      });
    }
  }

  setTranslationMode(enable) {
    this.isTranslation = !!enable;
    if (this.currentSurah) {
      const wasPlaying = this.isPlaying;
      this.playSurah(this.currentSurah, wasPlaying);
    }
  }

  cycleRepeatMode() {
    if (this.repeatMode === 'off') {
      this.repeatMode = 'all';
    } else if (this.repeatMode === 'all') {
      this.repeatMode = 'one';
    } else {
      this.repeatMode = 'off';
    }
    return this.repeatMode;
  }

  next() {
    if (!this.currentSurah) return;
    const nextNo = this.currentSurah.nomor < 114 ? this.currentSurah.nomor + 1 : 1;
    const nextSurah = window.QURAN_DATA.find(s => s.nomor === nextNo);
    if (nextSurah) this.playSurah(nextSurah, true);
  }

  prev() {
    if (!this.currentSurah) return;
    if (this.audio.currentTime > 4) {
      this.seek(0);
      return;
    }
    const prevNo = this.currentSurah.nomor > 1 ? this.currentSurah.nomor - 1 : 114;
    const prevSurah = window.QURAN_DATA.find(s => s.nomor === prevNo);
    if (prevSurah) this.playSurah(prevSurah, true);
  }

  _handleTrackEnd() {
    if (this.repeatMode === 'one') {
      this.seek(0);
      this.audio.play();
    } else if (this.repeatMode === 'all') {
      this.next();
    } else {
      this.isPlaying = false;
      this._emit('ended', this.currentSurah);
    }
  }

  setSleepTimer(minutes) {
    this.cancelSleepTimer();
    if (minutes > 0) {
      this.sleepTimerEnd = Date.now() + minutes * 60 * 1000;
    }
  }

  cancelSleepTimer() {
    this.sleepTimerEnd = null;
    this._emit('timerupdate', 0);
  }

  _saveLastPlayed(surah) {
    try {
      localStorage.setItem('last_played_surah', JSON.stringify({
        nomor: surah.nomor,
        namaLatin: surah.namaLatin,
        arti: surah.arti,
        qariId: this.currentQari,
        isTranslation: this.isTranslation,
        savedAt: Date.now()
      }));
    } catch (e) {}
  }

  getLastPlayed() {
    try {
      const data = localStorage.getItem('last_played_surah');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  // MediaSession API: Android notification bar & iOS lock screen
  _setupMediaSession(isOffline = false) {
    if (!('mediaSession' in navigator) || !this.currentSurah) return;

    const qariObj = window.QARI_LIST.find(q => q.id === this.currentQari);
    const artistName = this.isTranslation
      ? 'Misyari Rasyid (Terjemahan Indonesia)'
      : (qariObj ? qariObj.name : 'Murottal Al-Quran');

    navigator.mediaSession.metadata = new MediaMetadata({
      title: `${this.currentSurah.nomor}. ${this.currentSurah.namaLatin} (${this.currentSurah.arti})`,
      artist: `${artistName} ${isOffline ? '• [Offline]' : '• [Online]'}`,
      album: `Al-Qur'anul Karim (Juz ${this._getJuzEstimate(this.currentSurah.nomor)})`,
      artwork: [
        { src: 'assets/icons/logo-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'assets/icons/logo-512.png', sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => this.togglePlayPause());
    navigator.mediaSession.setActionHandler('pause', () => this.togglePlayPause());
    navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
    navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
    navigator.mediaSession.setActionHandler('seekbackward', () => this.skip(-10));
    navigator.mediaSession.setActionHandler('seekforward', () => this.skip(10));
  }

  _updateMediaSessionState() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = this.isPlaying ? 'playing' : 'paused';
    }
  }

  _getJuzEstimate(surahNo) {
    if (surahNo <= 2) return '1 - 2';
    if (surahNo <= 3) return '3 - 4';
    if (surahNo <= 4) return '4 - 6';
    if (surahNo <= 9) return '6 - 11';
    if (surahNo >= 78) return '30 (Juz Amma)';
    return '1 - 30';
  }
}

window.QuranAudioManager = QuranAudioManager;
