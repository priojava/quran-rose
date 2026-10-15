<?php
// ========================================================
// YouTube Data API v3 Proxy - Quran Rose
// Menyimpan API key di server, tidak terekspos ke client
// ========================================================
// SETUP:
// 1. Copy file ini ke: E:\Xampp8.2\htdocs\Alquran\api\youtube.php
// 2. Buat file: E:\Xampp8.2\htdocs\Alquran\api\config.php
//    dengan isi: define('YOUTUBE_API_KEY', 'YOUR_KEY_HERE');
// 3. Dapatkan YouTube Data API v3 key dari: console.cloud.google.com
// ========================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: public, max-age=3600'); // Cache 1 jam

// Load API key dari config terpisah (jangan commit config.php ke git)
$configFile = __DIR__ . '/config.php';
if (file_exists($configFile)) {
require_once $configFile;
} else {
// Fallback: environment variable
define('YOUTUBE_API_KEY', getenv('YOUTUBE_API_KEY') ?: '');
}

if (!defined('YOUTUBE_API_KEY') || empty(YOUTUBE_API_KEY)) {
http_response_code(503);
echo json_encode([
'status' => 'error',
'code' => 'API_NOT_CONFIGURED',
'message' => 'YouTube API key belum dikonfigurasi. Hubungi admin untuk mengaktifkan fitur Kajian.'
]);
exit;
}

$YOUTUBE_API_KEY = YOUTUBE_API_KEY;
$YOUTUBE_BASE = 'https://www.googleapis.com/youtube/v3';

// Cache directory
$cacheDir = __DIR__ . '/cache/';
if (!is_dir($cacheDir)) {
mkdir($cacheDir, 0755, true);
}

function safeJsonEncode($data) {
  return json_encode($data, JSON_INVALID_UTF8_SUBSTITUTE | JSON_UNESCAPED_UNICODE);
}

function safeTruncate($text, $length = 300) {
  if (empty($text)) return '';
  if (function_exists('mb_substr')) {
    return mb_substr($text, 0, $length, 'UTF-8');
  }
  return substr($text, 0, $length);
}

function getCache($key) {
  global $cacheDir;
  $file = $cacheDir . md5($key) . '.json';
  if (file_exists($file) && (time() - filemtime($file)) < 3600) { 
    return json_decode(file_get_contents($file), true); 
  }
  return null; 
} 

function setCache($key, $data) { 
  global $cacheDir; 
  $file = $cacheDir . md5($key) . '.json';
  file_put_contents($file, safeJsonEncode($data)); 
} 

