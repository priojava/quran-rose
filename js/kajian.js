// ========================================================
// Kajian Ustaz - YouTube Integration Controller
// Quran Rose v2.1
// ========================================================

window.KajianManager = (function() {
  const API_BASE = './api/youtube.php';
  const LS_FAVORITES = 'kajian_favorites';
  const LS_HISTORY = 'kajian_history';
  const LS_CHANNELS = 'kajian_channels_cache';

  let channels = [];
  let currentChannelId = null;
  let currentVideos = [];
  let nextPageToken = null;
  let isLoading = false;
  let apiAvailable = null; // null = belum dicek, true/false = sudah dicek

  // ---- State ----
  function getFavorites() {
    return JSON.parse(localStorage.getItem(LS_FAVORITES) || '[]');
  }
  function saveFavorite(videoId) {
    const favs = getFavorites();
    if (!favs.includes(videoId)) { favs.push(videoId); localStorage.setItem(LS_FAVORITES, JSON.stringify(favs)); }
  }
  function removeFavorite(videoId) {
    const favs = getFavorites().filter(id => id !== videoId);
    localStorage.setItem(LS_FAVORITES, JSON.stringify(favs));
  }
  function isFavorite(videoId) { return getFavorites().includes(videoId); }

  function addHistory(video) {
    let history = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]');
    history = history.filter(v => v.videoId !== video.videoId);
    history.unshift({ ...video, tonton: new Date().toISOString() });
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem(LS_HISTORY, JSON.stringify(history));
  }
  function getHistory() { return JSON.parse(localStorage.getItem(LS_HISTORY) || '[]'); }

  // ---- API ----
  async function checkApiAvailability() {
    if (apiAvailable !== null) return apiAvailable;
    try {
      const res = await fetch(`${API_BASE}?action=channels`, { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      if (data.status === 'error' && data.code === 'API_NOT_CONFIGURED') {
        apiAvailable = false;
      } else {
        apiAvailable = true;
      }
    } catch (e) {
      apiAvailable = false;
    }
    return apiAvailable;
  }

  async function fetchChannels() {
    try {
      const res = await fetch(`${API_BASE}?action=channels`);
      const data = await res.json();
      if (data.status === 'ok') {
        channels = data.channels;
        localStorage.setItem(LS_CHANNELS, JSON.stringify(channels));
        return channels;
      }
    } catch (e) {}
    // Fallback ke cache
    const cached = localStorage.getItem(LS_CHANNELS);
    if (cached) { channels = JSON.parse(cached); return channels; }
    return [];
  }

  async function fetchVideos(channelId, pageToken = null) {
    if (isLoading) return null;
    isLoading = true;
    try {
      let url = `${API_BASE}?action=videos&channelId=${encodeURIComponent(channelId)}&maxResults=12`;
      if (pageToken) url += `&pageToken=${encodeURIComponent(pageToken)}`;
      const res = await fetch(url);
      const data = await res.json();
      isLoading = false;
      return data;
    } catch (e) {
      isLoading = false;
      return { status: 'error', message: 'Gagal memuat video. Cek koneksi internet.' };
    }
  }

  async function searchVideos(query, channelId = '') {
    try {
      let url = `${API_BASE}?action=search&q=${encodeURIComponent(query)}&maxResults=10`;
      if (channelId) url += `&channelId=${encodeURIComponent(channelId)}`;
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      return { status: 'error', message: 'Gagal mencari video.' };
    }
  }

  // ---- Render ----
  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderVideoCard(video, container) {
    const fav = isFavorite(video.videoId);
    const card = document.createElement('div');
    card.className = 'kajian-video-card';
    card.innerHTML = `
      <div class="kajian-thumb-wrap">
        <img class="kajian-thumb" src="${video.thumbnail}" alt="${video.judul}" loading="lazy" onerror="this.src='assets/icons/icon-192.png'">
        <div class="kajian-play-overlay">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </div>
      </div>
      <div class="kajian-card-body">
        <div class="kajian-card-title">${video.judul}</div>
        <div class="kajian-card-meta">
          <span class="kajian-channel-name">${video.channelTitle}</span>
          <span class="kajian-date">${formatDate(video.tanggalPublikasi)}</span>
        </div>
        <div class="kajian-card-actions">
          <button class="kajian-fav-btn ${fav ? 'active' : ''}" data-videoid="${video.videoId}" title="${fav ? 'Hapus favorit' : 'Simpan favorit'}">
            ${fav ? '❤️' : '🤍'}
          </button>
          <button class="kajian-share-btn" data-url="${video.url}" title="Bagikan">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </button>
          <a class="kajian-yt-btn" href="${video.url}" target="_blank" rel="noopener noreferrer" title="Buka di YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.37.44A3.02 3.02 0 00.5 6.19C.06 8.07 0 12 0 12s.06 3.93.5 5.81a3.02 3.02 0 002.13 2.13C4.5 20.4 12 20.4 12 20.4s7.5 0 9.37-.46a3.02 3.02 0 002.13-2.13C23.94 15.93 24 12 24 12s-.06-3.93-.5-5.81zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"></path></svg>
            YouTube
          </a>
        </div>
      </div>
    `;

    // Click anywhere on card (except actions) to play
    card.addEventListener('click', (e) => {
      if (e.target.closest('.kajian-card-actions')) return;
      openVideoPlayer(video);
    });

    // Favorite
    card.querySelector('.kajian-fav-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const vid = e.currentTarget.dataset.videoid;
      if (isFavorite(vid)) {
        removeFavorite(vid);
        e.currentTarget.textContent = '🤍';
        e.currentTarget.classList.remove('active');
      } else {
        saveFavorite(vid);
        e.currentTarget.textContent = '❤️';
        e.currentTarget.classList.add('active');
      }
    });

    // Share
    card.querySelector('.kajian-share-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (navigator.share) {
        navigator.share({ title: video.judul, url: video.url });
      } else {
        navigator.clipboard.writeText(video.url).then(() => {
          if (window.showAppToast) window.showAppToast('Link dikopi ke clipboard ✓');
        });
      }
    });

    container.appendChild(card);
  }

  function openVideoPlayer(video) {
    addHistory(video);
    const modal = document.getElementById('kajianVideoModal');
    if (!modal) return;

    const iframe = modal.querySelector('#kajianIframe');
    const title = modal.querySelector('#kajianModalTitle');
    const channel = modal.querySelector('#kajianModalChannel');
    const ytLink = modal.querySelector('#kajianModalYtLink');
    const fallbackLink = modal.querySelector('#kajianModalYtLinkFallback');

    if (title) title.textContent = video.judul;
    if (channel) channel.textContent = video.channelTitle;
    if (ytLink) ytLink.href = video.url;
    if (fallbackLink) fallbackLink.href = video.url;

    // Check embed availability - YouTube policy: some videos may not be embeddable
    if (iframe) iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoPlayer() {
    const modal = document.getElementById('kajianVideoModal');
    if (!modal) return;
    modal.classList.remove('show');
    const iframe = modal.querySelector('#kajianIframe');
    iframe.src = ''; // Stop video
    document.body.style.overflow = '';
  }

  // ---- Main Render Functions ----
  async function renderChannelList(container) {
    container.innerHTML = '<div class="kajian-loading"><div class="kajian-spinner"></div><p>Memuat daftar ustaz...</p></div>';
    
    const available = await checkApiAvailability();
    if (!available) {
      container.innerHTML = `
        <div class="kajian-api-notice">
          <div class="kajian-notice-icon">📡</div>
          <h3>Fitur Kajian Belum Aktif</h3>
          <p>Fitur Kajian Ustaz memerlukan konfigurasi YouTube API key oleh admin.</p>
          <div class="kajian-notice-steps">
            <p><strong>Cara mengaktifkan:</strong></p>
            <ol>
              <li>Dapatkan YouTube Data API v3 key dari <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a></li>
              <li>Buat file <code>api/config.php</code> dengan isi:<br><code>&lt;?php define('YOUTUBE_API_KEY', 'kunci_api_anda'); ?&gt;</code></li>
              <li>Refresh halaman ini</li>
            </ol>
          </div>
        </div>
      `;
      return;
    }

    channels = await fetchChannels();
    container.innerHTML = '';

    if (channels.length === 0) {
      container.innerHTML = '<div class="kajian-empty"><p>Belum ada kanal ustaz yang ditambahkan.</p></div>';
      return;
    }

    channels.forEach(ch => {
      const card = document.createElement('div');
      card.className = `kajian-channel-card ${ch.status === 'belum-diverifikasi' ? 'unverified' : ''}`;
      card.innerHTML = `
        <div class="kajian-channel-avatar">🎙️</div>
        <div class="kajian-channel-info">
          <div class="kajian-channel-title">${ch.nama}</div>
          <div class="kajian-channel-status ${ch.status === 'belum-diverifikasi' ? 'status-unverified' : 'status-ok'}">
            ${ch.status === 'belum-diverifikasi' ? '⚠️ Channel ID belum diverifikasi' : '✅ Aktif'}
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
      `;

      if (ch.channelId && ch.status !== 'belum-diverifikasi') {
        card.addEventListener('click', () => {
          currentChannelId = ch.channelId;
          renderVideosView(ch);
        });
      } else {
        card.querySelector('.kajian-channel-status').textContent = '⚠️ Admin perlu mengisi Channel ID yang terverifikasi';
      }

      container.appendChild(card);
    });
  }

  async function renderVideosView(channel) {
    const view = document.getElementById('viewKajianVideos');
    const list = document.getElementById('kajianVideoList');
    const headerTitle = document.getElementById('kajianVideosTitle');
    
    if (!view || !list) return;
    view.classList.add('active');
    view.scrollTop = 0;
    headerTitle.textContent = channel.nama;
    list.innerHTML = '<div class="kajian-loading"><div class="kajian-spinner"></div><p>Memuat video...</p></div>';
    nextPageToken = null;

    const result = await fetchVideos(channel.channelId);
    list.innerHTML = '';

    if (!result || result.status === 'error') {
      list.innerHTML = `<div class="kajian-error"><p>⚠️ ${result?.message || 'Gagal memuat video.'}</p></div>`;
      return;
    }

    currentVideos = result.videos || [];
    nextPageToken = result.nextPageToken;

    if (currentVideos.length === 0) {
      list.innerHTML = '<div class="kajian-empty"><p>Belum ada video tersedia.</p></div>';
      return;
    }

    currentVideos.forEach(v => renderVideoCard(v, list));

    // Load more button
    if (nextPageToken) {
      const loadMoreBtn = document.createElement('button');
      loadMoreBtn.className = 'kajian-load-more-btn';
      loadMoreBtn.textContent = 'Muat Lebih Banyak';
      loadMoreBtn.addEventListener('click', async () => {
        loadMoreBtn.textContent = 'Memuat...';
        loadMoreBtn.disabled = true;
        const more = await fetchVideos(channel.channelId, nextPageToken);
        if (more?.status === 'ok') {
          nextPageToken = more.nextPageToken;
          (more.videos || []).forEach(v => renderVideoCard(v, list));
          if (!nextPageToken) loadMoreBtn.remove();
          else { loadMoreBtn.textContent = 'Muat Lebih Banyak'; loadMoreBtn.disabled = false; }
        }
      });
      list.appendChild(loadMoreBtn);
    }
  }

  // ---- Public API ----
  function init() {
    // Close video modal
    const closeBtn = document.getElementById('kajianModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeVideoPlayer);
    
    // Backdrop close
    const modal = document.getElementById('kajianVideoModal');
    if (modal) modal.addEventListener('click', (e) => {
      if (e.target === modal) closeVideoPlayer();
    });

    // Back button from videos view
    const backBtn = document.getElementById('kajianVideosBackBtn');
    if (backBtn) backBtn.addEventListener('click', () => {
      const view = document.getElementById('viewKajianVideos');
      if (view) view.classList.remove('active');
    });

    // Search in Kajian
    const searchInput = document.getElementById('kajianSearchInput');
    const searchResults = document.getElementById('kajianSearchResults');
    if (searchInput) {
      let searchTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        const q = searchInput.value.trim();
        if (q.length < 3) { searchResults.innerHTML = ''; return; }
        searchTimer = setTimeout(async () => {
          searchResults.innerHTML = '<div class="kajian-loading"><div class="kajian-spinner"></div></div>';
          const res = await searchVideos(q, currentChannelId || '');
          searchResults.innerHTML = '';
          if (res.status === 'error') {
            searchResults.innerHTML = `<p class="kajian-error-text">${res.message}</p>`;
            return;
          }
          if (res.videos.length === 0) {
            searchResults.innerHTML = '<p class="kajian-empty-text">Tidak ada hasil ditemukan.</p>';
            return;
          }
          res.videos.forEach(v => renderVideoCard(v, searchResults));
        }, 600);
      });
    }

    // Expose renderChannelList for external call
    window.KajianManager.loadChannels = async () => {
      const container = document.getElementById('kajianChannelList');
      if (container) await renderChannelList(container);
    };
  }

  return { init, openVideoPlayer, closeVideoPlayer, getFavorites, getHistory };
})();
