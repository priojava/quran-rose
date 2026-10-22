// ========================================================
// Offline Storage Manager (IndexedDB)
// Handles audio downloading, offline caching, and usage tracking
// ========================================================

const StorageManager = {
  dbName: 'MurottalQuranDB',
  dbVersion: 1,
  db: null,

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('audio_cache')) {
          const store = db.createObjectStore('audio_cache', { keyPath: 'key' });
          store.createIndex('surahNo', 'surahNo', { unique: false });
        }
        if (!db.objectStoreNames.contains('user_settings')) {
          db.createObjectStore('user_settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  buildKey(surahNo, qariId, isTranslation) {
    return `${surahNo}_${qariId}_${isTranslation ? 'trans' : 'murottal'}`;
  },

  async saveAudio(surahNo, qariId, isTranslation, blob, surahName) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audio_cache'], 'readwrite');
      const store = transaction.objectStore('audio_cache');
      const key = this.buildKey(surahNo, qariId, isTranslation);

      const record = {
        key,
        surahNo,
        qariId,
        isTranslation,
        blob,
        size: blob.size,
        surahName,
        savedAt: Date.now()
      };

      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  },

  async getAudio(surahNo, qariId, isTranslation) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audio_cache'], 'readonly');
      const store = transaction.objectStore('audio_cache');
      const key = this.buildKey(surahNo, qariId, isTranslation);

      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => reject(req.error);
    });
  },

  async isDownloaded(surahNo, qariId, isTranslation) {
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['audio_cache'], 'readonly');
      const store = transaction.objectStore('audio_cache');
      const key = this.buildKey(surahNo, qariId, isTranslation);

      const req = store.count(key);
      req.onsuccess = () => resolve(req.result > 0);
      req.onerror = () => resolve(false);
    });
  },

  async deleteAudio(surahNo, qariId, isTranslation) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audio_cache'], 'readwrite');
      const store = transaction.objectStore('audio_cache');
      const key = this.buildKey(surahNo, qariId, isTranslation);

      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  },

  async getAllDownloads() {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audio_cache'], 'readonly');
      const store = transaction.objectStore('audio_cache');
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  },

  async getTotalStorageBytes() {
    const list = await this.getAllDownloads();
    return list.reduce((acc, item) => acc + (item.size || 0), 0);
  },

  formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  async clearAllAudio() {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['audio_cache'], 'readwrite');
      const store = transaction.objectStore('audio_cache');
      const req = store.clear();

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  },

  // Smart Stream Downloader with Real-time Progress (0 - 100%) & Safe Fallback
  async downloadAudioFile(url, onProgress) {
    try {
      if (onProgress) onProgress(10);
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      // Fallback if ReadableStream is not supported or Content-Length is missing
      if (!response.body || !total || typeof response.body.getReader !== 'function') {
        if (onProgress) onProgress(50);
        const blob = await response.blob();
        if (onProgress) onProgress(100);
        if (blob.size < 500) throw new Error('Ukuran file audio terlalu kecil.');
        return blob;
      }

      try {
        const reader = response.body.getReader();
        let received = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          if (onProgress && total > 0) {
            const percent = Math.min(99, Math.round((received / total) * 100));
            onProgress(percent);
          }
        }
        if (onProgress) onProgress(100);
        const resultBlob = new Blob(chunks, { type: 'audio/mpeg' });
        if (resultBlob.size < 500) throw new Error('File hasil download tidak valid.');
        return resultBlob;
      } catch (streamErr) {
        console.warn('Streaming download gagal, fallback ke direct blob:', streamErr);
        if (onProgress) onProgress(60);
        const fallbackRes = await fetch(url);
        const fallbackBlob = await fallbackRes.blob();
        if (onProgress) onProgress(100);
        return fallbackBlob;
      }
    } catch (err) {
      console.error('StorageManager downloadAudioFile error:', err);
      throw err;
    }
  }
};

window.StorageManager = StorageManager;
