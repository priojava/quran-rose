const fs = require('fs');
const path = require('path');

async function buildData() {
  console.log('Fetching surahs from equran.id...');
  const res = await fetch('https://equran.id/api/v2/surat');
  const json = await res.json();
  const surahs = json.data;

  console.log('Fetching translation audio mapping from archive.org...');
  let translationMap = {};
  try {
    const aRes = await fetch('https://archive.org/metadata/murottal-al-quran-mishary-rashid-misyari-rasyid-mp3-per-surat-plus-terjemahan-ba');
    const aJson = await aRes.json();
    if (aJson.files) {
      aJson.files.forEach(f => {
        if (f.name && f.name.endsWith('.mp3')) {
          const num = parseInt(f.name.split('.')[0].trim(), 10);
          if (!isNaN(num) && num >= 1 && num <= 114) {
            translationMap[num] = 'https://archive.org/download/murottal-al-quran-mishary-rashid-misyari-rasyid-mp3-per-surat-plus-terjemahan-ba/' + encodeURIComponent(f.name);
          }
        }
      });
    }
  } catch (err) {
    console.warn('Could not fetch archive.org translation mapping, using fallback format:', err.message);
  }

  const qaris = [
    { id: '05', name: 'Misyari Rasyid Al-Afasi', short: 'Misyari Rasyid', style: 'Hafs an Asim' },
    { id: '03', name: 'Abdurrahman As-Sudais', short: 'As-Sudais', style: 'Imam Masjidil Haram' },
    { id: '01', name: 'Abdullah Al-Juhany', short: 'Al-Juhany', style: 'Imam Masjidil Haram' },
    { id: '06', name: 'Yasser Al-Dosari', short: 'Al-Dosari', style: 'Imam Masjidil Haram' },
    { id: '04', name: 'Ibrahim Al-Dossari', short: 'Ibrahim Dossari', style: 'Warsy an Nafi' },
    { id: '02', name: 'Abdul Muhsin Al-Qasim', short: 'Al-Qasim', style: 'Imam Masjid Nabawi' }
  ];

  const processed = surahs.map(s => {
    const pad3 = String(s.nomor).padStart(3, '0');
    return {
      nomor: s.nomor,
      nama: s.nama,
      namaLatin: s.namaLatin,
      jumlahAyat: s.jumlahAyat,
      tempatTurun: s.tempatTurun === 'Mekah' ? 'Mekkah' : s.tempatTurun,
      arti: s.arti,
      deskripsi: s.deskripsi,
      audioFull: s.audioFull,
      audioTerjemahan: translationMap[s.nomor] || ''
    };
  });

  const jsDir = path.join(__dirname, 'js');
  if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });

  const content = `// Data 114 Surah Al-Qur'an Lengkap & Audio Mapping
const QARI_LIST = ${JSON.stringify(qaris, null, 2)};

const QURAN_DATA = ${JSON.stringify(processed, null, 2)};

if (typeof window !== 'undefined') {
  window.QARI_LIST = QARI_LIST;
  window.QURAN_DATA = QURAN_DATA;
}
if (typeof module !== 'undefined') {
  module.exports = { QARI_LIST, QURAN_DATA };
}
`;

  fs.writeFileSync(path.join(jsDir, 'quran-data.js'), content, 'utf8');
  console.log(`Success! Saved ${processed.length} surahs and ${qaris.length} qaris to js/quran-data.js`);
}

buildData().catch(err => {
  console.error('Build data error:', err);
  process.exit(1);
});
