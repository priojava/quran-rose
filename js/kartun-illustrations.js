// ========================================================
// Quran Rose - Ilustrasi Kartun Tata Cara Wudhu & Sholat
// Format: Vector SVG murni (ringan, tajam di semua layar, 100% offline)
// Karakter: Anak Muslim yang ceria & santun (peci hijau, baju koko, sajadah & kran air)
// ========================================================

window.KartunIllustrations = (function() {
  
  // Ilustrasi Kartun Wudhu (1 - 11)
  const WUDHU_ILLUSTRATIONS = {
    // 1 & 2: Niat & Cuci Tangan
    1: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
        <radialGradient id="wBg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fdf2f8"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg1)"/>
      <!-- Pipa & Kran Air -->
      <rect x="25" y="110" width="22" height="70" rx="3" fill="#94a3b8"/>
      <path d="M35 115 L65 115 L65 125 L55 125 L55 132 L40 132 L40 125 L35 125 Z" fill="#64748b"/>
      <circle cx="50" cy="112" r="7" fill="#e2e8f0"/>
      <!-- Aliran Air -->
      <path d="M47 132 Q46 150 44 180 L52 180 Q51 150 49 132 Z" fill="url(#wWater)" opacity="0.85"/>
      <circle cx="36" cy="148" r="3.5" fill="#38bdf8"/>
      <circle cx="58" cy="155" r="2.5" fill="#38bdf8"/>
      <circle cx="39" cy="165" r="2" fill="#38bdf8"/>
      <!-- Anak Berdiri Cuci Tangan -->
      <!-- Badan & Baju Hijau -->
      <path d="M90 180 L88 120 Q88 105 110 105 Q132 105 132 120 L130 180 Z" fill="#10b981"/>
      <path d="M102 105 L118 105 L110 118 Z" fill="#fff"/>
      <!-- Tangan Mengarah ke Kran -->
      <path d="M92 115 Q75 125 55 142" stroke="#10b981" stroke-width="14" stroke-linecap="round" fill="none"/>
      <circle cx="50" cy="144" r="8" fill="#fed7aa"/>
      <circle cx="54" cy="148" r="7" fill="#fed7aa"/>
      <!-- Kepala & Wajah -->
      <circle cx="110" cy="72" r="26" fill="#fed7aa"/>
      <!-- Peci Hijau -->
      <path d="M84 68 Q110 40 136 68 Q136 50 110 44 Q84 50 84 68 Z" fill="#047857"/>
      <path d="M84 68 Q110 64 136 68 L136 71 Q110 67 84 71 Z" fill="#065f46"/>
      <!-- Rambut -->
      <path d="M85 70 Q92 76 96 70" stroke="#1e293b" stroke-width="3" fill="none"/>
      <path d="M124 70 Q128 76 135 70" stroke="#1e293b" stroke-width="3" fill="none"/>
      <!-- Mata Tersenyum Khusyuk -->
      <path d="M97 73 Q102 78 107 73" stroke="#475569" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M113 73 Q118 78 123 73" stroke="#475569" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Hidung & Senyum -->
      <circle cx="110" cy="80" r="2" fill="#fb923c"/>
      <path d="M106 86 Q110 90 114 86" stroke="#e11d48" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Pipi Merona -->
      <circle cx="94" cy="81" r="4.5" fill="#f472b6" opacity="0.4"/>
      <circle cx="126" cy="81" r="4.5" fill="#f472b6" opacity="0.4"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">Basuh Telapak Tangan</text>
    </svg>`,

    2: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg2)"/>
      <!-- Bismillah & Bersuci -->
      <rect x="25" y="110" width="22" height="70" rx="3" fill="#94a3b8"/>
      <path d="M35 115 L65 115 L65 125 L55 125 L55 132 L40 132 L40 125 L35 125 Z" fill="#64748b"/>
      <circle cx="50" cy="112" r="7" fill="#e2e8f0"/>
      <path d="M47 132 Q46 150 44 180 L52 180 Q51 150 49 132 Z" fill="#0284c7" opacity="0.85"/>
      <!-- Anak cuci sela jari -->
      <path d="M90 180 L88 120 Q88 105 110 105 Q132 105 132 120 L130 180 Z" fill="#10b981"/>
      <circle cx="110" cy="72" r="26" fill="#fed7aa"/>
      <path d="M84 68 Q110 40 136 68 Q136 50 110 44 Q84 50 84 68 Z" fill="#047857"/>
      <path d="M97 73 Q102 78 107 73" stroke="#475569" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M113 73 Q118 78 123 73" stroke="#475569" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="110" cy="80" r="2" fill="#fb923c"/>
      <path d="M106 86 Q110 90 114 86" stroke="#e11d48" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Gerakan sela jemari -->
      <path d="M95 115 Q70 125 55 140" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="54" cy="140" r="9" fill="#fed7aa"/>
      <circle cx="62" cy="144" r="8" fill="#fed7aa"/>
      <circle cx="48" cy="148" r="3" fill="#38bdf8"/>
      <circle cx="68" cy="138" r="3" fill="#38bdf8"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Basmalah & Cuci Jemari 3x</text>
    </svg>`,

    3: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f0fdf4"/>
          <stop offset="100%" stop-color="#dcfce7"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg3)"/>
      <rect x="25" y="110" width="22" height="70" rx="3" fill="#94a3b8"/>
      <path d="M35 115 L65 115 L65 125 L55 125 L55 132 L40 132 L40 125 L35 125 Z" fill="#64748b"/>
      <circle cx="50" cy="112" r="7" fill="#e2e8f0"/>
      <path d="M47 132 L49 180" stroke="#38bdf8" stroke-width="6"/>
      <!-- Anak Berkumur -->
      <path d="M90 180 L88 120 Q88 105 110 105 Q132 105 132 120 L130 180 Z" fill="#10b981"/>
      <circle cx="110" cy="72" r="26" fill="#fed7aa"/>
      <path d="M84 68 Q110 40 136 68 Q136 50 110 44 Q84 50 84 68 Z" fill="#047857"/>
      <!-- Pipi Menggembung Berkumur -->
      <path d="M97 73 Q102 77 107 73" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M113 73 Q118 77 123 73" stroke="#475569" stroke-width="2.5" fill="none"/>
      <!-- Mulut Bulat Berkumur -->
      <circle cx="110" cy="86" r="6" fill="#0284c7" opacity="0.3"/>
      <circle cx="110" cy="86" r="5" fill="#f43f5e" opacity="0.7"/>
      <!-- Tangan Mengantar Air ke Mulut -->
      <path d="M125 120 Q128 100 118 89" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="116" cy="88" r="8" fill="#fed7aa"/>
      <path d="M114 83 Q110 80 116 80" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
      <circle cx="124" cy="84" r="2.5" fill="#38bdf8"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Berkumur (Madhmadhah) 3x</text>
    </svg>`,

    4: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fdf4ff"/>
          <stop offset="100%" stop-color="#fae8ff"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg4)"/>
      <rect x="25" y="110" width="22" height="70" rx="3" fill="#94a3b8"/>
      <path d="M35 115 L65 115 L65 125 L55 125 L55 132 L40 132 L40 125 L35 125 Z" fill="#64748b"/>
      <circle cx="50" cy="112" r="7" fill="#e2e8f0"/>
      <!-- Anak Istinsyaq (Hidung) -->
      <path d="M90 180 L88 120 Q88 105 110 105 Q132 105 132 120 L130 180 Z" fill="#10b981"/>
      <circle cx="110" cy="72" r="26" fill="#fed7aa"/>
      <path d="M84 68 Q110 40 136 68 Q136 50 110 44 Q84 50 84 68 Z" fill="#047857"/>
      <path d="M97 71 Q102 75 107 71" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M113 71 Q118 75 123 71" stroke="#475569" stroke-width="2.5" fill="none"/>
      <!-- Tangan Menghirup Air ke Hidung -->
      <path d="M125 120 Q128 95 114 80" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="112" cy="79" r="8" fill="#fed7aa"/>
      <!-- Tetesan air di hidung -->
      <circle cx="109" cy="76" r="3" fill="#38bdf8"/>
      <circle cx="116" cy="74" r="2.5" fill="#38bdf8"/>
      <circle cx="104" cy="78" r="2" fill="#38bdf8"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#701a75" text-anchor="middle">Istinsyaq (Bersihkan Hidung) 3x</text>
    </svg>`,

    5: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="100%" stop-color="#ffe4e6"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg5)"/>
      <!-- Basuh Wajah Rukun -->
      <path d="M85 180 L84 120 Q84 105 110 105 Q136 105 136 120 L135 180 Z" fill="#10b981"/>
      <circle cx="110" cy="72" r="28" fill="#fed7aa"/>
      <path d="M82 66 Q110 38 138 66 Q138 48 110 42 Q82 48 82 66 Z" fill="#047857"/>
      <!-- Dua Tangan Membasuh Wajah -->
      <path d="M85 125 Q82 92 94 74" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="94" cy="73" r="8" fill="#fed7aa"/>
      <path d="M135 125 Q138 92 126 74" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="126" cy="73" r="8" fill="#fed7aa"/>
      <!-- Cipratan Air Wajah Segar -->
      <path d="M96 68 Q110 60 124 68" stroke="#38bdf8" stroke-width="4" fill="none" opacity="0.8"/>
      <circle cx="104" cy="70" r="3" fill="#38bdf8"/>
      <circle cx="116" cy="70" r="3" fill="#38bdf8"/>
      <circle cx="110" cy="78" r="2.5" fill="#38bdf8"/>
      <path d="M106 86 Q110 89 114 86" stroke="#e11d48" stroke-width="2" fill="none"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">Membasuh Wajah (Rukun) 3x</text>
    </svg>`,

    6: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ecfdf5"/>
          <stop offset="100%" stop-color="#d1fae5"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg6)"/>
      <rect x="25" y="110" width="22" height="70" rx="3" fill="#94a3b8"/>
      <path d="M35 115 L65 115 L65 125 L55 125 L55 132 L40 132 L40 125 L35 125 Z" fill="#64748b"/>
      <circle cx="50" cy="112" r="7" fill="#e2e8f0"/>
      <!-- Membasuh Lengan sampai Siku -->
      <path d="M100 180 L98 120 Q98 105 120 105 Q142 105 142 120 L140 180 Z" fill="#10b981"/>
      <circle cx="120" cy="72" r="26" fill="#fed7aa"/>
      <path d="M94 68 Q120 40 146 68 Q146 50 120 44 Q94 50 94 68 Z" fill="#047857"/>
      <!-- Lengan kanan disiram dari jari ke siku -->
      <path d="M110 115 L70 125 L50 135" stroke="#fed7aa" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M112 115 L88 121" stroke="#047857" stroke-width="14" stroke-linecap="round" fill="none"/>
      <!-- Aliran air mengalir ke siku -->
      <path d="M48 132 Q65 130 90 126" stroke="#0284c7" stroke-width="5" stroke-dasharray="4 2" fill="none"/>
      <circle cx="52" cy="138" r="3.5" fill="#38bdf8"/>
      <circle cx="75" cy="133" r="3" fill="#38bdf8"/>
      <circle cx="95" cy="128" r="3.5" fill="#38bdf8"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#065f46" text-anchor="middle">Basuh Tangan hingga Siku (Rukun)</text>
    </svg>`,

    7: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fefce8"/>
          <stop offset="100%" stop-color="#fef08a"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg7)"/>
      <!-- Mengusap Kepala -->
      <path d="M85 180 L84 120 Q84 105 110 105 Q136 105 136 120 L135 180 Z" fill="#10b981"/>
      <circle cx="110" cy="74" r="28" fill="#fed7aa"/>
      <path d="M82 66 Q110 38 138 66 Q138 48 110 42 Q82 48 82 66 Z" fill="#047857"/>
      <!-- Kedua tangan basah mengusap kepala dari dahi ke belakang -->
      <path d="M80 120 Q72 75 92 50" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="92" cy="50" r="8" fill="#fed7aa"/>
      <path d="M140 120 Q148 75 128 50" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="128" cy="50" r="8" fill="#fed7aa"/>
      <!-- Tetesan air berkilau di kepala -->
      <circle cx="110" cy="46" r="3" fill="#38bdf8"/>
      <circle cx="100" cy="48" r="2.5" fill="#38bdf8"/>
      <circle cx="120" cy="48" r="2.5" fill="#38bdf8"/>
      <path d="M98 76 Q103 80 108 76" stroke="#475569" stroke-width="2" fill="none"/>
      <path d="M112 76 Q117 80 122 76" stroke="#475569" stroke-width="2" fill="none"/>
      <path d="M106 88 Q110 92 114 88" stroke="#e11d48" stroke-width="2" fill="none"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#854d0e" text-anchor="middle">Mengusap Kepala (Rukun)</text>
    </svg>`,

    8: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg8" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#bfdbfe"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg8)"/>
      <!-- Mengusap Telinga -->
      <path d="M85 180 L84 120 Q84 105 110 105 Q136 105 136 120 L135 180 Z" fill="#10b981"/>
      <circle cx="110" cy="74" r="28" fill="#fed7aa"/>
      <path d="M82 66 Q110 38 138 66 Q138 48 110 42 Q82 48 82 66 Z" fill="#047857"/>
      <!-- Telinga Kanan & Kiri -->
      <circle cx="82" cy="74" r="7" fill="#fed7aa"/>
      <circle cx="138" cy="74" r="7" fill="#fed7aa"/>
      <!-- Jari telunjuk & jempol mengusap telinga -->
      <path d="M78 120 Q70 90 82 75" stroke="#10b981" stroke-width="11" stroke-linecap="round" fill="none"/>
      <circle cx="81" cy="73" r="6" fill="#fed7aa"/>
      <path d="M142 120 Q150 90 138 75" stroke="#10b981" stroke-width="11" stroke-linecap="round" fill="none"/>
      <circle cx="139" cy="73" r="6" fill="#fed7aa"/>
      <circle cx="80" cy="70" r="2.5" fill="#38bdf8"/>
      <circle cx="140" cy="70" r="2.5" fill="#38bdf8"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Mengusap Kedua Telinga</text>
    </svg>`,

    9: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg9" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f0fdfa"/>
          <stop offset="100%" stop-color="#ccfbf1"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg9)"/>
      <rect x="25" y="80" width="22" height="100" rx="3" fill="#94a3b8"/>
      <path d="M35 85 L65 85 L65 95 L55 95 L55 102 L40 102 L40 95 L35 95 Z" fill="#64748b"/>
      <circle cx="50" cy="82" r="7" fill="#e2e8f0"/>
      <path d="M47 102 L45 165" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>
      <!-- Kaki Kanan Dibasuh hingga Mata Kaki -->
      <!-- Anak membungkuk santun membasuh kaki -->
      <circle cx="130" cy="45" r="22" fill="#fed7aa"/>
      <path d="M108 40 Q130 18 152 40 Z" fill="#047857"/>
      <path d="M115 65 Q110 85 105 110" stroke="#10b981" stroke-width="26" stroke-linecap="round" fill="none"/>
      <!-- Tangan membersihkan sela jari kaki -->
      <path d="M110 80 Q85 115 65 145" stroke="#10b981" stroke-width="10" stroke-linecap="round" fill="none"/>
      <!-- Kaki di bawah air -->
      <path d="M85 130 L65 150 L38 152 Q35 160 48 160 L75 160 Q85 160 92 145 Z" fill="#fed7aa"/>
      <!-- Cipratan air di mata kaki -->
      <circle cx="58" cy="144" r="4.5" fill="#38bdf8"/>
      <circle cx="42" cy="148" r="3.5" fill="#38bdf8"/>
      <circle cx="68" cy="155" r="3" fill="#38bdf8"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f766e" text-anchor="middle">Basuh Kaki hingga Mata Kaki (Rukun)</text>
    </svg>`,

    10: `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wBg10" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#wBg10)"/>
      <!-- Berdoa Setelah Wudhu (Menghadap Kiblat) -->
      <path d="M85 180 L84 115 Q84 98 110 98 Q136 98 136 115 L135 180 Z" fill="#10b981"/>
      <circle cx="110" cy="62" r="26" fill="#fed7aa"/>
      <path d="M84 56 Q110 28 136 56 Q136 40 110 34 Q84 40 84 56 Z" fill="#047857"/>
      <!-- Kedua Tangan Diangkat Berdoa -->
      <path d="M90 115 Q95 95 102 82" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="103" cy="80" r="7" fill="#fed7aa"/>
      <path d="M130 115 Q125 95 118 82" stroke="#10b981" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="117" cy="80" r="7" fill="#fed7aa"/>
      <!-- Wajah Berseri Menghadap Langit -->
      <path d="M98 60 Q103 56 108 60" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M112 60 Q117 56 122 60" stroke="#475569" stroke-width="2.5" fill="none"/>
      <circle cx="110" cy="66" r="2" fill="#fb923c"/>
      <path d="M106 72 Q110 77 114 72" stroke="#e11d48" stroke-width="2.5" fill="none"/>
      <!-- Kilauan Cahaya Doa -->
      <circle cx="110" cy="22" r="3" fill="#fbbf24"/>
      <path d="M110 14 L110 30 M102 22 L118 22" stroke="#fbbf24" stroke-width="2"/>
      <text x="110" y="170" font-family="sans-serif" font-size="11" font-weight="bold" fill="#be123c" text-anchor="middle">Doa Setelah Wudhu (Asyhadu an laa...)</text>
    </svg>`
  };

  // Ilustrasi Kartun Sholat (Berdasarkan ID / Gerakan)
  const SALAT_ILLUSTRATIONS = {
    // 1. Niat & Berdiri Tegak
    "niat": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fdf2f8"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg1)"/>
      <!-- Sajadah Hijau Elegan -->
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <path d="M98 135 Q110 128 122 135 L120 162 L100 162 Z" fill="#047857" opacity="0.3"/>
      <!-- Anak Berdiri Tegak Khusyuk -->
      <!-- Kaki -->
      <rect x="99" y="145" width="9" height="20" rx="4" fill="#fed7aa"/>
      <rect x="112" y="145" width="9" height="20" rx="4" fill="#fed7aa"/>
      <!-- Celana Putih/Abu -->
      <rect x="96" y="125" width="13" height="24" rx="3" fill="#e2e8f0"/>
      <rect x="111" y="125" width="13" height="24" rx="3" fill="#e2e8f0"/>
      <!-- Baju Koko Putih -->
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Lengan di samping badan tenang -->
      <path d="M89 85 L84 116" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="84" cy="120" r="5" fill="#fed7aa"/>
      <path d="M131 85 L136 116" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="136" cy="120" r="5" fill="#fed7aa"/>
      <!-- Kepala & Peci -->
      <circle cx="110" cy="46" r="22" fill="#fed7aa"/>
      <path d="M88 42 Q110 18 132 42 Q132 28 110 22 Q88 28 88 42 Z" fill="#047857"/>
      <!-- Mata Tertunduk Menatap Tempat Sujud -->
      <path d="M98 48 Q103 52 108 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M112 48 Q117 52 122 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M106 58 Q110 61 114 58" stroke="#e11d48" stroke-width="2" fill="none"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Berdiri Menghadap Kiblat (Qiyam)</text>
    </svg>`,

    // 2. Takbiratul Ihram
    "takbiratul-ihram": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg2)"/>
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <!-- Kaki -->
      <rect x="99" y="145" width="9" height="20" rx="4" fill="#fed7aa"/>
      <rect x="112" y="145" width="9" height="20" rx="4" fill="#fed7aa"/>
      <!-- Baju Koko -->
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Kepala -->
      <circle cx="110" cy="48" r="22" fill="#fed7aa"/>
      <path d="M88 44 Q110 20 132 44 Q132 30 110 24 Q88 30 88 44 Z" fill="#047857"/>
      <!-- Mengangkat Kedua Tangan Setinggi Bahu/Telinga -->
      <path d="M88 85 Q75 65 78 44" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="78" cy="40" r="7" fill="#fed7aa"/>
      <path d="M132 85 Q145 65 142 44" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="142" cy="40" r="7" fill="#fed7aa"/>
      <!-- Wajah Tenang -->
      <path d="M98 48 Q103 52 108 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M112 48 Q117 52 122 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M106 58 Q110 61 114 58" stroke="#e11d48" stroke-width="2" fill="none"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0284c7" text-anchor="middle">Takbir: Allahu Akbar</text>
    </svg>`,

    // 3. Doa Iftitah & 4. Al-Fatihah (Sedekap)
    "doa-iftitah": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ecfdf5"/>
          <stop offset="100%" stop-color="#d1fae5"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg3)"/>
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <!-- Baju Koko -->
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Sedekap: Tangan Kanan Memegang Pergelangan Tangan Kiri di Dada -->
      <path d="M90 85 Q92 100 110 100 Q128 100 130 85" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none"/>
      <rect x="100" y="93" width="20" height="12" rx="5" fill="#fed7aa"/>
      <circle cx="110" cy="48" r="22" fill="#fed7aa"/>
      <path d="M88 44 Q110 20 132 44 Q132 30 110 24 Q88 30 88 44 Z" fill="#047857"/>
      <path d="M98 48 Q103 52 108 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <path d="M112 48 Q117 52 122 48" stroke="#475569" stroke-width="2.5" fill="none"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">Sedekap di Dada & Baca Iftitah</text>
    </svg>`,

    "al-fatihah": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="100%" stop-color="#fef3c7"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg4)"/>
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <path d="M90 85 Q92 100 110 100 Q128 100 130 85" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none"/>
      <rect x="100" y="93" width="20" height="12" rx="5" fill="#fed7aa"/>
      <circle cx="110" cy="48" r="22" fill="#fed7aa"/>
      <path d="M88 44 Q110 20 132 44 Q132 30 110 24 Q88 30 88 44 Z" fill="#047857"/>
      <!-- Ikon mushaf di samping -->
      <rect x="145" y="45" width="28" height="20" rx="3" fill="#10b981"/>
      <line x1="159" y1="45" x2="159" y2="65" stroke="#fff" stroke-width="1.5"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#d97706" text-anchor="middle">Membaca Al-Fatihah (Rukun)</text>
    </svg>`,

    "bacaan-surah": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fdf4ff"/>
          <stop offset="100%" stop-color="#fae8ff"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg5)"/>
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <path d="M90 85 Q92 100 110 100 Q128 100 130 85" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none"/>
      <rect x="100" y="93" width="20" height="12" rx="5" fill="#fed7aa"/>
      <circle cx="110" cy="48" r="22" fill="#fed7aa"/>
      <path d="M88 44 Q110 20 132 44 Q132 30 110 24 Q88 30 88 44 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#701a75" text-anchor="middle">Membaca Surah Pendek</text>
    </svg>`,

    // 5. Rukuk (Punggung Lurus Sejajar)
    "ruku": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f0fdf4"/>
          <stop offset="100%" stop-color="#dcfce7"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg6)"/>
      <path d="M30 172 L60 145 L170 145 L200 172 Z" fill="#047857"/>
      <!-- Kaki Tegak Lurus -->
      <rect x="145" y="105" width="14" height="50" rx="5" fill="#e2e8f0"/>
      <!-- Badan Membungkuk Lurus Horizontal 90 derajat -->
      <path d="M152 105 L80 105" stroke="#ffffff" stroke-width="26" stroke-linecap="round"/>
      <!-- Tangan Memegang Lutut -->
      <path d="M82 105 L145 125" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="145" cy="125" r="7" fill="#fed7aa"/>
      <!-- Kepala Sejajar Punggung -->
      <circle cx="62" cy="105" r="20" fill="#fed7aa"/>
      <path d="M48 88 Q62 70 76 88 Z" fill="#047857"/>
      <path d="M52 108 Q57 112 62 108" stroke="#475569" stroke-width="2" fill="none"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Rukuk (Punggung Lurus & Thuma'ninah)</text>
    </svg>`,

    // 6. I'tidal
    "iktidal": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fdf2f8"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg7)"/>
      <path d="M60 172 L85 125 L135 125 L160 172 Z" fill="#047857"/>
      <path d="M65 170 L87 127 L133 127 L155 170 Z" fill="#10b981"/>
      <path d="M90 132 L88 85 Q88 70 110 70 Q132 70 132 85 L130 132 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Tangan tenang di samping atau takbir i'tidal -->
      <path d="M89 85 L84 116" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="84" cy="120" r="5" fill="#fed7aa"/>
      <path d="M131 85 L136 116" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <circle cx="136" cy="120" r="5" fill="#fed7aa"/>
      <circle cx="110" cy="46" r="22" fill="#fed7aa"/>
      <path d="M88 42 Q110 18 132 42 Q132 28 110 22 Q88 28 88 42 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#db2777" text-anchor="middle">I'tidal: Sami'allahu Liman Hamidah</text>
    </svg>`,

    // 7. Sujud (7 Anggota Tubuh)
    "sujud": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg8" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="100%" stop-color="#ffe4e6"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg8)"/>
      <path d="M25 170 L50 140 L175 140 L200 170 Z" fill="#047857"/>
      <path d="M30 168 L52 142 L172 142 L194 168 Z" fill="#10b981"/>
      <!-- Badan Sujud: Dahi Menempel di Sajadah -->
      <!-- Lutut & Kaki di Belakang -->
      <ellipse cx="145" cy="148" rx="14" ry="8" fill="#e2e8f0"/>
      <!-- Punggung Membusur Indah -->
      <path d="M142 145 Q125 105 85 125" stroke="#ffffff" stroke-width="24" stroke-linecap="round" fill="none"/>
      <!-- Telapak Tangan Sejajar Bahu di Lantai -->
      <path d="M95 125 L75 148" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="75" cy="148" r="6" fill="#fed7aa"/>
      <!-- Dahi & Hidung Menempel Sajadah -->
      <circle cx="56" cy="142" r="18" fill="#fed7aa"/>
      <path d="M46 130 Q60 115 74 130 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e11d48" text-anchor="middle">Sujud (Dahi, Hidung, 2 Tangan, 2 Lutut, 2 Kaki)</text>
    </svg>`,

    // 8. Duduk di Antara Dua Sujud (Iftirasy)
    "duduk-dua-sujud": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg9" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ecfdf5"/>
          <stop offset="100%" stop-color="#d1fae5"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg9)"/>
      <path d="M40 170 L65 135 L165 135 L190 170 Z" fill="#047857"/>
      <!-- Kaki Iftirasy (Duduk di atas kaki kiri, kaki kanan tegak) -->
      <ellipse cx="110" cy="150" rx="35" ry="12" fill="#e2e8f0"/>
      <!-- Badan Tegak Duduk -->
      <path d="M94 145 L92 95 Q92 80 110 80 Q128 80 128 95 L126 145 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Tangan diletakkan di atas paha -->
      <path d="M94 95 Q90 120 100 135" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="100" cy="135" r="5.5" fill="#fed7aa"/>
      <path d="M126 95 Q130 120 120 135" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="120" cy="135" r="5.5" fill="#fed7aa"/>
      <circle cx="110" cy="55" r="21" fill="#fed7aa"/>
      <path d="M89 50 Q110 26 131 50 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Duduk Iftirasy (Rabbighfir lii...)</text>
    </svg>`,

    // 9. Tasyahud Awal & 10. Tasyahud Akhir (Menunjuk Telunjuk)
    "tasyahud-awal": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg10" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="100%" stop-color="#ffe4e6"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg10)"/>
      <path d="M40 170 L65 135 L165 135 L190 170 Z" fill="#047857"/>
      <ellipse cx="110" cy="150" rx="35" ry="12" fill="#e2e8f0"/>
      <path d="M94 145 L92 95 Q92 80 110 80 Q128 80 128 95 L126 145 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Tangan Kiri di paha kiri -->
      <path d="M94 95 Q90 120 98 135" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="98" cy="135" r="5.5" fill="#fed7aa"/>
      <!-- Tangan Kanan Menggenggam & Menunjuk Jari Telunjuk ke Kiblat -->
      <path d="M126 95 Q125 118 116 132" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="116" cy="132" r="6" fill="#fed7aa"/>
      <line x1="116" y1="132" x2="110" y2="124" stroke="#fed7aa" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="110" cy="55" r="21" fill="#fed7aa"/>
      <path d="M89 50 Q110 26 131 50 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#be123c" text-anchor="middle">Tasyahud: Menunjuk Jari Telunjuk</text>
    </svg>`,

    "tasyahud-akhir": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg11" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg11)"/>
      <path d="M40 170 L65 135 L165 135 L190 170 Z" fill="#047857"/>
      <ellipse cx="110" cy="150" rx="35" ry="12" fill="#e2e8f0"/>
      <path d="M94 145 L92 95 Q92 80 110 80 Q128 80 128 95 L126 145 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <path d="M94 95 Q90 120 98 135" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="98" cy="135" r="5.5" fill="#fed7aa"/>
      <path d="M126 95 Q125 118 116 132" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <circle cx="116" cy="132" r="6" fill="#fed7aa"/>
      <line x1="116" y1="132" x2="110" y2="124" stroke="#fed7aa" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="110" cy="55" r="21" fill="#fed7aa"/>
      <path d="M89 50 Q110 26 131 50 Z" fill="#047857"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#be123c" text-anchor="middle">Tasyahud Akhir & Sholawat Ibrahimiyah</text>
    </svg>`,

    // 11. Salam (Menoleh ke Kanan & Kiri)
    "salam": `<svg viewBox="0 0 220 180" class="kartun-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sBg12" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#eff6ff"/>
          <stop offset="100%" stop-color="#bfdbfe"/>
        </radialGradient>
      </defs>
      <rect width="220" height="180" rx="20" fill="url(#sBg12)"/>
      <path d="M40 170 L65 135 L165 135 L190 170 Z" fill="#047857"/>
      <ellipse cx="110" cy="150" rx="35" ry="12" fill="#e2e8f0"/>
      <path d="M94 145 L92 95 Q92 80 110 80 Q128 80 128 95 L126 145 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <!-- Menolehkan Wajah ke Kanan -->
      <circle cx="120" cy="55" r="21" fill="#fed7aa"/>
      <path d="M102 50 Q120 28 140 50 Z" fill="#047857"/>
      <!-- Profil Wajah Tersenyum ke Kanan -->
      <path d="M125 55 Q130 58 135 55" stroke="#475569" stroke-width="2" fill="none"/>
      <path d="M128 64 Q133 67 136 64" stroke="#e11d48" stroke-width="2" fill="none"/>
      <!-- Panah Salam ke Kanan -->
      <path d="M145 55 Q155 52 165 58" stroke="#0284c7" stroke-width="3" stroke-linecap="round" fill="none"/>
      <polygon points="167,58 160,54 163,63" fill="#0284c7"/>
      <text x="110" y="174" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af" text-anchor="middle">Salam: Assalamu'alaikum warahmatullah</text>
    </svg>`
  };

  function getWudhuSvg(nomor) {
    // Map step nomor (1-11) to wudhu illustration
    const map = {
      1: 1,  // Niat
      2: 2,  // Basmalah
      3: 1,  // Cuci tangan
      4: 3,  // Berkumur
      5: 4,  // Istinsyaq hidung
      6: 5,  // Basuh wajah
      7: 6,  // Basuh tangan sampai siku
      8: 7,  // Mengusap kepala
      9: 8,  // Mengusap telinga
      10: 9, // Basuh kaki
      11: 10 // Doa wudhu
    };
    const key = map[nomor] || 1;
    return WUDHU_ILLUSTRATIONS[key] || WUDHU_ILLUSTRATIONS[1];
  }

  function getSalatSvg(stepId) {
    return SALAT_ILLUSTRATIONS[stepId] || SALAT_ILLUSTRATIONS['niat'];
  }

  return {
    getWudhuSvg,
    getSalatSvg
  };
})();
