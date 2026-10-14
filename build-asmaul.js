const fs = require('fs');

async function getAsmaul() {
  console.log('Fetching 99 Asmaul Husna...');
  const res = await fetch('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna');
  const json = await res.json();
  const list = json.data.map(item => ({
    nomor: parseInt(item.index, 10),
    latin: item.latin,
    arab: item.arabic,
    arti: item.translation_id,
    artiEn: item.translation_en
  }));

  const code = `// 99 Asmaul Husna Lengkap dengan Teks Arab, Latin, Terjemahan & Audio
const ASMAUL_HUSNA_DATA = ${JSON.stringify(list, null, 2)};

const ASMAUL_HUSNA_AUDIO_URL = "https://archive.org/download/asmaul-husna_20200509/Asmaul%20Husna.mp3";

if (typeof window !== 'undefined') {
  window.ASMAUL_HUSNA_DATA = ASMAUL_HUSNA_DATA;
  window.ASMAUL_HUSNA_AUDIO_URL = ASMAUL_HUSNA_AUDIO_URL;
}
if (typeof module !== 'undefined') {
  module.exports = { ASMAUL_HUSNA_DATA, ASMAUL_HUSNA_AUDIO_URL };
}
`;

  fs.writeFileSync('js/asmaul-husna-data.js', code, 'utf8');
  console.log('Successfully saved js/asmaul-husna-data.js with ' + list.length + ' names.');
}

getAsmaul().catch(err => {
  console.error('Error fetching Asmaul Husna:', err);
  process.exit(1);
});
