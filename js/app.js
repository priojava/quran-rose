// ========================================================
// Main Application Controller (Murottal Quran & Audio Player)
// Handles UI rendering, search, offline downloads, modals,
// read-along verses, and interactive Tasbih Digital
// ========================================================

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Storage & Audio Manager
  await window.StorageManager.init();
  const player = new window.QuranAudioManager();
  window.appPlayer = player;

  // DOM Elements
  const surahListEl = document.getElementById('surahList');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const filterChips = document.querySelectorAll('.chip-btn');
  const toastEl = document.getElementById('appToast');
  const toastText = document.getElementById('toastText');

  // Mini Player Elements
  const miniPlayerBar = document.getElementById('miniPlayerBar');
  const miniBadge = document.getElementById('miniBadge');
  const miniTitle = document.getElementById('miniTitle');
  const miniSubtitle = document.getElementById('miniSubtitle');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const miniCloseBtn = document.getElementById('miniCloseBtn');

  // Fullscreen Player Elements
  const playerScreen = document.getElementById('playerScreen');
  const playerCloseBtn = document.getElementById('playerCloseBtn');
  const medallionArabic = document.getElementById('medallionArabic');
  const medallionNumber = document.getElementById('medallionNumber');
  const playerSurahTitle = document.getElementById('playerSurahTitle');
  const playerSurahSubtitle = document.getElementById('playerSurahSubtitle');
  const playerQariBadge = document.getElementById('playerQariBadge');
  const murottalSwitch = document.getElementById('murottalSwitch');
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const rewind10Btn = document.getElementById('rewind10Btn');
  const forward10Btn = document.getElementById('forward10Btn');
  const playerProgressBar = document.getElementById('playerProgressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const volumeSlider = document.getElementById('volumeSlider');
  const btnFavorite = document.getElementById('btnFavorite');
  const btnDownloadCurrent = document.getElementById('btnDownloadCurrent');
  const btnShare = document.getElementById('btnShare');
  const btnRepeat = document.getElementById('btnRepeat');
  const btnOpenAyah = document.getElementById('btnOpenAyah');
  const btnOpenTimer = document.getElementById('btnOpenTimer');

  // Modals & Sheets
  const modalBackdrop = document.getElementById('modalBackdrop');
  const drawerSidebar = document.getElementById('drawerSidebar');
  const btnOpenDrawer = document.getElementById('btnOpenDrawer');
  const qariSheet = document.getElementById('qariSheet');
  const ayahSheet = document.getElementById('ayahSheet');
  const timerSheet = document.getElementById('timerSheet');
  const tasbihSheet = document.getElementById('tasbihSheet');
  const doaSheet = document.getElementById('doaSheet');

  // Page Views
  const viewSettings = document.getElementById('viewSettings');
  const viewDownloads = document.getElementById('viewDownloads');

  // State
  let currentFilter = 'all';
  let searchQuery = '';
  let downloadedSurahKeys = new Set();
  let favoriteSurahIds = new Set(JSON.parse(localStorage.getItem('quran_favorites') || '[]'));

  // Load downloaded surahs into memory
  async function refreshDownloadedKeys() {
    const downloads = await window.StorageManager.getAllDownloads();
    downloadedSurahKeys.clear();
    downloads.forEach(d => downloadedSurahKeys.add(d.key));
  }
  await refreshDownloadedKeys();

  // Show Toast
  let toastTimer = null;
  function showToast(msg, icon = '✓') {
    if (toastTimer) clearTimeout(toastTimer);
    toastText.textContent = msg;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // Format Seconds to MM:SS
  function formatTime(sec) {
    if (isNaN(sec) || sec < 0) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // Render Surah List
  function renderSurahList() {
    surahListEl.innerHTML = '';
    const filtered = window.QURAN_DATA.filter(s => {
      // Filter tab
      if (currentFilter === 'makkiyyah' && s.tempatTurun !== 'Mekkah') return false;
      if (currentFilter === 'madaniyyah' && s.tempatTurun !== 'Madinah') return false;
      if (currentFilter === 'favorit' && !favoriteSurahIds.has(s.nomor)) return false;
      if (currentFilter === 'downloaded') {
        const key = window.StorageManager.buildKey(s.nomor, player.currentQari, player.isTranslation);
        if (!downloadedSurahKeys.has(key)) return false;
      }
      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = s.namaLatin.toLowerCase().includes(q);
        const matchArti = s.arti.toLowerCase().includes(q);
        const matchNomor = String(s.nomor) === q;
        if (!matchName && !matchArti && !matchNomor) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      surahListEl.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <div class="empty-state-title">Surah Tidak Ditemukan</div>
          <div class="empty-state-desc">Coba gunakan kata kunci nama surah atau nomor yang berbeda.</div>
        </div>
      `;
      return;
    }

    filtered.forEach(s => {
      const isPlayingCurrent = player.currentSurah && player.currentSurah.nomor === s.nomor;
      const key = window.StorageManager.buildKey(s.nomor, player.currentQari, player.isTranslation);
      const isDownloaded = downloadedSurahKeys.has(key);

      const item = document.createElement('div');
      item.className = `surah-item ${isPlayingCurrent ? 'playing-active' : ''}`;
      item.dataset.surahNo = s.nomor;

      item.innerHTML = `
        <div class="surah-left">
          <div class="star-number-badge">
            <svg viewBox="0 0 100 100">
              <path d="M50 0 L61.8 14.6 L78.9 9.5 L82.4 27.1 L98.1 35.4 L91.6 51.9 L99.5 67.9 L84.5 77.4 L82.5 95.1 L64.8 93.6 L50 100 L35.2 93.6 L17.5 95.1 L15.5 77.4 L0.5 67.9 L8.4 51.9 L1.9 35.4 L17.6 27.1 L21.1 9.5 L38.2 14.6 Z" />
            </svg>
            <span class="star-number-text">${s.nomor}</span>
          </div>
          <div class="surah-info">
            <div class="surah-title-row">
              <div class="surah-name">${s.namaLatin}</div>
            </div>
            <div class="surah-subtitle">${s.arti} | ${s.jumlahAyat} Ayat | ${s.tempatTurun}</div>
          </div>
        </div>
        <div class="surah-right">
          <span class="surah-arabic-preview">${s.nama}</span>
          <button class="download-action-btn ${isDownloaded ? 'downloaded' : ''}" data-surah-no="${s.nomor}" title="${isDownloaded ? 'Tersimpan Offline' : 'Unduh Offline'}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${isDownloaded
                ? '<path d="M20 6L9 17l-5-5"></path>'
                : '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>'
              }
            </svg>
          </button>
        </div>
      `;

      // Tap surah item -> Play and Open Player
      item.addEventListener('click', (e) => {
        if (e.target.closest('.download-action-btn')) return; // ignore download button click
        playAndOpenSurah(s);
      });

      // Tap download button
      const dlBtn = item.querySelector('.download-action-btn');
      dlBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await handleDownloadSurah(s, dlBtn);
      });

      surahListEl.appendChild(item);
    });
  }

  // Play & Open Surah
  async function playAndOpenSurah(surah) {
    const isOffline = await player.playSurah(surah, true);
    openPlayerScreen();
    const qariName = getQariName();
    const modeText = player.isTranslation ? 'Terjemahan' : 'Murottal';
    showToast(`${isOffline ? 'Offline' : 'Streaming'} (${modeText}): ${surah.namaLatin} - ${qariName}`);
    renderSurahList();
  }

  function getQariName() {
    const q = window.QARI_LIST.find(x => x.id === player.currentQari);
    return q ? q.short : 'Misyari Rasyid';
  }

  // Handle Download Surah
  async function handleDownloadSurah(surah, btnEl) {
    const key = window.StorageManager.buildKey(surah.nomor, player.currentQari, player.isTranslation);
    if (downloadedSurahKeys.has(key)) {
      // Already downloaded, confirm delete
      if (confirm(`Hapus audio offline Surah ${surah.namaLatin}?`)) {
        await window.StorageManager.deleteAudio(surah.nomor, player.currentQari, player.isTranslation);
        await refreshDownloadedKeys();
        renderSurahList();
        showToast(`Audio Surah ${surah.namaLatin} dihapus.`);
        updateDownloadStats();
      }
      return;
    }

    // Start Download
    btnEl.classList.add('downloading');
    btnEl.innerHTML = `<svg class="splash-loader" style="width:20px;height:20px;border-width:2.5px;margin:0;" viewBox="0 0 50 50"></svg>`;
    showToast(`Mengunduh ${surah.namaLatin} untuk pemutaran offline...`);

    try {
      const target = player.getAudioUrlForSurah(surah);
      const blob = await window.StorageManager.downloadAudioFile(target.url, (pct) => {
        // Can show progress percentage in toast or btn
      });

      await window.StorageManager.saveAudio(
        surah.nomor,
        player.currentQari,
        player.isTranslation,
        blob,
        surah.namaLatin
      );

      await refreshDownloadedKeys();
      renderSurahList();
      showToast(`Alhamdulillah! ${surah.namaLatin} siap diputar offline.`, '✓');
      updateDownloadStats();
    } catch (err) {
      console.error('Download error:', err);
      showToast('Gagal mengunduh audio. Silakan coba kembali.');
      renderSurahList();
    }
  }

  // Player Sync Handlers
  player.on('play', () => {
    playerScreen.classList.add('is-playing');
    mainPlayBtn.innerHTML = `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1"></rect>
        <rect x="14" y="4" width="4" height="16" rx="1"></rect>
      </svg>
    `;
    miniPlayBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1"></rect>
        <rect x="14" y="4" width="4" height="16" rx="1"></rect>
      </svg>
    `;
    miniPlayerBar.classList.remove('hidden');
    renderSurahList();
  });

  player.on('pause', () => {
    playerScreen.classList.remove('is-playing');
    mainPlayBtn.innerHTML = `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;
    miniPlayBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    `;
    renderSurahList();
  });

  player.on('trackchange', (surah) => {
    medallionArabic.textContent = surah.nama;
    medallionNumber.textContent = surah.nomor;
    playerSurahTitle.textContent = `${surah.nomor}. ${surah.namaLatin}`;
    playerSurahSubtitle.textContent = `${surah.arti} | ${surah.jumlahAyat} Ayat | ${surah.tempatTurun}`;
    playerQariBadge.textContent = `🎙️ ${getQariName()}`;

    // Mini player
    miniBadge.textContent = surah.nomor;
    miniTitle.textContent = `${surah.nomor}. ${surah.namaLatin}`;
    miniSubtitle.textContent = `${surah.arti} • ${getQariName()}`;
    miniPlayerBar.classList.remove('hidden');

    // Favorite state
    if (favoriteSurahIds.has(surah.nomor)) {
      btnFavorite.classList.add('active');
    } else {
      btnFavorite.classList.remove('active');
    }

    // Download state for current surah
    const key = window.StorageManager.buildKey(surah.nomor, player.currentQari, player.isTranslation);
    if (downloadedSurahKeys.has(key)) {
      btnDownloadCurrent.classList.add('active');
      btnDownloadCurrent.title = 'Tersimpan Offline';
    } else {
      btnDownloadCurrent.classList.remove('active');
      btnDownloadCurrent.title = 'Unduh Offline';
    }

    renderSurahList();
  });

  player.on('timeupdate', ({ currentTime, duration, percent }) => {
    playerProgressBar.value = percent || 0;
    currentTimeEl.textContent = formatTime(currentTime);
    totalDurationEl.textContent = formatTime(duration);
  });

  player.on('timerupdate', (remainingSec) => {
    const timerBadge = document.getElementById('timerRemainingBadge');
    if (remainingSec > 0) {
      timerBadge.style.display = 'inline-block';
      timerBadge.textContent = `⏱️ ${formatTime(remainingSec)}`;
    } else {
      timerBadge.style.display = 'none';
    }
  });

  player.on('error', (msg) => {
    showToast(msg);
  });

  // UI Interactions: Controls
  mainPlayBtn.addEventListener('click', () => player.togglePlayPause());
  miniPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    player.togglePlayPause();
  });
  miniPlayerBar.addEventListener('click', () => openPlayerScreen());
  miniCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    player.pause();
    miniPlayerBar.classList.add('hidden');
  });

  prevBtn.addEventListener('click', () => player.prev());
  nextBtn.addEventListener('click', () => player.next());
  rewind10Btn.addEventListener('click', () => player.skip(-10));
  forward10Btn.addEventListener('click', () => player.skip(10));

  playerProgressBar.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (player.audio.duration) {
      player.seek((val / 100) * player.audio.duration);
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    player.setVolume(parseFloat(e.target.value));
  });

  // Murottal Switch (Toggle Murottal vs Terjemahan)
  murottalSwitch.addEventListener('change', (e) => {
    // When checked = Murottal Only (true), unchecked = with Terjemahan (false)
    player.setTranslationMode(!e.target.checked);
    const mode = e.target.checked ? 'Murottal Murni' : 'Murottal + Terjemahan Indonesia';
    showToast(`Mode: ${mode}`);
    renderSurahList();
  });

  // Repeat Mode Cycle
  btnRepeat.addEventListener('click', () => {
    const mode = player.cycleRepeatMode();
    if (mode === 'one') {
      btnRepeat.classList.add('repeat-active');
      btnRepeat.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          <text x="10" y="14" font-size="8" font-weight="bold" fill="currentColor">1</text>
        </svg>
      `;
      showToast('Ulangi Surah Saat Ini (Repeat 1)');
    } else if (mode === 'all') {
      btnRepeat.classList.add('repeat-active');
      btnRepeat.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
      `;
      showToast('Putar Semua Surah Berurutan (Repeat All)');
    } else {
      btnRepeat.classList.remove('repeat-active');
      showToast('Ulangi Dimatikan');
    }
  });

  // Favorite Button
  btnFavorite.addEventListener('click', () => {
    if (!player.currentSurah) return;
    const no = player.currentSurah.nomor;
    if (favoriteSurahIds.has(no)) {
      favoriteSurahIds.delete(no);
      btnFavorite.classList.remove('active');
      showToast(`Surah ${player.currentSurah.namaLatin} dihapus dari Favorit.`);
    } else {
      favoriteSurahIds.add(no);
      btnFavorite.classList.add('active');
      showToast(`Surah ${player.currentSurah.namaLatin} ditambahkan ke Favorit!`, '★');
    }
    localStorage.setItem('quran_favorites', JSON.stringify([...favoriteSurahIds]));
    renderSurahList();
  });

  // Download Current Surah Button in Player
  btnDownloadCurrent.addEventListener('click', async () => {
    if (!player.currentSurah) return;
    await handleDownloadSurah(player.currentSurah, btnDownloadCurrent);
  });

  // Share Button (Sebar Kebaikan / Amal Jariyah)
  btnShare.addEventListener('click', async () => {
    if (!player.currentSurah) return;
    const s = player.currentSurah;
    const shareData = {
      title: `Murottal ${s.namaLatin}`,
      text: `Mari dengarkan lantunan merdu Al-Qur'an Surah ${s.namaLatin} (${s.arti}) - ${s.jumlahAyat} Ayat di aplikasi Murottal Quran. Semoga menjadi amal jariyah dan syafaat bagi kita di akhirat kelak.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(`${shareData.text} \n${shareData.url}`);
      showToast('Teks ajakan kebaikan disalin ke clipboard! Bagikan ke WhatsApp.', '✓');
    }
  });

  // Open Fullscreen Player with History Push
  function openPlayerScreen() {
    playerScreen.classList.add('open');
    try {
      history.pushState({ screen: 'player' }, '');
    } catch (e) {}
  }

  playerCloseBtn.addEventListener('click', () => {
    playerScreen.classList.remove('open');
  });

  // Handle browser / Android back gesture via popstate
  window.addEventListener('popstate', () => {
    if (playerScreen && playerScreen.classList.contains('open')) {
      playerScreen.classList.remove('open');
      return;
    }
    const openSheets = document.querySelectorAll('.bottom-sheet.open, .modal.open');
    if (openSheets.length > 0) {
      closeAllModals();
      return;
    }
  });

  // Global handler invoked by Android hardware back button (via WebView bridge)
  window.handleAppBackPress = function() {
    // 1. Jika pemutar murottal sedang terbuka, tutup pemutar dan kembali ke daftar surat
    if (playerScreen && playerScreen.classList.contains('open')) {
      playerScreen.classList.remove('open');
      return true;
    }

    // 2. Jika drawer sidebar terbuka, tutup drawer
    if (drawerSidebar && drawerSidebar.classList.contains('open')) {
      drawerSidebar.classList.remove('open');
      if (modalBackdrop) modalBackdrop.classList.remove('open');
      return true;
    }

    // 3. Jika sedang membuka sub-halaman lain (Pengaturan, Unduhan, Sholat, Kiblat, Asmaul Husna, dll.)
    const activeViews = document.querySelectorAll('.page-view.active');
    if (activeViews.length > 0) {
      activeViews.forEach(v => v.classList.remove('active'));
      const allTabs = document.querySelectorAll('.bottom-nav .nav-tab-btn');
      allTabs.forEach(t => t.classList.remove('active'));
      const homeTab = document.getElementById('btnNavHome');
      if (homeTab) homeTab.classList.add('active');
      return true;
    }

    // 4. Jika ada modal atau bottom sheet yang terbuka (Pilih Qari, Ayat, Timer, Doa, Notif Sholat, dll.)
    const openSheets = document.querySelectorAll('.bottom-sheet.open, .modal.open');
    if (openSheets.length > 0) {
      closeAllModals();
      return true;
    }

    // 5. Jika sedang mencari (search input terisi), kosongkan pencarian dulu
    if (searchInput && searchInput.value) {
      searchInput.value = '';
      searchQuery = '';
      searchClearBtn.classList.remove('active');
      renderSurahList();
      return true;
    }

    // Berada di layar utama daftar surat tanpa modal/filter pencarian -> konfirmasi keluar
    return false;
  };

  // Search Toggle Button Header
  const btnToggleSearch = document.getElementById('btnToggleSearch');
  if (btnToggleSearch) {
    btnToggleSearch.addEventListener('click', () => {
      searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Home Nav Tab
  document.getElementById('btnNavHome').addEventListener('click', () => {
    viewSettings.classList.remove('active');
    viewDownloads.classList.remove('active');
    closeAllModals();
  });

  // Search Input Handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    if (searchQuery) {
      searchClearBtn.classList.add('active');
    } else {
      searchClearBtn.classList.remove('active');
    }
    renderSurahList();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.classList.remove('active');
    renderSurahList();
  });

  // Filter Chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      renderSurahList();
    });
  });

  // Drawer Sidebar Handlers
  btnOpenDrawer.addEventListener('click', () => {
    drawerSidebar.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  function closeAllModals() {
    drawerSidebar.classList.remove('open');
    modalBackdrop.classList.remove('open');
    qariSheet.classList.remove('open');
    ayahSheet.classList.remove('open');
    timerSheet.classList.remove('open');
    tasbihSheet.classList.remove('open');
    doaSheet.classList.remove('open');
    const pNotif = document.getElementById('prayerNotifSheet');
    if (pNotif) pNotif.classList.remove('open');
    const cSheet = document.getElementById('citySheet');
    if (cSheet) cSheet.classList.remove('open');
  }

  modalBackdrop.addEventListener('click', closeAllModals);

  // Qari Selector Sheet
  playerQariBadge.addEventListener('click', () => {
    renderQariList();
    qariSheet.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  function renderQariList() {
    const listEl = document.getElementById('qariList');
    listEl.innerHTML = '';
    window.QARI_LIST.forEach(q => {
      const isSelected = player.currentQari === q.id;
      const item = document.createElement('div');
      item.className = `qari-item ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="qari-item-info">
          <h4>${q.name}</h4>
          <p>${q.style}</p>
        </div>
        ${isSelected ? '<span style="color:var(--primary);font-weight:bold;">✓ Terpilih</span>' : ''}
      `;
      item.addEventListener('click', () => {
        player.setQari(q.id);
        closeAllModals();
        showToast(`Qari diubah: ${q.name}`);
        renderSurahList();
      });
      listEl.appendChild(item);
    });
  }

  // Ayah Reader Modal (Read Along / Karaoke) with Search
  const surahAyatCache = {};
  let currentLoadedAyat = [];
  const searchAyahInput = document.getElementById('searchAyahInput');
  const btnClearAyahSearch = document.getElementById('btnClearAyahSearch');
  const ayahSearchResultCount = document.getElementById('ayahSearchResultCount');
  const ayahCountBadge = document.getElementById('ayahCountBadge');

  function renderAyahCards(ayatToRender, currentSurahName, query = '') {
    const bodyEl = document.getElementById('ayahSheetBody');
    if (!ayatToRender || ayatToRender.length === 0) {
      bodyEl.innerHTML = `
        <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
          <div style="font-size:2.5rem;margin-bottom:10px;">🔍</div>
          <p style="font-weight:700;color:var(--text-primary);margin-bottom:4px;">Ayat Tidak Ditemukan</p>
          <p style="font-size:0.84rem;">Tidak ada ayat yang cocok dengan kata kunci "${query}".</p>
        </div>
      `;
      return;
    }

    bodyEl.innerHTML = `
      <div class="ayah-list">
        ${ayatToRender.map(a => `
          <div class="ayah-card" id="ayahCard-${a.nomorAyat}">
            <div class="ayah-card-header">
              <span class="ayah-number-badge">Ayat ${a.nomorAyat}</span>
              <button class="header-btn" style="width:30px;height:30px;" onclick="copyAyahText('${currentSurahName}', ${a.nomorAyat}, '${escape(a.teksArab)}', '${escape(a.teksIndonesia)}')" title="Salin Ayat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div class="ayah-arabic">${a.teksArab}</div>
            <div class="ayah-latin">${a.teksLatin}</div>
            <div class="ayah-translation">${a.teksIndonesia}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function filterAyatBySearch() {
    if (!currentLoadedAyat || !currentLoadedAyat.length || !player.currentSurah) return;
    const query = (searchAyahInput.value || '').trim();
    if (btnClearAyahSearch) {
      btnClearAyahSearch.style.display = query ? 'block' : 'none';
    }

    if (!query) {
      if (ayahSearchResultCount) ayahSearchResultCount.style.display = 'none';
      if (ayahCountBadge) ayahCountBadge.textContent = `${currentLoadedAyat.length} Ayat`;
      renderAyahCards(currentLoadedAyat, player.currentSurah.namaLatin);
      return;
    }

    const qLower = query.toLowerCase();
    const isNum = !isNaN(query) && parseInt(query, 10) > 0;
    const filtered = currentLoadedAyat.filter(a => {
      if (isNum && a.nomorAyat === parseInt(query, 10)) return true;
      if (a.nomorAyat.toString() === query) return true;
      if (a.teksIndonesia && a.teksIndonesia.toLowerCase().includes(qLower)) return true;
      if (a.teksLatin && a.teksLatin.toLowerCase().includes(qLower)) return true;
      if (a.teksArab && a.teksArab.includes(query)) return true;
      return false;
    });

    if (ayahSearchResultCount) {
      ayahSearchResultCount.style.display = 'block';
      ayahSearchResultCount.textContent = `Ditemukan ${filtered.length} dari ${currentLoadedAyat.length} ayat`;
    }
    renderAyahCards(filtered, player.currentSurah.namaLatin, query);
  }

  if (searchAyahInput) {
    searchAyahInput.addEventListener('input', filterAyatBySearch);
  }

  if (btnClearAyahSearch) {
    btnClearAyahSearch.addEventListener('click', () => {
      searchAyahInput.value = '';
      filterAyatBySearch();
      searchAyahInput.focus();
    });
  }

  btnOpenAyah.addEventListener('click', async () => {
    if (!player.currentSurah) return;
    const s = player.currentSurah;
    document.getElementById('ayahSheetTitle').textContent = `Teks & Terjemahan Surah ${s.namaLatin}`;
    if (ayahCountBadge) ayahCountBadge.textContent = 'Memuat ayat...';
    if (searchAyahInput) searchAyahInput.value = '';
    if (btnClearAyahSearch) btnClearAyahSearch.style.display = 'none';
    if (ayahSearchResultCount) ayahSearchResultCount.style.display = 'none';

    const bodyEl = document.getElementById('ayahSheetBody');
    bodyEl.innerHTML = `
      <div style="text-align:center;padding:30px;">
        <div class="splash-loader" style="margin:0 auto 12px auto;"></div>
        <p style="font-size:0.9rem;color:var(--text-secondary);">Memuat ayat Al-Qur'an dan terjemahan...</p>
      </div>
    `;
    ayahSheet.classList.add('open');
    modalBackdrop.classList.add('open');

    try {
      let ayatList = surahAyatCache[s.nomor];
      if (!ayatList) {
        const res = await fetch(`https://equran.id/api/v2/surat/${s.nomor}`);
        const json = await res.json();
        ayatList = json.data.ayat;
        surahAyatCache[s.nomor] = ayatList;
      }
      currentLoadedAyat = ayatList;
      if (ayahCountBadge) ayahCountBadge.textContent = `${ayatList.length} Ayat Lengkap`;
      renderAyahCards(ayatList, s.namaLatin);
    } catch (e) {
      bodyEl.innerHTML = `<div style="text-align:center;padding:24px;color:red;font-size:0.88rem;">Gagal memuat ayat Al-Qur'an. Silakan periksa koneksi internet Anda dan coba lagi.</div>`;
    }
  });

  window.copyAyahText = (surahName, ayatNo, arabEnc, indoEnc) => {
    const arab = unescape(arabEnc);
    const indo = unescape(indoEnc);
    const text = `QS. ${surahName}: Ayat ${ayatNo}\n\n${arab}\n\n"${indo}"\n\n(Dikutip dari Quran Rose)`;
    navigator.clipboard.writeText(text);
    showToast(`Ayat ${ayatNo} berhasil disalin! Siap dibagikan.`, '✓');
  };

  // Sleep Timer Sheet
  btnOpenTimer.addEventListener('click', () => {
    timerSheet.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  document.querySelectorAll('.timer-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timer-option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const min = parseInt(btn.dataset.minutes, 10);
      if (min === 0) {
        player.cancelSleepTimer();
        showToast('Pengatur waktu tidur dinonaktifkan.');
      } else {
        player.setSleepTimer(min);
        showToast(`Pemutar akan berhenti otomatis dalam ${min} menit.`, '⏱️');
      }
      closeAllModals();
    });
  });

  // Tasbih Digital Sheet
  document.getElementById('btnMenuTasbih').addEventListener('click', () => {
    closeAllModals();
    tasbihSheet.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  let tasbihCount = 0;
  let tasbihTarget = 33;
  const tasbihCountEl = document.getElementById('tasbihCount');
  const tasbihTargetEl = document.getElementById('tasbihTarget');
  const tasbihTapBtn = document.getElementById('tasbihTapBtn');
  const tasbihResetBtn = document.getElementById('tasbihResetBtn');
  const tasbihSelect = document.getElementById('tasbihPresetSelect');

  const tasbihPresets = {
    subhanallah: { arab: 'سُبْحَانَ اللّٰهِ', latin: 'Subhanallah (Maha Suci Allah)', target: 33 },
    alhamdulillah: { arab: 'اَلْحَمْدُ لِلّٰهِ', latin: 'Alhamdulillah (Segala Puji Bagi Allah)', target: 33 },
    allahuakbar: { arab: 'اَللّٰهُ أَكْبَرُ', latin: 'Allahu Akbar (Allah Maha Besar)', target: 33 },
    istighfar: { arab: 'أَسْتَغْفِرُ اللّٰهَ', latin: 'Astaghfirullah (Aku Memohon Ampun)', target: 100 },
    tahlil: { arab: 'لَا إِلٰهَ إِلَّا اللّٰهُ', latin: 'Laa ilaha illallah', target: 100 },
    shalawat: { arab: 'اللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', latin: 'Allahumma Sholli Ala Muhammad', target: 100 }
  };

  tasbihSelect.addEventListener('change', (e) => {
    const item = tasbihPresets[e.target.value];
    if (item) {
      document.getElementById('tasbihArabic').textContent = item.arab;
      document.getElementById('tasbihLatin').textContent = item.latin;
      tasbihTarget = item.target;
      tasbihTargetEl.textContent = `/ ${tasbihTarget}`;
      tasbihCount = 0;
      tasbihCountEl.textContent = '0';
    }
  });

  tasbihTapBtn.addEventListener('click', () => {
    tasbihCount++;
    tasbihCountEl.textContent = tasbihCount;
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    if (tasbihCount === tasbihTarget) {
      if (navigator.vibrate) navigator.vibrate([60, 50, 100]);
      showToast(`Alhamdulillah! Target ${tasbihTarget}x tercapai.`, '✨');
    }
  });

  tasbihResetBtn.addEventListener('click', () => {
    tasbihCount = 0;
    tasbihCountEl.textContent = '0';
  });

  // Doa Khatam Quran Sheet
  document.getElementById('btnMenuDoa').addEventListener('click', () => {
    closeAllModals();
    doaSheet.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  // Settings & Downloads View Routing
  const btnMenuSettings = document.getElementById('btnMenuSettings');
  if (btnMenuSettings) {
    btnMenuSettings.addEventListener('click', () => {
      closeAllModals();
      viewSettings.classList.add('active');
    });
  }
  const btnNavSettings = document.getElementById('btnNavSettings');
  if (btnNavSettings) {
    btnNavSettings.addEventListener('click', () => {
      viewSettings.classList.add('active');
    });
  }
  const settingsBackBtn = document.getElementById('settingsBackBtn');
  if (settingsBackBtn) {
    settingsBackBtn.addEventListener('click', () => {
      viewSettings.classList.remove('active');
    });
  }

  // Background Wallpaper Theme Manager (Custom Photo & Presets)
  const btnOpenWallpaperSettings = document.getElementById('btnOpenWallpaperSettings');
  const wallpaperPickerContainer = document.getElementById('wallpaperPickerContainer');
  const currentWallpaperLabel = document.getElementById('currentWallpaperLabel');
  const inputCustomBgPhoto = document.getElementById('inputCustomBgPhoto');
  const btnResetWallpaper = document.getElementById('btnResetWallpaper');
  const wallpaperThumbs = document.querySelectorAll('.wallpaper-thumb');

  function applyWallpaper(bgValue, labelText) {
    if (!bgValue || bgValue === 'default') {
      document.body.classList.remove('has-custom-wallpaper');
      document.body.style.backgroundImage = '';
      localStorage.removeItem('quran_rose_wallpaper');
      localStorage.removeItem('quran_rose_wallpaper_label');
      if (currentWallpaperLabel) currentWallpaperLabel.textContent = 'Tema Glass Pink Rose Default';
    } else {
      document.body.classList.add('has-custom-wallpaper');
      document.body.style.backgroundImage = `url("${bgValue}")`;
      localStorage.setItem('quran_rose_wallpaper', bgValue);
      localStorage.setItem('quran_rose_wallpaper_label', labelText || 'Foto Wallpaper Aktif');
      if (currentWallpaperLabel) currentWallpaperLabel.textContent = labelText || 'Foto Wallpaper Aktif';
    }

    wallpaperThumbs.forEach(thumb => {
      thumb.classList.toggle('active', thumb.dataset.bg === bgValue);
    });
  }

  // Restore saved wallpaper on startup
  try {
    const savedWallpaper = localStorage.getItem('quran_rose_wallpaper');
    const savedWallpaperLabel = localStorage.getItem('quran_rose_wallpaper_label');
    if (savedWallpaper) {
      applyWallpaper(savedWallpaper, savedWallpaperLabel);
    }
  } catch(e) {}

  if (btnOpenWallpaperSettings && wallpaperPickerContainer) {
    btnOpenWallpaperSettings.addEventListener('click', () => {
      const isHidden = wallpaperPickerContainer.style.display === 'none';
      wallpaperPickerContainer.style.display = isHidden ? 'block' : 'none';
    });
  }

  wallpaperThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const bg = thumb.dataset.bg;
      const label = thumb.querySelector('.wallpaper-thumb-label')?.textContent || 'Preset';
      applyWallpaper(bg, bg === 'default' ? 'Tema Glass Pink Rose Default' : `Preset: ${label}`);
      showToast(bg === 'default' ? 'Tema Pink Rose Default dipulihkan.' : `Wallpaper ${label} diterapkan!`, '🌸');
    });
  });

  if (inputCustomBgPhoto) {
    inputCustomBgPhoto.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Pilih file gambar yang valid.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        try {
          applyWallpaper(base64Data, 'Foto Kustom Galeri HP');
          showToast('Wallpaper foto kustom berhasil diterapkan!', '✓');
        } catch (err) {
          console.warn('Gagal menyimpan wallpaper foto ke localStorage:', err);
          showToast('Foto terlalu besar. Silakan coba foto lain.');
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnResetWallpaper) {
    btnResetWallpaper.addEventListener('click', () => {
      applyWallpaper('default');
      showToast('Background direset ke Tema Pink Rose Default.', '🌸');
    });
  }

  const btnMenuDownloads = document.getElementById('btnMenuDownloads');
  if (btnMenuDownloads) {
    btnMenuDownloads.addEventListener('click', () => {
      closeAllModals();
      openDownloadsView();
    });
  }
  const btnNavDownloads = document.getElementById('btnNavDownloads');
  if (btnNavDownloads) {
    btnNavDownloads.addEventListener('click', () => {
      openDownloadsView();
    });
  }
  const downloadsBackBtn = document.getElementById('downloadsBackBtn');
  if (downloadsBackBtn) {
    downloadsBackBtn.addEventListener('click', () => {
      viewDownloads.classList.remove('active');
    });
  }

  async function openDownloadsView() {
    viewDownloads.classList.add('active');
    await updateDownloadStats();
  }

  async function updateDownloadStats() {
    const downloads = await window.StorageManager.getAllDownloads();
    const totalBytes = await window.StorageManager.getTotalStorageBytes();
    document.getElementById('totalDownloadedCount').textContent = `${downloads.length} Surah`;
    document.getElementById('totalDownloadedSize').textContent = `${window.StorageManager.formatBytes(totalBytes)} Tersimpan Offline`;
    document.getElementById('settingsCacheSize').textContent = window.StorageManager.formatBytes(totalBytes);

    const listEl = document.getElementById('downloadsList');
    listEl.innerHTML = '';

    if (downloads.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <div class="empty-state-title">Belum Ada Surah Terunduh</div>
          <div class="empty-state-desc">Sentuh ikon awan (☁️) pada daftar surah untuk mengunduh audio agar bisa didengarkan tanpa kuota internet.</div>
        </div>
      `;
      return;
    }

    downloads.forEach(d => {
      const s = window.QURAN_DATA.find(x => x.nomor === d.surahNo);
      if (!s) return;
      const item = document.createElement('div');
      item.className = 'surah-item';
      item.innerHTML = `
        <div class="surah-left">
          <div class="star-number-badge">
            <svg viewBox="0 0 100 100">
              <path d="M50 0 L61.8 14.6 L78.9 9.5 L82.4 27.1 L98.1 35.4 L91.6 51.9 L99.5 67.9 L84.5 77.4 L82.5 95.1 L64.8 93.6 L50 100 L35.2 93.6 L17.5 95.1 L15.5 77.4 L0.5 67.9 L8.4 51.9 L1.9 35.4 L17.6 27.1 L21.1 9.5 L38.2 14.6 Z" />
            </svg>
            <span class="star-number-text">${s.nomor}</span>
          </div>
          <div class="surah-info">
            <div class="surah-name">${s.namaLatin}</div>
            <div class="surah-subtitle">${window.StorageManager.formatBytes(d.size)} • ${d.isTranslation ? 'Terjemahan' : 'Murottal'}</div>
          </div>
        </div>
        <div class="surah-right">
          <button class="header-btn" style="color:#ef4444;" title="Hapus Unduhan">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      item.querySelector('.surah-left').addEventListener('click', () => {
        playAndOpenSurah(s);
      });

      item.querySelector('button').addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm(`Hapus audio offline ${s.namaLatin}?`)) {
          await window.StorageManager.deleteAudio(d.surahNo, d.qariId, d.isTranslation);
          await refreshDownloadedKeys();
          await updateDownloadStats();
          renderSurahList();
          showToast(`Audio ${s.namaLatin} dihapus.`);
        }
      });

      listEl.appendChild(item);
    });
  }

  // Clear All Offline Cache Button
  document.getElementById('btnClearAllCache').addEventListener('click', async () => {
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA audio offline yang sudah diunduh?')) {
      await window.StorageManager.clearAllAudio();
      await refreshDownloadedKeys();
      await updateDownloadStats();
      renderSurahList();
      showToast('Semua cache audio berhasil dibersihkan.');
    }
  });

  document.getElementById('settingsClearCacheItem').addEventListener('click', async () => {
    if (confirm('Bersihkan seluruh cache audio offline untuk menghemat ruang memori HP?')) {
      await window.StorageManager.clearAllAudio();
      await refreshDownloadedKeys();
      await updateDownloadStats();
      renderSurahList();
      showToast('Semua cache berhasil dibersihkan.');
    }
  });

  // Dark Mode Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('theme_preference') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = `☀️ Mode Siang`;
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme_preference', 'light');
      themeToggleBtn.innerHTML = `🌙 Mode Malam`;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme_preference', 'dark');
      themeToggleBtn.innerHTML = `☀️ Mode Siang`;
    }
  });

  // Continue Last Played Banner
  const lastPlayedBanner = document.getElementById('lastPlayedBanner');
  const lastData = player.getLastPlayed();
  if (lastData) {
    lastPlayedBanner.style.display = 'flex';
    document.getElementById('lastPlayedName').textContent = `${lastData.nomor}. ${lastData.namaLatin}`;
    document.getElementById('lastPlayedQari').textContent = `${lastData.arti} • Sentuh untuk lanjut mendengar`;
    lastPlayedBanner.addEventListener('click', () => {
      const s = window.QURAN_DATA.find(x => x.nomor === lastData.nomor);
      if (s) playAndOpenSurah(s);
    });
  } else {
    lastPlayedBanner.style.display = 'none';
  }

  // ========================================================
  // Dzikir Pagi & Petang Controller
  // ========================================================
  const viewDzikir = document.getElementById('viewDzikir');
  const dzikirBackBtn = document.getElementById('dzikirBackBtn');
  const dzikirPageTitle = document.getElementById('dzikirPageTitle');
  const dzikirShareBtn = document.getElementById('dzikirShareBtn');
  const tabDzikirPagi = document.getElementById('tabDzikirPagi');
  const tabDzikirPetang = document.getElementById('tabDzikirPetang');
  const dzikirTimeInfoText = document.getElementById('dzikirTimeInfoText');
  const dzikirListContainer = document.getElementById('dzikirListContainer');

  let activeDzikirTab = 'pagi';
  const dzikirRemainingCounts = {};

  function openDzikirView(type = 'pagi') {
    closeAllModals();
    activeDzikirTab = type;
    viewDzikir.classList.add('active');
    renderDzikirList();
  }

  dzikirBackBtn.addEventListener('click', () => {
    viewDzikir.classList.remove('active');
  });

  tabDzikirPagi.addEventListener('click', () => {
    activeDzikirTab = 'pagi';
    renderDzikirList();
  });

  tabDzikirPetang.addEventListener('click', () => {
    activeDzikirTab = 'petang';
    renderDzikirList();
  });

  document.getElementById('btnQuickDzikirPagi').addEventListener('click', () => openDzikirView('pagi'));
  document.getElementById('btnQuickDzikirPetang').addEventListener('click', () => openDzikirView('petang'));
  document.getElementById('btnMenuDzikirPagi').addEventListener('click', () => openDzikirView('pagi'));
  document.getElementById('btnMenuDzikirPetang').addEventListener('click', () => openDzikirView('petang'));

  function renderDzikirList() {
    const isPagi = activeDzikirTab === 'pagi';
    tabDzikirPagi.classList.toggle('active', isPagi);
    tabDzikirPetang.classList.toggle('active', !isPagi);

    dzikirPageTitle.textContent = isPagi ? '🌅 Dzikir Pagi' : '🌇 Dzikir Petang';
    dzikirTimeInfoText.textContent = isPagi
      ? 'Waktu utama: Dari setelah shalat Subuh hingga terbit matahari (atau menjelang siang).'
      : 'Waktu utama: Dari setelah shalat Ashar hingga matahari terbenam (atau menjelang Isya).';

    const items = isPagi ? window.DZIKIR_PAGI : window.DZIKIR_PETANG;
    dzikirListContainer.innerHTML = '';

    items.forEach((item, idx) => {
      if (dzikirRemainingCounts[item.id] === undefined) {
        dzikirRemainingCounts[item.id] = item.repeat;
      }
      const curCount = dzikirRemainingCounts[item.id];
      const isDone = curCount === 0;

      const card = document.createElement('div');
      card.className = `dzikir-item-card ${isDone ? 'completed' : ''}`;
      card.id = `dzikir-card-${item.id}`;

      card.innerHTML = `
        <div class="dzikir-card-top">
          <div class="dzikir-card-title">${idx + 1}. ${item.title}</div>
          <button class="dzikir-counter-btn ${isDone ? 'done' : ''}" id="btn-count-${item.id}">
            ${isDone ? '✓ Selesai' : `${curCount}x`}
          </button>
        </div>

        <div class="dzikir-arabic-text">${item.arabic}</div>
        <div class="dzikir-latin-text">${item.latin}</div>
        <div class="dzikir-translation-text">${item.translation}</div>

        ${item.note ? `<div class="dzikir-note-box">💡 ${item.note}</div>` : ''}

        <div class="dzikir-card-actions">
          <button class="dzikir-action-small-btn" onclick="copyDzikirText('${item.title}', '${escape(item.arabic)}', '${escape(item.translation)}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Salin</span>
          </button>
        </div>
      `;

      // Tap counter button
      const countBtn = card.querySelector(`#btn-count-${item.id}`);
      countBtn.addEventListener('click', () => {
        if (dzikirRemainingCounts[item.id] > 1) {
          dzikirRemainingCounts[item.id]--;
          countBtn.textContent = `${dzikirRemainingCounts[item.id]}x`;
          if (navigator.vibrate) navigator.vibrate(25);
        } else if (dzikirRemainingCounts[item.id] === 1) {
          dzikirRemainingCounts[item.id] = 0;
          countBtn.className = 'dzikir-counter-btn done';
          countBtn.textContent = '✓ Selesai';
          card.classList.add('completed');
          if (navigator.vibrate) navigator.vibrate([40, 50, 70]);
          showToast(`Selesai membaca: ${item.title}!`, '✨');
        } else {
          // Reset to original repeat count if tapped again
          dzikirRemainingCounts[item.id] = item.repeat;
          countBtn.className = 'dzikir-counter-btn';
          countBtn.textContent = `${item.repeat}x`;
          card.classList.remove('completed');
        }
      });

      dzikirListContainer.appendChild(card);
    });
  }

  window.copyDzikirText = (title, arabEnc, indoEnc) => {
    const arab = unescape(arabEnc);
    const indo = unescape(indoEnc);
    const text = `*${title}*\n\n${arab}\n\n"${indo}"\n\n(Dikutip dari Aplikasi Murottal Quran & Dzikir)`;
    navigator.clipboard.writeText(text);
    showToast(`Dzikir "${title}" berhasil disalin! Siap dibagikan ke WhatsApp.`, '✓');
  };

  // ========================================================
  // Page View Routing Helpers
  // ========================================================
  function closeAllPageViews() {
    [
      viewPrayer, viewQibla, viewAsmaul, viewDzikir, viewSettings, viewDownloads,
      document.getElementById('viewWudhu'),
      document.getElementById('viewPanduanSalat'),
      document.getElementById('viewSholawat'),
      document.getElementById('viewKajian'),
      document.getElementById('viewKajianVideos')
    ].forEach(v => {
      if (v) {
        v.classList.remove('active');
        v.style.display = '';
        v.scrollTop = 0;
        v.scrollLeft = 0;
      }
    });
  }

  const btnNavHome = document.getElementById('btnNavHome');
  if (btnNavHome) {
    btnNavHome.addEventListener('click', () => {
      closeAllPageViews();
      closeAllModals();
      setActiveBottomNav('btnNavHome');
    });
  }

  // ========================================================
  // JADWAL SHOLAT (Prayer Times) Controller (Screenshots 1 & 2)
  // ========================================================
  const viewPrayer = document.getElementById('viewPrayer');
  const prayerBackBtn = document.getElementById('prayerBackBtn');
  const prayerHeaderDate = document.getElementById('prayerHeaderDate');
  const prayerHeaderHijri = document.getElementById('prayerHeaderHijri');
  const prayerProgressBarFill = document.getElementById('prayerProgressBarFill');
  const prayerDateRow = document.getElementById('prayerDateRow');
  const prayerCityName = document.getElementById('prayerCityName');
  const btnChangeCity = document.getElementById('btnChangeCity');
  const prayerTimesList = document.getElementById('prayerTimesList');
  const btnPrayerAdzanFull = document.getElementById('btnPrayerAdzanFull');
  const citySheet = document.getElementById('citySheet');
  const btnDetectGPS = document.getElementById('btnDetectGPS');
  const cityListContainer = document.getElementById('cityListContainer');

  // Prayer Notification Modal Elements (Screenshot 2)
  const prayerNotifSheet = document.getElementById('prayerNotifSheet');
  const notifSheetPrayerTitle = document.getElementById('notifSheetPrayerTitle');
  const btnNotifSheetClose = document.getElementById('btnNotifSheetClose');
  const notifToggleActive = document.getElementById('notifToggleActive');
  const notifToggleAdzan = document.getElementById('notifToggleAdzan');
  const notifRepeatLabel = document.getElementById('notifRepeatLabel');
  const notifDaysRow = document.getElementById('notifDaysRow');
  const btnNotifSoundRow = document.getElementById('btnNotifSoundRow');
  const notifSoundTitle = document.getElementById('notifSoundTitle');
  const btnPreviewAdzanSound = document.getElementById('btnPreviewAdzanSound');
  const btnNotifLeadRow = document.getElementById('btnNotifLeadRow');
  const notifLeadTitle = document.getElementById('notifLeadTitle');
  const btnSavePrayerNotif = document.getElementById('btnSavePrayerNotif');

  let currentPrayerDate = new Date();
  let currentCity = JSON.parse(localStorage.getItem('prayer_city') || 'null') || window.PrayerTimesEngine.CITIES[0];
  let selectedNotifPrayer = { key: 'subuh', name: 'Subuh' };
  let prayerNotifConfig = JSON.parse(localStorage.getItem('prayer_notif_config') || '{}');

  function openPrayerView() {
    closeAllPageViews();
    closeAllModals();
    if (viewPrayer) viewPrayer.scrollTop = 0;
    viewPrayer.classList.add('active');
    setActiveBottomNav('btnNavSalat');
    renderPrayerTimes();
  }

  prayerBackBtn.addEventListener('click', () => {
    viewPrayer.classList.remove('active');
    setActiveBottomNav('btnNavHome');
  });

  document.getElementById('btnNavSalat').addEventListener('click', openPrayerView);
  document.getElementById('btnMenuPrayer').addEventListener('click', openPrayerView);

  btnChangeCity.addEventListener('click', () => {
    renderCityList();
    citySheet.classList.add('open');
    modalBackdrop.classList.add('open');
  });

  btnDetectGPS.addEventListener('click', () => {
    if (navigator.geolocation) {
      showToast('Mendeteksi lokasi via GPS...', '📡');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentCity = {
            name: 'Lokasi GPS Anda',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            timezone: -Math.round(new Date().getTimezoneOffset() / 60)
          };
          localStorage.setItem('prayer_city', JSON.stringify(currentCity));
          closeAllModals();
          renderPrayerTimes();
          updateQiblaBearing();
          showToast(`Lokasi GPS aktif! (${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)})`, '📍');
        },
        (err) => {
          showToast('GPS tidak dapat diakses atau izin ditolak. Menggunakan kota default.');
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      showToast('Perangkat tidak mendukung geolokasi.');
    }
  });

  function renderCityList() {
    cityListContainer.innerHTML = '';
    window.PrayerTimesEngine.CITIES.forEach((city) => {
      const isSelected = currentCity.name === city.name;
      const item = document.createElement('div');
      item.className = `qari-item ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `
        <div class="qari-item-info">
          <h4>${city.name}</h4>
          <p>Lat: ${city.lat}, Lng: ${city.lng} (GMT+${city.timezone})</p>
        </div>
        ${isSelected ? '<span style="color:var(--primary);font-weight:bold;">✓ Terpilih</span>' : ''}
      `;
      item.addEventListener('click', () => {
        currentCity = city;
        localStorage.setItem('prayer_city', JSON.stringify(city));
        closeAllModals();
        renderPrayerTimes();
        updateQiblaBearing();
        showToast(`Lokasi diubah ke: ${city.name}`, '📍');
      });
      cityListContainer.appendChild(item);
    });
  }

  // Full Adzan audio player (Local offline bundled + CDN fallback)
  const adzanAudio = new Audio('assets/audio/adzan-madinah.mp3');
  adzanAudio.preload = 'auto';
  let isAdzanPlaying = false;
  let isAdzanLoading = false;

  adzanAudio.onerror = () => {
    console.warn('Local adzan audio failed, trying fallback CDN...');
    adzanAudio.src = 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/master/' + encodeURIComponent('Adhan_Al_Haram_Al_Madani_-_Al_Madinah_1_(أذان_الحرم_المدني_-_المدينة_المنورة).mp3');
  };

  function updateAdzanUI(playing, loading = false) {
    if (loading) {
      btnPrayerAdzanFull.textContent = '⏳';
      btnPreviewAdzanSound.classList.add('loading');
      btnPreviewAdzanSound.classList.remove('playing');
      btnPreviewAdzanSound.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>`;
    } else if (playing) {
      btnPrayerAdzanFull.textContent = '⏸️';
      btnPreviewAdzanSound.classList.remove('loading');
      btnPreviewAdzanSound.classList.add('playing');
      btnPreviewAdzanSound.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
    } else {
      btnPrayerAdzanFull.textContent = '🔊';
      btnPreviewAdzanSound.classList.remove('loading', 'playing');
      btnPreviewAdzanSound.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }
  }

  function stopAdzanPlayback() {
    if (isAdzanPlaying || isAdzanLoading) {
      adzanAudio.pause();
      adzanAudio.currentTime = 0;
      isAdzanPlaying = false;
      isAdzanLoading = false;
      updateAdzanUI(false);
    }
  }

  btnPrayerAdzanFull.addEventListener('click', () => {
    toggleAdzanPlayback();
  });

  btnPreviewAdzanSound.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAdzanPlayback();
  });

  // Clicking the whole notification sound row triggers play immediately
  btnNotifSoundRow.addEventListener('click', () => {
    toggleAdzanPlayback();
  });

  function toggleAdzanPlayback() {
    if (isAdzanLoading) return;

    if (isAdzanPlaying) {
      adzanAudio.pause();
      isAdzanPlaying = false;
      updateAdzanUI(false);
      showToast('Audio adzan dijeda', '⏸️');
      return;
    }

    // Stop background Quran murottal if currently playing
    if (window.audioManager && typeof window.audioManager.pause === 'function') {
      window.audioManager.pause();
    }

    isAdzanLoading = true;
    updateAdzanUI(false, true);

    const playPromise = adzanAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAdzanLoading = false;
        isAdzanPlaying = true;
        updateAdzanUI(true);
        showToast('Memutar Lantunan Adzan Madinah Merdu 🕌', '🔊');
      }).catch(err => {
        isAdzanLoading = false;
        isAdzanPlaying = false;
        updateAdzanUI(false);
        console.warn('Adzan play error, trying reload:', err);
        adzanAudio.load();
        adzanAudio.play().then(() => {
          isAdzanPlaying = true;
          updateAdzanUI(true);
          showToast('Memutar Lantunan Adzan Madinah Merdu 🕌', '🔊');
        }).catch(() => {
          showToast('Gagal memutar audio adzan.', '⚠️');
        });
      });
    }
  }

  adzanAudio.addEventListener('ended', () => {
    isAdzanPlaying = false;
    isAdzanLoading = false;
    updateAdzanUI(false);
  });

  // Prayer Notification Modal Handlers (Screenshot 2)
  function openPrayerNotifModal(key, name) {
    selectedNotifPrayer = { key, name };
    notifSheetPrayerTitle.textContent = `${name} pengaturan pemberitahuan`;

    // Load saved or default
    const saved = prayerNotifConfig[key] || {
      enabled: true,
      adzanAlarm: true,
      days: [0, 1, 2, 3, 4, 5, 6],
      sound: 'Adhan (Madina)',
      lead: 'Tepat waktu'
    };

    notifToggleActive.checked = saved.enabled;
    notifToggleAdzan.checked = saved.adzanAlarm;
    notifSoundTitle.textContent = saved.sound || 'Adhan (Madina)';
    notifLeadTitle.textContent = saved.lead || 'Tepat waktu';

    // Highlight day pills
    const pills = notifDaysRow.querySelectorAll('.notif-day-pill');
    pills.forEach((pill, idx) => {
      pill.classList.toggle('active', saved.days.includes(idx));
    });
    updateRepeatLabel();

    prayerNotifSheet.classList.add('open');
    modalBackdrop.classList.add('open');
  }

  btnNotifSheetClose.addEventListener('click', () => {
    prayerNotifSheet.classList.remove('open');
    modalBackdrop.classList.remove('open');
    stopAdzanPlayback();
  });

  notifDaysRow.querySelectorAll('.notif-day-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      updateRepeatLabel();
    });
  });

  function updateRepeatLabel() {
    const activeDays = [];
    notifDaysRow.querySelectorAll('.notif-day-pill').forEach((p, idx) => {
      if (p.classList.contains('active')) activeDays.push(idx);
    });
    if (activeDays.length === 7) {
      notifRepeatLabel.textContent = 'Setiap hari';
    } else if (activeDays.length === 5 && !activeDays.includes(0) && !activeDays.includes(6)) {
      notifRepeatLabel.textContent = 'Hari kerja (Sen-Jum)';
    } else if (activeDays.length === 0) {
      notifRepeatLabel.textContent = 'Tidak berulang';
    } else {
      notifRepeatLabel.textContent = `${activeDays.length} hari per minggu`;
    }
  }

  btnNotifLeadRow.addEventListener('click', () => {
    const options = ['Tepat waktu', '5 Menit Sebelum', '10 Menit Sebelum', '15 Menit Sebelum'];
    const curIdx = options.indexOf(notifLeadTitle.textContent);
    const nextIdx = (curIdx + 1) % options.length;
    notifLeadTitle.textContent = options[nextIdx];
    showToast(`Pengingat diset: ${options[nextIdx]} azan`, '⏱️');
  });

  btnSavePrayerNotif.addEventListener('click', () => {
    const activeDays = [];
    notifDaysRow.querySelectorAll('.notif-day-pill').forEach((p, idx) => {
      if (p.classList.contains('active')) activeDays.push(idx);
    });

    prayerNotifConfig[selectedNotifPrayer.key] = {
      enabled: notifToggleActive.checked,
      adzanAlarm: notifToggleAdzan.checked,
      days: activeDays,
      sound: notifSoundTitle.textContent,
      lead: notifLeadTitle.textContent
    };

    localStorage.setItem('prayer_notif_config', JSON.stringify(prayerNotifConfig));
    prayerNotifSheet.classList.remove('open');
    modalBackdrop.classList.remove('open');
    stopAdzanPlayback();
    showToast(`Pengaturan notifikasi ${selectedNotifPrayer.name} berhasil disimpan! 🔔`, '✓');
    renderPrayerTimes();
  });

  function renderPrayerTimes() {
    prayerCityName.textContent = currentCity.name.split(' (')[0];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    prayerHeaderDate.textContent = `Hari ini, ${currentPrayerDate.getDate()} ${months[currentPrayerDate.getMonth()]}`;
    prayerHeaderHijri.textContent = window.PrayerTimesEngine.getHijriDate(currentPrayerDate);

    // Render 7-day pill row (Screenshot 1)
    prayerDateRow.innerHTML = '';
    const dayNames = ['M', 'S', 'S', 'R', 'K', 'J', 'S']; // Min, Sen, Sel, Rab, Kam, Jum, Sab
    for (let offset = -3; offset <= 3; offset++) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      const isSelected = d.toDateString() === currentPrayerDate.toDateString();

      const pill = document.createElement('div');
      pill.className = `prayer-date-pill ${isSelected ? 'active' : ''}`;
      pill.innerHTML = `
        <span class="prayer-pill-num">${d.getDate()}</span>
        <span class="prayer-pill-day-circle">${dayNames[d.getDay()]}</span>
      `;
      pill.addEventListener('click', () => {
        currentPrayerDate = d;
        renderPrayerTimes();
      });
      prayerDateRow.appendChild(pill);
    }

    // Calculate prayer times
    const times = window.PrayerTimesEngine.calculate(
      currentPrayerDate,
      currentCity.lat,
      currentCity.lng,
      currentCity.timezone
    );

    const prayerOrder = [
      { key: 'subuh', name: 'Subuh', icon: '✨', time: times.subuh, raw: times.raw.subuh },
      { key: 'terbit', name: 'Terbit', icon: '🌅', time: times.terbit, raw: times.raw.terbit },
      { key: 'dzuhur', name: 'Dzuhur', icon: '☀️', time: times.dzuhur, raw: times.raw.dzuhur },
      { key: 'ashar', name: 'Ashar', icon: '🌤️', time: times.ashar, raw: times.raw.ashar },
      { key: 'maghrib', name: 'Maghrib', icon: '🌇', time: times.maghrib, raw: times.raw.maghrib },
      { key: 'isya', name: 'Isya', icon: '🌙', time: times.isya, raw: times.raw.isya }
    ];

    // Find next prayer & progress bar
    const now = new Date();
    const curDecimal = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
    let nextPrayer = null;
    let nextDiffMin = 99999;

    if (currentPrayerDate.toDateString() === now.toDateString()) {
      for (const p of prayerOrder) {
        if (p.key !== 'terbit' && p.raw > curDecimal) {
          nextPrayer = p;
          nextDiffMin = Math.round((p.raw - curDecimal) * 60);
          break;
        }
      }
      if (!nextPrayer) {
        nextPrayer = prayerOrder[0]; // next is Subuh tomorrow
        nextDiffMin = Math.round((24 - curDecimal + prayerOrder[0].raw) * 60);
      }

      // Progress bar percentage between Subuh and Isya
      const subuhDec = times.raw.subuh;
      const isyaDec = times.raw.isya;
      if (curDecimal < subuhDec) {
        prayerProgressBarFill.style.width = '10%';
      } else if (curDecimal > isyaDec) {
        prayerProgressBarFill.style.width = '100%';
      } else {
        const pct = Math.round(((curDecimal - subuhDec) / (isyaDec - subuhDec)) * 100);
        prayerProgressBarFill.style.width = `${Math.min(Math.max(pct, 10), 100)}%`;
      }
    }

    prayerTimesList.innerHTML = '';
    prayerOrder.forEach((p) => {
      const isNext = nextPrayer && nextPrayer.key === p.key;
      const card = document.createElement('div');
      card.className = `prayer-item-card ${isNext ? 'next-prayer' : ''}`;

      let countdownBadge = '';
      if (isNext) {
        const hoursLeft = Math.floor(nextDiffMin / 60);
        const minsLeft = nextDiffMin % 60;
        countdownBadge = `<span class="prayer-countdown-tag">dalam ${hoursLeft > 0 ? hoursLeft + 'j ' : ''}${minsLeft}m</span>`;
      }

      const notifSetting = prayerNotifConfig[p.key] || { enabled: true };

      card.innerHTML = `
        <div class="prayer-left">
          <div class="prayer-circle-status"></div>
          <span class="prayer-icon">${p.icon}</span>
          <div class="prayer-name-box">
            <h4>${p.name}</h4>
            ${countdownBadge}
          </div>
        </div>
        <div class="prayer-right">
          <span class="prayer-time-val">${p.time}</span>
          ${p.key !== 'terbit' ? `
            <button class="prayer-btn-action" title="Pengaturan Notifikasi Adzan" onclick="event.stopPropagation(); window.openPrayerNotifModal('${p.key}', '${p.name}');">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${notifSetting.enabled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          ` : `
            <span style="font-size:1.1rem;color:var(--text-muted);opacity:0.4;">🚫</span>
          `}
        </div>
      `;

      card.addEventListener('click', () => {
        if (p.key !== 'terbit') {
          openPrayerNotifModal(p.key, p.name);
        }
      });

      prayerTimesList.appendChild(card);
    });
  }

  window.openPrayerNotifModal = openPrayerNotifModal;

  // ========================================================
  // KOMPAS KIBLAT (Qibla Compass) Controller (Screenshot 3)
  // ========================================================
  const viewQibla = document.getElementById('viewQibla');
  const qiblaBackBtn = document.getElementById('qiblaBackBtn');
  const qiblaCityPill = document.getElementById('qiblaCityPill');
  const qiblaSensorPill = document.getElementById('qiblaSensorPill');
  const compassVisualWrap = document.getElementById('compassVisualWrap');
  const compassDialPlate = document.getElementById('compassDialPlate');
  const kaabaMarker = document.getElementById('kaabaMarker');
  const qiblaDegreeText = document.getElementById('qiblaDegreeText');
  const qiblaDistanceText = document.getElementById('qiblaDistanceText');
  const qiblaInstructionText = document.getElementById('qiblaInstructionText');
  const manualHeadingSlider = document.getElementById('manualHeadingSlider');

  let targetQiblaBearing = 295;
  let currentCompassHeading = 0;
  let orientationListenerBound = false;
  let currentCompassSkin = localStorage.getItem('compass_skin') || 'pink';

  // Apply saved skin
  applyCompassSkin(currentCompassSkin);

  function applyCompassSkin(skinName) {
    currentCompassSkin = skinName;
    localStorage.setItem('compass_skin', skinName);
    compassDialPlate.className = `compass-dial-plate skin-${skinName}`;

    document.querySelectorAll('.compass-skins-row .skin-thumb').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.skin === skinName);
    });
  }

  // Dial Skin Chooser listeners (Screenshot 3)
  document.querySelectorAll('.compass-skins-row .skin-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      applyCompassSkin(btn.dataset.skin);
      showToast(`Tema kompas diubah ke: ${btn.querySelector('.skin-name').textContent}`, '🧭');
    });
  });

  function openQiblaView() {
    closeAllPageViews();
    closeAllModals();
    if (viewQibla) viewQibla.scrollTop = 0;
    viewQibla.classList.add('active');
    setActiveBottomNav('btnNavQibla');
    updateQiblaBearing();
    bindDeviceOrientation();
  }

  qiblaBackBtn.addEventListener('click', () => {
    viewQibla.classList.remove('active');
    setActiveBottomNav('btnNavHome');
  });

  document.getElementById('btnNavQibla').addEventListener('click', openQiblaView);
  document.getElementById('btnMenuQibla').addEventListener('click', openQiblaView);

  function updateQiblaBearing() {
    targetQiblaBearing = Math.round(
      window.PrayerTimesEngine.getQiblaBearing(currentCity.lat, currentCity.lng)
    );
    const distanceKm = window.PrayerTimesEngine.getDistanceToKaaba(currentCity.lat, currentCity.lng);

    qiblaCityPill.textContent = `📍 ${currentCity.name.split(' (')[0]}`;
    qiblaDegreeText.textContent = `${targetQiblaBearing}° Baratlaut`;
    qiblaDistanceText.textContent = `Jarak ke Ka'bah: ~${distanceKm.toLocaleString('id-ID')} km`;

    // Position the Ka'bah marker at the exact angle on the dial
    kaabaMarker.style.transform = `translateX(-50%) rotate(${targetQiblaBearing}deg)`;
    applyCompassRotation(currentCompassHeading);
  }

  function applyCompassRotation(heading) {
    currentCompassHeading = heading;
    // Rotate the dial opposite to device heading
    compassDialPlate.style.transform = `rotate(${-heading}deg)`;

    // Check if device is facing Kaaba (within ±4 degrees)
    const diff = Math.abs(((heading - targetQiblaBearing + 540) % 360) - 180);
    if (diff <= 4) {
      compassVisualWrap.classList.add('aligned');
      qiblaInstructionText.innerHTML = `<strong style="color:var(--primary);font-size:1rem;">✓ TEPAT MENGHADAP KA'BAH (KIBLAT)!</strong><br>Arah kiblat presisi telah ditemukan. Siap untuk sholat.`;
      if (navigator.vibrate) navigator.vibrate([40, 30, 60]);
    } else {
      compassVisualWrap.classList.remove('aligned');
      qiblaInstructionText.textContent = `Putar HP Anda perlahan hingga jarum lurus sejajar dengan ikon Ka'bah (🕋).`;
    }
  }

  function bindDeviceOrientation() {
    if (orientationListenerBound) return;

    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        qiblaSensorPill.textContent = '🧭 Sentuh untuk Kalibrasi';
        qiblaSensorPill.style.cursor = 'pointer';
        qiblaSensorPill.onclick = () => {
          DeviceOrientationEvent.requestPermission().then((res) => {
            if (res === 'granted') {
              qiblaSensorPill.textContent = '🧭 Sensor Aktif';
              attachOrientationListener();
            }
          });
        };
      } else {
        attachOrientationListener();
      }
    } else {
      qiblaSensorPill.textContent = '🧭 Mode Manual (PC)';
    }
  }

  function attachOrientationListener() {
    orientationListenerBound = true;
    window.addEventListener('deviceorientationabsolute', (e) => {
      if (e.alpha !== null) {
        const heading = 360 - e.alpha;
        qiblaSensorPill.textContent = '🧭 Sensor Kompas Aktif';
        applyCompassRotation(heading);
      }
    }, true);

    window.addEventListener('deviceorientation', (e) => {
      if (e.webkitCompassHeading) {
        qiblaSensorPill.textContent = '🧭 Sensor Kompas Aktif';
        applyCompassRotation(e.webkitCompassHeading);
      } else if (e.alpha !== null && !('ondeviceorientationabsolute' in window)) {
        const heading = 360 - e.alpha;
        qiblaSensorPill.textContent = '🧭 Sensor Kompas Aktif';
        applyCompassRotation(heading);
      }
    }, true);
  }

  manualHeadingSlider.addEventListener('input', (e) => {
    applyCompassRotation(parseInt(e.target.value, 10));
  });

  // ========================================================
  // 99 ASMAUL HUSNA Controller (Suara, Teks Arab & Terjemahan)
  // ========================================================
  const viewAsmaul = document.getElementById('viewAsmaul');
  const asmaulBackBtn = document.getElementById('asmaulBackBtn');
  const asmaulShareBtn = document.getElementById('asmaulShareBtn');
  const btnPlayAllAsmaul = document.getElementById('btnPlayAllAsmaul');
  const asmaulAudioStatus = document.getElementById('asmaulAudioStatus');
  const asmaulPlayCircleIcon = document.getElementById('asmaulPlayCircleIcon');
  const searchAsmaulInput = document.getElementById('searchAsmaulInput');
  const asmaulGridContainer = document.getElementById('asmaulGridContainer');

  const asmaulAudio = new Audio(window.ASMAUL_HUSNA_AUDIO_URL);
  let isAsmaulPlaying = false;

  function openAsmaulView() {
    closeAllPageViews();
    closeAllModals();
    if (viewAsmaul) viewAsmaul.scrollTop = 0;
    viewAsmaul.classList.add('active');
    setActiveBottomNav('btnNavAsmaul');
    renderAsmaulGrid();
  }

  asmaulBackBtn.addEventListener('click', () => {
    viewAsmaul.classList.remove('active');
    setActiveBottomNav('btnNavHome');
  });

  const btnNavAsmaul = document.getElementById('btnNavAsmaul');
  if (btnNavAsmaul) btnNavAsmaul.addEventListener('click', openAsmaulView);
  const btnMenuAsmaul = document.getElementById('btnMenuAsmaul');
  if (btnMenuAsmaul) btnMenuAsmaul.addEventListener('click', openAsmaulView);

  btnPlayAllAsmaul.addEventListener('click', () => {
    if (isAsmaulPlaying) {
      asmaulAudio.pause();
      isAsmaulPlaying = false;
      asmaulAudioStatus.textContent = 'Sentuh untuk memutar audio merdu';
      asmaulPlayCircleIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      showToast('Audio Asmaul Husna dijeda');
    } else {
      asmaulAudio.play().then(() => {
        isAsmaulPlaying = true;
        asmaulAudioStatus.textContent = 'Sedang memutar lantunan 99 Asmaul Husna merdu...';
        asmaulPlayCircleIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
        showToast('Memutar 99 Asmaul Husna Lengkap 🌸', '✨');
      }).catch(err => {
        showToast('Gagal memuat audio Asmaul Husna.');
      });
    }
  });

  asmaulAudio.addEventListener('ended', () => {
    isAsmaulPlaying = false;
    asmaulAudioStatus.textContent = 'Sentuh untuk memutar audio merdu';
    asmaulPlayCircleIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
  });

  let asmaulQuery = '';
  searchAsmaulInput.addEventListener('input', (e) => {
    asmaulQuery = e.target.value.trim().toLowerCase();
    renderAsmaulGrid();
  });

  function renderAsmaulGrid() {
    asmaulGridContainer.innerHTML = '';
    const filtered = window.ASMAUL_HUSNA_DATA.filter((item) => {
      if (!asmaulQuery) return true;
      return (
        item.latin.toLowerCase().includes(asmaulQuery) ||
        item.arti.toLowerCase().includes(asmaulQuery) ||
        item.arab.includes(asmaulQuery) ||
        String(item.nomor) === asmaulQuery
      );
    });

    if (filtered.length === 0) {
      asmaulGridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-title">Tidak Ditemukan</div>
          <div class="empty-state-desc">Coba gunakan nama latin atau terjemahan arti yang lain.</div>
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'asmaul-item-card';
      card.innerHTML = `
        <div class="asmaul-card-header">
          <span class="asmaul-num-badge">${item.nomor}</span>
          <button class="asmaul-speak-btn" title="Dengarkan Suara" onclick="event.stopPropagation(); speakArabic('${item.arab}', '${item.latin}', '${escape(item.arti)}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>
        <div class="asmaul-arabic-text">${item.arab}</div>
        <div class="asmaul-latin-text">${item.latin}</div>
        <div class="asmaul-meaning-text">${item.arti}</div>
      `;

      card.addEventListener('click', () => {
        speakArabic(item.arab, item.latin, escape(item.arti));
      });

      asmaulGridContainer.appendChild(card);
    });
  }

  // Dual Sound Engine for individual Asmaul Husna pronunciation:
  // 1. Web Speech Synthesis in Arabic
  // 2. Beautiful Harmonic Bell Tone via Web Audio API
  let audioCtx = null;
  function playHarmonicChime() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime); // Solfeggio 528Hz love/peace frequency
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  }

  window.speakArabic = (arabicText, latin, artiEnc) => {
    playHarmonicChime();
    const arti = artiEnc ? unescape(artiEnc) : '';

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(arabicText);
      utter.lang = 'ar-SA';
      utter.rate = 0.8;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
      showToast(`${latin} (${arabicText}) — "${arti}"`, '🔊');
    } else {
      showToast(`${latin}: ${arabicText} — ${arti}`, '✨');
    }
  };

  asmaulShareBtn.addEventListener('click', async () => {
    const shareData = {
      title: '99 Asmaul Husna - Murottal Quran',
      text: 'Mari mengenal dan menghafal 99 Nama Indah Allah (Asmaul Husna) beserta arti dan lantunan suaranya di aplikasi Murottal Quran.',
      url: window.location.href
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) {}
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      showToast('Teks Asmaul Husna disalin ke clipboard!', '✓');
    }
  });

  function setActiveBottomNav(btnId) {
    document.querySelectorAll('.bottom-nav .nav-tab-btn').forEach(b => b.classList.remove('active'));
    const target = document.getElementById(btnId);
    if (target) target.classList.add('active');
  }

  // Automatic Adzan Alarm Monitor
  let lastAdzanTriggerKey = '';

  function checkPrayerTimeAdzanAlarm() {
    try {
      if (!window.PrayerTimesEngine) return;
      const now = new Date();
      const dateKey = now.toDateString();
      const times = window.PrayerTimesEngine.calculate(
        now,
        currentCity.lat,
        currentCity.lng,
        currentCity.timezone
      );

      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const curTimeStr = `${hh}:${mm}`;

      const prayers = [
        { key: 'subuh', name: 'Subuh', time: times.subuh },
        { key: 'dzuhur', name: 'Dzuhur', time: times.dzuhur },
        { key: 'ashar', name: 'Ashar', time: times.ashar },
        { key: 'maghrib', name: 'Maghrib', time: times.maghrib },
        { key: 'isya', name: 'Isya', time: times.isya }
      ];

      for (const p of prayers) {
        if (p.time === curTimeStr) {
          const triggerId = `${dateKey}_${p.key}_${curTimeStr}`;
          if (lastAdzanTriggerKey !== triggerId) {
            lastAdzanTriggerKey = triggerId;
            const notifCfg = prayerNotifConfig[p.key] || { enabled: true, adzanAlarm: true };
            if (notifCfg.enabled !== false) {
              showToast(`🕌 Waktu Sholat ${p.name} Telah Tiba! (${p.time})`, '🔔');
              // Play adzan if alarm enabled
              if (notifCfg.adzanAlarm !== false && !isAdzanPlaying) {
                toggleAdzanPlayback();
              }
            }
          }
          break;
        }
      }
    } catch (e) {
      console.warn('Prayer alarm check error:', e);
    }
  }

  // Update Countdown Timer & Prayer Times & check alarm every 20 seconds
  setInterval(() => {
    checkPrayerTimeAdzanAlarm();
    if (viewPrayer.classList.contains('active')) {
      renderPrayerTimes();
    }
  }, 20000);

  // Expose showToast globally for kajian.js
  window.showAppToast = showToast;

  // ========================================================
  // FITUR BARU: TATA CARA WUDHU
  // ========================================================
  const viewWudhu = document.getElementById('viewWudhu');

  function openWudhuView() {
    closeAllPageViews();
    closeAllModals();
    viewWudhu.classList.add('active');
    renderWudhuContent();
    setActiveBottomNav('');
  }

  function renderWudhuContent() {
    if (!window.WUDHU_DATA) return;
    const data = window.WUDHU_DATA;

    // Dalil Banner
    const dalilArab = document.getElementById('wudhuDalilArab');
    const dalilLatin = document.getElementById('wudhuDalilLatin');
    const dalilTerjemahan = document.getElementById('wudhuDalilTerjemahan');
    const dalilSumber = document.getElementById('wudhuDalilSumber');
    if (dalilArab) dalilArab.textContent = data.intro.dalil.arab;
    if (dalilLatin) dalilLatin.textContent = data.intro.dalil.latin;
    if (dalilTerjemahan) dalilTerjemahan.textContent = data.intro.dalil.terjemahan;
    if (dalilSumber) dalilSumber.textContent = '📖 ' + data.intro.dalil.sumber;

    // Rukun list
    const rukunList = document.getElementById('wudhuRukunList');
    if (rukunList) {
      rukunList.innerHTML = data.rukunRingkasan.map(r => `<div class="feature-summary-item">✅ ${r}</div>`).join('');
    }

    // Langkah-langkah
    const langkahContainer = document.getElementById('wudhuLangkahContainer');
    if (langkahContainer) {
      langkahContainer.innerHTML = '';
      data.langkah.forEach(step => {
        const card = document.createElement('div');
        card.className = 'dzikir-card wudhu-step-card';
        const isRukun = step.status === 'rukun';
        const kartunSvg = window.KartunIllustrations ? window.KartunIllustrations.getWudhuSvg(step.nomor) : '';
        card.innerHTML = `
          <div class="wudhu-step-header">
            <div class="wudhu-step-num">${step.nomor}</div>
            <div class="wudhu-step-emoji">${step.emoji || '💧'}</div>
            <div class="wudhu-step-nama">${step.nama}</div>
            <span class="wudhu-status-badge ${isRukun ? 'badge-rukun' : 'badge-sunah'}">${isRukun ? 'RUKUN' : 'SUNAH'}</span>
          </div>
          ${kartunSvg ? `<div class="kartun-step-visual">${kartunSvg}</div>` : ''}
          ${step.arab ? `<div class="dzikir-arab-text" style="font-size:1.5rem;margin:10px 0;">${step.arab}</div>` : ''}
          ${step.latin ? `<div class="dzikir-latin-text">${step.latin}</div>` : ''}
          ${step.terjemahan ? `<div class="dzikir-translation-text" style="margin-bottom:8px;">"${step.terjemahan}"</div>` : ''}
          <div class="wudhu-step-keterangan">${step.keterangan}</div>
          ${step.catatan ? `<div class="feature-catatan-inline">ℹ️ <em>${step.catatan}</em></div>` : ''}
          ${step.referensi ? `<div class="feature-referensi">📚 ${step.referensi}</div>` : ''}
        `;
        langkahContainer.appendChild(card);
      });
    }

    // Pembatal Wudhu
    const pembatalContainer = document.getElementById('wudhuPembatalContainer');
    if (pembatalContainer) {
      pembatalContainer.innerHTML = '';
      data.pembatalWudhu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dzikir-card';
        card.innerHTML = `
          <div class="wudhu-step-header">
            <div class="wudhu-step-num">${item.no}</div>
            <div class="wudhu-step-nama">${item.nama}</div>
          </div>
          <div class="wudhu-step-keterangan">${item.keterangan}</div>
          ${item.catatan ? `<div class="feature-catatan-inline">ℹ️ <em>${item.catatan}</em></div>` : ''}
          ${item.dalil ? `<div class="feature-referensi">📚 ${item.dalil}</div>` : ''}
        `;
        pembatalContainer.appendChild(card);
      });
    }

    // Catatan penting
    const catatanEl = document.getElementById('wudhuCatatan');
    if (catatanEl) catatanEl.textContent = '⚠️ ' + data.catatanPenting;

    // Tab switching
    const tabLangkah = document.getElementById('tabWudhuLangkah');
    const tabPembatal = document.getElementById('tabWudhuPembatal');
    if (tabLangkah) {
      tabLangkah.onclick = () => {
        tabLangkah.classList.add('active'); tabPembatal.classList.remove('active');
        langkahContainer.style.display = 'block'; pembatalContainer.style.display = 'none';
      };
    }
    if (tabPembatal) {
      tabPembatal.onclick = () => {
        tabPembatal.classList.add('active'); tabLangkah.classList.remove('active');
        pembatalContainer.style.display = 'block'; langkahContainer.style.display = 'none';
      };
    }
  }

  const wudhuBackBtn = document.getElementById('wudhuBackBtn');
  if (wudhuBackBtn) wudhuBackBtn.addEventListener('click', () => { viewWudhu.classList.remove('active'); setActiveBottomNav('btnNavHome'); });
  const btnMenuWudhu = document.getElementById('btnMenuWudhu');
  if (btnMenuWudhu) btnMenuWudhu.addEventListener('click', () => { closeAllModals(); openWudhuView(); });

  // ========================================================
  // FITUR BARU: PANDUAN SALAT
  // ========================================================
  const viewPanduanSalat = document.getElementById('viewPanduanSalat');
  let salatCurrentStep = 0;

  function openPanduanSalatView() {
    closeAllPageViews();
    closeAllModals();
    viewPanduanSalat.classList.add('active');
    viewPanduanSalat.scrollTop = 0;
    viewPanduanSalat.scrollLeft = 0;
    salatCurrentStep = 0;
    renderPanduanSalatContent();
    setActiveBottomNav('');
  }

  function renderPanduanSalatContent() {
    if (!window.SALAT_DATA) return;
    const data = window.SALAT_DATA;

    // Step Navigator (pill buttons)
    const stepNav = document.getElementById('salatStepNav');
    if (stepNav) {
      stepNav.innerHTML = data.langkah.map((step, i) => `
        <button class="salat-step-pill ${i === salatCurrentStep ? 'active' : ''}" data-step="${i}" title="${step.nama}">
          ${i + 1}
        </button>
      `).join('');

      function scrollPill(btn) {
        if (!btn || !stepNav) return;
        const target = btn.offsetLeft - (stepNav.clientWidth / 2) + (btn.clientWidth / 2);
        stepNav.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
      }

      const activeBtn = stepNav.querySelector('.salat-step-pill.active');
      if (activeBtn) {
        setTimeout(() => scrollPill(activeBtn), 50);
      }
      stepNav.querySelectorAll('.salat-step-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          salatCurrentStep = parseInt(btn.dataset.step);
          renderSalatStepDetail();
          stepNav.querySelectorAll('.salat-step-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          scrollPill(btn);
        });
      });
    }

    renderSalatStepDetail();

    // Syarat Sholat
    const syaratCard = document.getElementById('salatSyaratCard');
    const syaratList = document.getElementById('salatSyaratList');
    if (syaratList && data.syarat) {
      syaratList.innerHTML = data.syarat.items.map(s => `
        <div class="feature-summary-item"><strong>${s.nama}:</strong> ${s.keterangan}</div>
      `).join('');
      if (syaratCard) syaratCard.style.display = 'block';
    }

    // Sholat Wajib
    const wajibList = document.getElementById('salatWajibList');
    if (wajibList && data.shalatWajib) {
      wajibList.innerHTML = data.shalatWajib.map(s => `
        <div class="salat-wajib-item">
          <div class="salat-wajib-nama">${s.nama}</div>
          <div class="salat-wajib-info">${s.rakaat} rakaat · ${s.bacaanJahr}</div>
          <div class="salat-wajib-waktu">${s.waktu}</div>
        </div>
      `).join('');
    }

    // Catatan
    const catatanEl = document.getElementById('salatCatatan');
    if (catatanEl) catatanEl.textContent = '⚠️ ' + data.catatanPenting;
  }

  function renderSalatStepDetail() {
    if (!window.SALAT_DATA) return;
    const step = window.SALAT_DATA.langkah[salatCurrentStep];
    if (!step) return;
    const detail = document.getElementById('salatStepDetail');
    if (!detail) return;
    const isRukun = step.status === 'rukun';
    const total = window.SALAT_DATA.langkah.length;
    const kartunSvg = window.KartunIllustrations ? window.KartunIllustrations.getSalatSvg(step.id) : '';
    detail.innerHTML = `
      <div class="salat-step-card">
        <div class="salat-step-card-header">
          <div class="wudhu-step-num">${step.nomor}</div>
          <div class="wudhu-step-emoji">${step.emoji || '🙏'}</div>
          <div class="wudhu-step-nama">${step.nama}</div>
          <span class="wudhu-status-badge ${isRukun ? 'badge-rukun' : 'badge-sunah'}">${isRukun ? 'RUKUN' : 'SUNAH'}</span>
        </div>
        ${kartunSvg ? `<div class="kartun-step-visual">${kartunSvg}</div>` : ''}
        ${step.bacaanArab ? `<div class="dzikir-arab-text" style="font-size:1.5rem;padding:12px 0;">${step.bacaanArab}</div>` : ''}
        ${step.bacaanLatin ? `<div class="dzikir-latin-text">${step.bacaanLatin}</div>` : ''}
        ${step.bacaanTerjemahan ? `<div class="dzikir-translation-text">"${step.bacaanTerjemahan}"</div>` : ''}
        ${step.bacaanTambahan ? `
          <div style="margin-top:8px;padding:10px;background:var(--primary-soft);border-radius:var(--radius-sm);">
            <div class="dzikir-arab-text" style="font-size:1.2rem;">${step.bacaanTambahan.arab}</div>
            <div class="dzikir-latin-text">${step.bacaanTambahan.latin}</div>
            <div class="dzikir-translation-text">"${step.bacaanTambahan.terjemahan}"</div>
          </div>` : ''}
        <div class="wudhu-step-keterangan" style="margin-top:10px;">${step.penjelasan}</div>
        ${step.catatan ? `<div class="feature-catatan-inline">ℹ️ <em>${step.catatan}</em></div>` : ''}
        ${step.referensi ? `<div class="feature-referensi">📚 ${step.referensi}</div>` : ''}
        <div class="salat-step-nav-btns">
          ${salatCurrentStep > 0 ? `<button class="chip-btn" id="salatPrevBtn">◀ Sebelumnya</button>` : '<div></div>'}
          <span style="font-size:0.8rem;color:var(--text-muted);">${salatCurrentStep + 1} / ${total}</span>
          ${salatCurrentStep < total - 1 ? `<button class="chip-btn active" id="salatNextBtn">Selanjutnya ▶</button>` : '<button class="chip-btn" style="background:var(--primary);color:white;">✅ Selesai</button>'}
        </div>
      </div>
    `;
    detail.querySelector('#salatPrevBtn')?.addEventListener('click', () => {
      salatCurrentStep--;
      renderPanduanSalatContent();
    });
    detail.querySelector('#salatNextBtn')?.addEventListener('click', () => {
      salatCurrentStep++;
      renderPanduanSalatContent();
    });
  }

  const panduanSalatBackBtn = document.getElementById('panduanSalatBackBtn');
  if (panduanSalatBackBtn) panduanSalatBackBtn.addEventListener('click', () => { viewPanduanSalat.classList.remove('active'); setActiveBottomNav('btnNavHome'); });
  const btnMenuPanduanSalat = document.getElementById('btnMenuPanduanSalat');
  if (btnMenuPanduanSalat) btnMenuPanduanSalat.addEventListener('click', () => { closeAllModals(); openPanduanSalatView(); });

  // ========================================================
  // FITUR BARU: SHOLAWAT NABI
  // ========================================================
  const viewSholawat = document.getElementById('viewSholawat');
  let sholawatActiveKategori = 'semua';
  let sholawatQuery = '';
  let sholawatFavIds = new Set(JSON.parse(localStorage.getItem('sholawat_favorites') || '[]'));

  function openSholawatView() {
    closeAllPageViews();
    closeAllModals();
    viewSholawat.classList.add('active');
    renderSholawatKategori();
    renderSholawatList();
    setActiveBottomNav('btnNavSholawat');
  }

  function renderSholawatKategori() {
    const chips = document.getElementById('sholawatKategoriChips');
    if (!chips || !window.SHOLAWAT_KATEGORI) return;
    chips.innerHTML = '';
    window.SHOLAWAT_KATEGORI.forEach(kat => {
      const btn = document.createElement('button');
      btn.className = `chip-btn ${kat.id === sholawatActiveKategori ? 'active' : ''}`;
      btn.textContent = `${kat.emoji} ${kat.nama}`;
      btn.addEventListener('click', () => {
        sholawatActiveKategori = kat.id;
        renderSholawatKategori();
        renderSholawatList();
      });
      chips.appendChild(btn);
    });
  }

  function renderSholawatList() {
    const container = document.getElementById('sholawatListContainer');
    if (!container || !window.SHOLAWAT_DATA) return;
    container.innerHTML = '';

    const filtered = window.SHOLAWAT_DATA.filter(s => {
      if (sholawatActiveKategori === 'semua') return true;
      if (sholawatActiveKategori === 'terverifikasi') return s.statusVerifikasi === 'terverifikasi';
      return s.kategori === sholawatActiveKategori;
    }).filter(s => {
      if (!sholawatQuery) return true;
      const q = sholawatQuery.toLowerCase();
      return s.nama.toLowerCase().includes(q) || s.latin.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div class="empty-state"><div class="empty-state-title">Tidak ditemukan</div></div>';
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dzikir-card sholawat-card';
      const isFav = sholawatFavIds.has(item.id);
      const statusIcon = item.statusVerifikasi === 'terverifikasi' ? '✅' : item.statusVerifikasi === 'qurani' ? '📖' : '📜';
      card.innerHTML = `
        <div class="sholawat-card-header">
          <div>
            <div class="sholawat-nama">${item.nama}</div>
            <span class="sholawat-status">${statusIcon} ${item.statusVerifikasi === 'terverifikasi' ? 'Dari Hadis Shahih' : item.statusVerifikasi === 'teks-terverifikasi-bukan-hadis' ? 'Tradisi Ulama' : 'Dari Al-Qur\'an'}</span>
          </div>
          <button class="sholawat-fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}">${isFav ? '❤️' : '🤍'}</button>
        </div>
        <div class="dzikir-arab-text" style="font-size:1.5rem;margin:10px 0;text-align:right;">${item.arab}</div>
        <div class="dzikir-latin-text">${item.latin}</div>
        <div class="dzikir-translation-text">"${item.terjemahan}"</div>
        <div class="feature-referensi" style="margin-top:8px;">📚 ${item.sumber}</div>
        ${item.catatan ? `<div class="feature-catatan-inline">ℹ️ ${item.catatan}</div>` : ''}
        <div class="sholawat-keterangan" style="margin-top:6px;font-size:0.82rem;color:var(--text-secondary);">${item.keterangan}</div>
        ${item.hasAudio && item.youtubeId ? `
          <div class="sholawat-audio-wrap">
            <button class="sholawat-play-btn" data-videoid="${item.youtubeId}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>Putar Audio & Video (${item.penyanyi || 'Merdu'})</span>
            </button>
            <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="sholawat-yt-link" title="Buka di YouTube">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.37.44A3.02 3.02 0 00.5 6.19C.06 8.07 0 12 0 12s.06 3.93.5 5.81a3.02 3.02 0 002.13 2.13C4.5 20.4 12 20.4 12 20.4s7.5 0 9.37-.46a3.02 3.02 0 002.13-2.13C23.94 15.93 24 12 24 12s-.06-3.93-.5-5.81zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"></path></svg>
              <span>YouTube</span>
            </a>
          </div>
        ` : `<div class="sholawat-no-audio">📖 Khusus Bacaan Teks & Terjemahan</div>`}
      `;

      const playBtn = card.querySelector('.sholawat-play-btn');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.KajianManager && window.KajianManager.openVideoPlayer) {
            window.KajianManager.openVideoPlayer({
              videoId: item.youtubeId,
              judul: item.nama,
              channelTitle: item.penyanyi || 'Lantunan Sholawat Merdu',
              url: item.youtubeUrl
            });
          }
        });
      }

      card.querySelector('.sholawat-fav-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (sholawatFavIds.has(item.id)) {
          sholawatFavIds.delete(item.id);
          e.currentTarget.textContent = '🤍';
          e.currentTarget.classList.remove('active');
        } else {
          sholawatFavIds.add(item.id);
          e.currentTarget.textContent = '❤️';
          e.currentTarget.classList.add('active');
        }
        localStorage.setItem('sholawat_favorites', JSON.stringify([...sholawatFavIds]));
      });

      container.appendChild(card);
    });
  }

  const sholawatBackBtn = document.getElementById('sholawatBackBtn');
  if (sholawatBackBtn) sholawatBackBtn.addEventListener('click', () => { viewSholawat.classList.remove('active'); setActiveBottomNav('btnNavHome'); });

  const sholawatSearchToggleBtn = document.getElementById('sholawatSearchToggleBtn');
  const sholawatSearchBar = document.getElementById('sholawatSearchBar');
  if (sholawatSearchToggleBtn) {
    sholawatSearchToggleBtn.addEventListener('click', () => {
      const isVisible = sholawatSearchBar.style.display !== 'none';
      sholawatSearchBar.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) document.getElementById('sholawatSearchInput')?.focus();
    });
  }

  const sholawatSearchInput = document.getElementById('sholawatSearchInput');
  if (sholawatSearchInput) {
    sholawatSearchInput.addEventListener('input', () => {
      sholawatQuery = sholawatSearchInput.value.trim();
      renderSholawatList();
    });
  }

  const btnNavSholawat = document.getElementById('btnNavSholawat');
  if (btnNavSholawat) btnNavSholawat.addEventListener('click', openSholawatView);
  const btnMenuSholawat = document.getElementById('btnMenuSholawat');
  if (btnMenuSholawat) btnMenuSholawat.addEventListener('click', () => { closeAllModals(); openSholawatView(); });

  // ========================================================
  // FITUR BARU: KAJIAN USTAZ (YouTube)
  // ========================================================
  const viewKajian = document.getElementById('viewKajian');

  function openKajianView() {
    closeAllPageViews();
    closeAllModals();
    viewKajian.style.display = '';
    const viewVideos = document.getElementById('viewKajianVideos');
    if (viewVideos) {
      viewVideos.style.display = '';
      viewVideos.classList.remove('active');
    }
    viewKajian.classList.add('active');
    setActiveBottomNav('');
    // Load channels on first open
    if (window.KajianManager && window.KajianManager.loadChannels) {
      window.KajianManager.loadChannels();
    }
  }

  const kajianBackBtn = document.getElementById('kajianBackBtn');
  if (kajianBackBtn) kajianBackBtn.addEventListener('click', () => {
    viewKajian.classList.remove('active');
    const viewVideos = document.getElementById('viewKajianVideos');
    if (viewVideos) viewVideos.classList.remove('active');
    setActiveBottomNav('btnNavHome');
  });
  const btnMenuKajian = document.getElementById('btnMenuKajian');
  if (btnMenuKajian) btnMenuKajian.addEventListener('click', () => { closeAllModals(); openKajianView(); });

  // Initialize KajianManager
  if (window.KajianManager) window.KajianManager.init();

  // Initial Render
  renderSurahList();

  // Hide Splash Screen after brief smooth transition
  setTimeout(() => {
    const splash = document.getElementById('splashScreen');
    if (splash) splash.classList.add('fade-out');
  }, 1000);
});