function youtubeRequest($endpoint, $params) { 
  global $YOUTUBE_API_KEY, $YOUTUBE_BASE; 
  $params['key'] = $YOUTUBE_API_KEY; 
  $url = $YOUTUBE_BASE . $endpoint . '?' . http_build_query($params);
  $cacheKey = $url; 
  $cached = getCache($cacheKey); 
  if ($cached !== null) { 
    return ['data' => $cached, 'fromCache' => true];
  }

  $ctx = stream_context_create([
  'http' => [
  'timeout' => 10,
  'header' => 'User-Agent: QuranRose/2.0'
  ]
  ]);

  $response = @file_get_contents($url, false, $ctx);
  if ($response === false) {
  return ['error' => 'Gagal menghubungi YouTube API. Cek koneksi internet server.'];
  }

  $data = json_decode($response, true);

  if (isset($data['error'])) {
  $errCode = $data['error']['errors'][0]['reason'] ?? 'unknown';
  if ($errCode === 'quotaExceeded') {
  return ['error' => 'Kuota YouTube API habis untuk hari ini. Coba lagi besok.', 'code' => 'QUOTA_EXCEEDED'];
  }
  return ['error' => $data['error']['message'], 'code' => $errCode];
  }

  setCache($cacheKey, $data);
  return ['data' => $data, 'fromCache' => false];
  }

  $action = $_GET['action'] ?? '';

  // ========== ACTION: channels ==========
  // GET /api/youtube.php?action=channels
  // Mengembalikan daftar kanal ustaz yang dikelola admin
  if ($action === 'channels') {
  $channelsFile = __DIR__ . '/channels.json';
  if (!file_exists($channelsFile)) {
  // Data kanal default (admin harus memverifikasi Channel ID yang benar)
  $defaultChannels = [
  [
  'id' => 'CH_PLACEHOLDER_UAH',
  'nama' => 'Ustaz Adi Hidayat',
  'channelId' => '', // Admin harus mengisi Channel ID yang terverifikasi
  'status' => 'belum-diverifikasi',
  'catatan' => 'Masukkan Channel ID yang benar dari halaman YouTube resmi ustaz.'
  ],
  [
  'id' => 'CH_PLACEHOLDER_UAS',
  'nama' => 'Ustaz Abdul Somad',
  'channelId' => '',
  'status' => 'belum-diverifikasi',
  'catatan' => 'Masukkan Channel ID yang benar dari halaman YouTube resmi ustaz.'
  ],
  [
  'id' => 'CH_PLACEHOLDER_UHA',
  'nama' => 'Ustaz Hanan Attaki',
  'channelId' => '',
  'status' => 'belum-diverifikasi',
  'catatan' => 'Masukkan Channel ID yang benar dari halaman YouTube resmi ustaz.'
  ],
  [
  'id' => 'CH_PLACEHOLDER_UKB',
  'nama' => 'Ustaz Khalid Basalamah',
  'channelId' => '',
  'status' => 'belum-diverifikasi',
  'catatan' => 'Masukkan Channel ID yang benar dari halaman YouTube resmi ustaz.'
  ]
  ];
  file_put_contents($channelsFile, json_encode($defaultChannels, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  echo json_encode(['status' => 'ok', 'channels' => $defaultChannels]);
  } else {
  $channels = json_decode(file_get_contents($channelsFile), true);
  echo json_encode(['status' => 'ok', 'channels' => $channels]);
  }
  exit;
  }

  // ========== ACTION: videos ==========
  // GET /api/youtube.php?action=videos&channelId=UCxxxxxx&maxResults=10&pageToken=xxx
  if ($action === 'videos') {
  $channelId = trim($_GET['channelId'] ?? '');
  $maxResults = min(50, max(1, intval($_GET['maxResults'] ?? 12)));
  $pageToken = $_GET['pageToken'] ?? '';

  if (empty($channelId)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'channelId diperlukan']);
  exit;
  }

  // Cari uploads playlist ID dari channel
  $channelResult = youtubeRequest('/channels', [
  'part' => 'contentDetails,snippet',
  'id' => $channelId,
  'maxResults' => 1
  ]);

  if (isset($channelResult['error'])) {
  echo json_encode(['status' => 'error', 'message' => $channelResult['error'], 'code' => $channelResult['code'] ??
  'API_ERROR']);
  exit;
  }

  $channelData = $channelResult['data'];
  if (empty($channelData['items'])) {
  echo json_encode(['status' => 'error', 'message' => 'Channel tidak ditemukan. Pastikan Channel ID benar.', 'code' =>
  'CHANNEL_NOT_FOUND']);
  exit;
  }

  $uploadsPlaylistId = $channelData['items'][0]['contentDetails']['relatedPlaylists']['uploads'] ?? '';
  $channelTitle = $channelData['items'][0]['snippet']['title'] ?? '';

  if (empty($uploadsPlaylistId)) {
  echo json_encode(['status' => 'error', 'message' => 'Playlist upload channel tidak ditemukan.']);
  exit;
  }

  // Ambil video dari playlist uploads
  $playlistParams = [
  'part' => 'snippet,contentDetails',
  'playlistId' => $uploadsPlaylistId,
  'maxResults' => $maxResults
  ];
  if (!empty($pageToken)) $playlistParams['pageToken'] = $pageToken;

  $videosResult = youtubeRequest('/playlistItems', $playlistParams);
  if (isset($videosResult['error'])) {
  echo json_encode(['status' => 'error', 'message' => $videosResult['error']]);
  exit;
  }

  $videosData = $videosResult['data'];
  $videos = [];

  foreach ($videosData['items'] as $item) {
  $snippet = $item['snippet'];
  $videoId = $snippet['resourceId']['videoId'] ?? '';
  if (empty($videoId)) continue;

  $videos[] = [
  'videoId' => $videoId,
  'judul' => $snippet['title'],
  'deskripsi' => safeTruncate($snippet['description'] ?? '', 300),
  'thumbnail' => $snippet['thumbnails']['high']['url'] ?? $snippet['thumbnails']['default']['url'] ?? '',
  'channelTitle' => $snippet['channelTitle'] ?? $channelTitle,
  'tanggalPublikasi' => $snippet['publishedAt'] ?? '',
  'url' => 'https://www.youtube.com/watch?v=' . $videoId
  ];
  }

  echo safeJsonEncode([
  'status' => 'ok',
  'channelTitle' => $channelTitle,
  'videos' => $videos,
  'nextPageToken' => $videosData['nextPageToken'] ?? null,
  'totalResults' => $videosData['pageInfo']['totalResults'] ?? count($videos),
  'fromCache' => $videosResult['fromCache'],
  'sinkronisasiTerakhir' => date('Y-m-d H:i:s')
  ]);
  exit;
  }

  // ========== ACTION: search ==========
  // GET /api/youtube.php?action=search&q=tafsir&channelId=UCxxx&maxResults=10
  if ($action === 'search') {
  $query = trim($_GET['q'] ?? '');
  $channelId = trim($_GET['channelId'] ?? '');
  $maxResults = min(25, max(1, intval($_GET['maxResults'] ?? 10)));

  if (empty($query)) {
  echo safeJsonEncode(['status' => 'error', 'message' => 'Parameter q (query) diperlukan']);
  exit;
  }

  $searchParams = [
  'part' => 'snippet',
  'q' => $query,
  'type' => 'video',
  'maxResults' => $maxResults,
  'order' => 'relevance',
  'relevanceLanguage' => 'id'
  ];
  if (!empty($channelId)) $searchParams['channelId'] = $channelId;

  $result = youtubeRequest('/search', $searchParams);
  if (isset($result['error'])) {
  echo safeJsonEncode(['status' => 'error', 'message' => $result['error'], 'code' => $result['code'] ?? 'API_ERROR']);
  exit;
  }

  $videos = [];
  foreach ($result['data']['items'] as $item) {
  $videos[] = [
  'videoId' => $item['id']['videoId'],
  'judul' => $item['snippet']['title'],
  'deskripsi' => safeTruncate($item['snippet']['description'] ?? '', 200),
  'thumbnail' => $item['snippet']['thumbnails']['high']['url'] ?? '',
  'channelTitle' => $item['snippet']['channelTitle'],
  'tanggalPublikasi' => $item['snippet']['publishedAt'],
  'url' => 'https://www.youtube.com/watch?v=' . $item['id']['videoId']
  ];
  }

  echo safeJsonEncode([
  'status' => 'ok',
  'query' => $query,
  'videos' => $videos,
  'total' => count($videos)
  ]);
  exit;
  }

  // ========== ACTION: admin-update-channel ==========
  // POST hanya dari lokal/admin, update daftar kanal
  if ($action === 'admin-update-channel' && $_SERVER['REQUEST_METHOD'] === 'POST') {
  // Sederhana: hanya izinkan dari localhost
  $allowedIps = ['127.0.0.1', '::1', 'localhost'];
  if (!in_array($_SERVER['REMOTE_ADDR'], $allowedIps)) {
  http_response_code(403);
  echo json_encode(['status' => 'error', 'message' => 'Akses ditolak. Operasi admin hanya dari lokal.']);
  exit;
  }

  $body = json_decode(file_get_contents('php://input'), true);
  if (!$body || !isset($body['channels'])) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Data channels diperlukan']);
  exit;
  }

  $channelsFile = __DIR__ . '/channels.json';
  file_put_contents($channelsFile, json_encode($body['channels'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  echo json_encode(['status' => 'ok', 'message' => 'Daftar kanal berhasil diperbarui']);
  exit;
  }

  // Default: action tidak dikenali
  http_response_code(400);
  echo json_encode([
  'status' => 'error',
  'message' => 'Action tidak valid. Gunakan: channels, videos, search',
  'availableActions' => ['channels', 'videos', 'search']
  ]);