// ========================================================
// Data Dzikir & Doa Pagi & Petang (Sesuai As-Sunnah Ash-Shahihah)
// Lengkap teks Arab, Latin, Terjemahan, dan Keutamaan
// ========================================================

const DZIKIR_PAGI = [
  {
    id: 'pagi-1',
    title: 'Ayat Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta\'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzal-ladzii yasyfa\'u \'indahuu illaa bi-idznih, ya\'lamu maa bayna aydiihim wa maa khalfahum, wa laa yuhiithuuna bi syay-im-min \'ilmihii illaa bi maa syaa\', wasi\'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal \'aliyyul \'azhiim.',
    translation: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan apa yang di belakang mereka, dan mereka tidak mengetahui sesuatu apa pun tentang ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Mahatinggi, Mahabesar. (QS. Al-Baqarah: 255)',
    repeat: 1,
    note: 'Faedah: Siapa yang membacanya di pagi hari akan dilindungi dari gangguan jin dan marabahaya hingga petang. (HR. Al-Hakim)'
  },
  {
    id: 'pagi-2',
    title: 'Surat Al-Ikhlas, Al-Falaq, An-Nas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ...',
    latin: 'Membaca Surat Al-Ikhlas, Surat Al-Falaq, dan Surat An-Nas masing-masing 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    repeat: 3,
    note: 'Faedah: Siapa yang membacanya sebanyak 3 kali setiap pagi dan petang, niscaya akan mencukupkannya dari segala keburukan dan kejahatan. (HR. Abu Dawud & At-Tirmidzi)'
  },
  {
    id: 'pagi-3',
    title: 'Dzikir Pagi Menyongsong Kerajaan Allah',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: 'Ash-bahnaa wa ash-bahal mulku lillaah, wal hamdulillaah, laa ilaaha illallaah wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa \'alaa kulli syay-in qadiir. Rabbi as-aluka khayra maa fii haadzal yawmi wa khayra maa ba\'dahu, wa a\'uudzu bika min syarri maa fii haadzal yawmi wa syarri maa ba\'dahu. Rabbi a\'uudzu bika minal kasali wa suu-il kibar, rabbi a\'uudzu bika min \'adzaabin fin-naari wa \'adzaabin fil qabr.',
    translation: 'Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia Mahakuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan hari ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan hari ini dan keburukan sesudahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan di hari tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur. (HR. Muslim)'
  },
  {
    id: 'pagi-4',
    title: 'Sayyidul Istighfar (Penghulu Istighfar)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: 'Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa \'abduka, wa anaa \'alaa \'ahdika wa wa\'dika mastatha\'tu, a\'uudzu bika min syarri maa shana\'tu, abuu-u laka bini\'matika \'alayya, wa abuu-u bidzambii faghfir lii fa-innahu laa yaghfirudz-dzunuuba illaa anta.',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada tuhan selain Engkau. Engkaulah yang menciptakan aku dan aku adalah hamba-Mu. Aku berusaha menepati janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, karena sesungguhnya tidak ada yang mengampuni dosa selain Engkau.',
    repeat: 1,
    note: 'Faedah: Barang siapa membacanya dengan yakin di pagi hari lalu meninggal sebelum sore hari, maka dia termasuk penghuni surga. (HR. Al-Bukhari)'
  },
  {
    id: 'pagi-5',
    title: 'Doa Memohon Perlindungan Pagi Hari',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    latin: 'Allaahumma bika ash-bahnaa, wa bika amsaynaa, wa bika nahyaa, wa bika namuutu, wa ilaykan-nusyuur.',
    translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat-Mu kami memasuki waktu petang. Dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati, dan kepada-Mu tempat kembali berbangkit. (HR. At-Tirmidzi)',
    repeat: 1
  },
  {
    id: 'pagi-6',
    title: 'Memohon Kesehatan Jasmani & Perlindungan',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',
    latin: 'Allaahumma \'aafinii fii badanii, Allaahumma \'aafinii fii sam\'ii, Allaahumma \'aafinii fii basharii, laa ilaaha illaa anta. Allaahumma innii a\'uudzu bika minal kufri wal faqr, wa a\'uudzu bika min \'adzaabil qabr, laa ilaaha illaa anta.',
    translation: 'Ya Allah, selamatkanlah tubuhku (dari penyakit). Ya Allah, selamatkanlah pendengaranku. Ya Allah, selamatkanlah penglihatanku, tidak ada tuhan selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekafiran dan kefakiran. Dan aku berlindung kepada-Mu dari siksa kubur, tidak ada tuhan selain Engkau.',
    repeat: 3,
    note: 'Dibaca 3 kali setiap pagi dan petang. (HR. Abu Dawud & Ahmad)'
  },
  {
    id: 'pagi-7',
    title: 'Memohon Keselamatan Dunia & Akhirat',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
    latin: 'Allaahumma innii as-alukal \'afwa wal \'aafiyata fid-dunyaa wal aakhirah. Allaahumma innii as-alukal \'afwa wal \'aafiyata fii diinii wa dunyaaya wa ahlii wa maalii. Allaahummastur \'awraatii wa aamin raw\'aatii. Allaahummahfazhnii mim bayni yadayya, wa min khalfii, wa \'an yamiinii, wa \'an syimaalii, wa min fawqii, wa a\'uudzu bi\'azhamatika an ughtaala min tahtii.',
    translation: 'Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat. Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan dalam agamaku, duniaku, keluargaku, dan hartaku. Ya Allah, tutupilah auratku (kekurangan dan aibku) dan tenangkanlah ketakutanku. Ya Allah, jagalah aku dari arah depanku, belakangku, kananku, kiriku, dan atasku. Dan aku berlindung dengan keagungan-Mu agar aku tidak diserang dari arah bawahku (dibenamkan ke bumi). (HR. Abu Dawud & Ibnu Majah)',
    repeat: 1
  },
  {
    id: 'pagi-8',
    title: 'Pelindung dari Marabahaya Bumi & Langit',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: 'Bismillaahil-ladzii laa yadhurru ma\'as-mihii syay-un fil ardhi wa laa fis-samaa-i wa huwas-samii\'ul \'aliim.',
    translation: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    repeat: 3,
    note: 'Faedah: Barang siapa membacanya sebanyak 3 kali di waktu pagi dan petang, tidak akan ada sesuatu pun yang dapat membahayakannya. (HR. Abu Dawud & At-Tirmidzi)'
  },
  {
    id: 'pagi-9',
    title: 'Kerelaan Hati kepada Allah, Islam & Nabi Muhammad',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: 'Radhiitu billaahi rabbaa, wa bil Islaami diinaa, wa bi Muhammadin shallallaahu \'alayhi wa sallama nabiyyaa.',
    translation: 'Aku rela Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu \'alaihi wa sallam sebagai Nabiku.',
    repeat: 3,
    note: 'Faedah: Barang siapa mengucapkannya sebanyak 3 kali setiap pagi dan petang, Allah berhak meridhainya pada hari kiamat. (HR. Abu Dawud & Ahmad)'
  },
  {
    id: 'pagi-10',
    title: 'Pelepas Kesulitan & Penata Segala Urusan',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
    latin: 'Yaa Hayyu Yaa Qayyuum bi rahmatika astaghiits, ashlih lii sya\'nii kullah, wa laa takilnii ilaa nafsii tharfata \'ayn.',
    translation: 'Wahai Rabb Yang Mahahidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan janganlah Engkau serahkan urusanku kepada diriku sendiri walau sekejap mata. (HR. An-Nasa\'i & Al-Hakim)',
    repeat: 1
  },
  {
    id: 'pagi-11',
    title: 'Kalimat Tauhid & Penggugur Dosa',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    latin: 'Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa \'alaa kulli syay-in qadiir.',
    translation: 'Tidak ada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala pujian. Dan Dia Mahakuasa atas segala sesuatu.',
    repeat: 10,
    note: 'Faedah: Diberi pahala memerdekakan empat budak dari keturunan Nabi Ismail, dihapuskan sepuluh kesalahan, dan ditinggikan sepuluh derajat. (HR. Al-Bukhari & Muslim)'
  },
  {
    id: 'pagi-12',
    title: 'Tasbih & Pujian Sebanyak Ciptaan Allah',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    latin: 'Subhaanallaahi wa bihamdih, \'adada khalqih, wa ridhaa nafsih, wa zinata \'arsyih, wa midaada kalimaatih.',
    translation: 'Maha Suci Allah dan segala puji bagi-Nya, sebanyak hitungan makhluk-Nya, sejauh keridhaan diri-Nya, seberat timbangan Arsy-Nya, dan sebanyak tinta kalimat-kalimat-Nya.',
    repeat: 3,
    note: 'Faedah: Dzikir agung yang pahalanya menandingi zikir berjam-jam dari subuh hingga siang. (HR. Muslim)'
  },
  {
    id: 'pagi-13',
    title: 'Memohon Ilmu Bermanfaat, Rezeki Halal & Amal Diterima',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    latin: 'Allaahumma innii as-aluka \'ilman naafi\'aa, wa rizqan thayyibaa, wa \'amalan mutaqabbalaa.',
    translation: 'Ya Allah, sungguh aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik (halal), dan amal yang diterima. (Dibaca setelah salam shalat Subuh / pagi hari). (HR. Ibnu Majah & Ahmad)',
    repeat: 1
  }
];

const DZIKIR_PETANG = [
  {
    id: 'petang-1',
    title: 'Ayat Kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allaahu laa ilaaha illaa huwal hayyul qayyuum, laa ta\'khudzuhuu sinatuw-wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh, man dzal-ladzii yasyfa\'u \'indahuu illaa bi-idznih, ya\'lamu maa bayna aydiihim wa maa khalfahum, wa laa yuhiithuuna bi syay-im-min \'ilmihii illaa bi maa syaa\', wasi\'a kursiyyuhus-samaawaati wal-ardh, wa laa ya-uuduhuu hifzhuhumaa, wa huwal \'aliyyul \'azhiim.',
    translation: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus makhluk-Nya, tidak mengantuk dan tidak tidur... (QS. Al-Baqarah: 255)',
    repeat: 1,
    note: 'Faedah: Siapa yang membacanya di petang hari akan dilindungi dari gangguan jin dan marabahaya hingga pagi hari. (HR. Al-Hakim)'
  },
  {
    id: 'petang-2',
    title: 'Surat Al-Ikhlas, Al-Falaq, An-Nas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ...',
    latin: 'Membaca Surat Al-Ikhlas, Surat Al-Falaq, dan Surat An-Nas masing-masing 3 kali.',
    translation: 'Katakanlah: Dialah Allah, Yang Maha Esa... Katakanlah: Aku berlindung kepada Tuhan yang menguasai subuh... Katakanlah: Aku berlindung kepada Tuhannya manusia...',
    repeat: 3,
    note: 'Faedah: Menjaga dan mencukupi dari segala keburukan dan kejahatan sepanjang malam. (HR. Abu Dawud)'
  },
  {
    id: 'petang-3',
    title: 'Dzikir Petang Menyongsong Malam Allah',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    latin: 'Amsaynaa wa amsal mulku lillaah, wal hamdulillaah, laa ilaaha illallaah wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa \'alaa kulli syay-in qadiir. Rabbi as-aluka khayra maa fii haadzihil laylati wa khayra maa ba\'dahaa, wa a\'uudzu bika min syarri maa fii haadzihil laylati wa syarri maa ba\'dahaa. Rabbi a\'uudzu bika minal kasali wa suu-il kibar, rabbi a\'uudzu bika min \'adzaabin fin-naari wa \'adzaabin fil qabr.',
    translation: 'Kami telah memasuki waktu petang dan kerajaan hanya milik Allah, segala puji bagi Allah. Tidak ada tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya pujian. Dia Mahakuasa atas segala sesuatu. Wahai Tuhanku, aku memohon kepada-Mu kebaikan malam ini dan kebaikan sesudahnya, dan aku berlindung kepada-Mu dari keburukan malam ini dan keburukan sesudahnya. Wahai Tuhanku, aku berlindung kepada-Mu dari kemalasan dan keburukan di hari tua. Wahai Tuhanku, aku berlindung kepada-Mu dari siksa neraka dan siksa kubur. (HR. Muslim)',
    repeat: 1
  },
  {
    id: 'petang-4',
    title: 'Sayyidul Istighfar (Penghulu Istighfar)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: 'Allaahumma anta rabbii laa ilaaha illaa anta, khalaqtanii wa anaa \'abduka, wa anaa \'alaa \'ahdika wa wa\'dika mastatha\'tu, a\'uudzu bika min syarri maa shana\'tu, abuu-u laka bini\'matika \'alayya, wa abuu-u bidzambii faghfir lii fa-innahu laa yaghfirudz-dzunuuba illaa anta.',
    translation: 'Ya Allah, Engkau adalah Tuhanku, tidak ada tuhan selain Engkau. Engkaulah yang menciptakan aku dan aku adalah hamba-Mu. Aku berusaha menepati janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan apa yang kuperbuat. Aku mengakui nikmat-Mu kepadaku dan aku mengakui dosaku, maka ampunilah aku, karena sesungguhnya tidak ada yang mengampuni dosa selain Engkau.',
    repeat: 1,
    note: 'Faedah: Barang siapa membacanya dengan yakin di petang hari lalu meninggal di malam itu, maka dia termasuk penghuni surga. (HR. Al-Bukhari)'
  },
  {
    id: 'petang-5',
    title: 'Doa Memasuki Waktu Petang',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    latin: 'Allaahumma bika amsaynaa, wa bika ash-bahnaa, wa bika nahyaa, wa bika namuutu, wa ilaykal mashiir.',
    translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat-Mu kami memasuki waktu pagi. Dengan rahmat-Mu kami hidup dan dengan kehendak-Mu kami mati, dan kepada-Mu tempat kembali. (HR. At-Tirmidzi)',
    repeat: 1
  },
  {
    id: 'petang-6',
    title: 'Memohon Kesehatan Jasmani & Perlindungan',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَٰهَ إِلَّا أَنْتَ',
    latin: 'Allaahumma \'aafinii fii badanii, Allaahumma \'aafinii fii sam\'ii, Allaahumma \'aafinii fii basharii, laa ilaaha illaa anta. Allaahumma innii a\'uudzu bika minal kufri wal faqr, wa a\'uudzu bika min \'adzaabil qabr, laa ilaaha illaa anta.',
    translation: 'Ya Allah, selamatkanlah tubuhku. Ya Allah, selamatkanlah pendengaranku. Ya Allah, selamatkanlah penglihatanku, tidak ada tuhan selain Engkau. Ya Allah, aku berlindung kepada-Mu dari kekafiran dan kemiskinan, dan dari siksa kubur.',
    repeat: 3
  },
  {
    id: 'petang-7',
    title: 'Pelindung dari Marabahaya Bumi & Langit',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    latin: 'Bismillaahil-ladzii laa yadhurru ma\'as-mihii syay-un fil ardhi wa laa fis-samaa-i wa huwas-samii\'ul \'aliim.',
    translation: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.',
    repeat: 3,
    note: 'Faedah: Tidak akan ada marabahaya atau racun/sengatan binatang berbisa yang dapat memudharatkannya hingga pagi. (HR. Abu Dawud)'
  },
  {
    id: 'petang-8',
    title: 'Perlindungan dengan Kalimat Allah yang Sempurna',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    latin: 'A\'uudzu bi kalimaatillaahit-taammaati min syarri maa khalaq.',
    translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang Dia ciptakan.',
    repeat: 3,
    note: 'Faedah: Siapa yang membacanya 3 kali di waktu sore tidak akan terkena sengatan binatang berbisa pada malam itu. (HR. Muslim & At-Tirmidzi)'
  },
  {
    id: 'petang-9',
    title: 'Kerelaan Hati kepada Allah, Islam & Nabi Muhammad',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    latin: 'Radhiitu billaahi rabbaa, wa bil Islaami diinaa, wa bi Muhammadin shallallaahu \'alayhi wa sallama nabiyyaa.',
    translation: 'Aku rela Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu \'alaihi wa sallam sebagai Nabiku.',
    repeat: 3
  },
  {
    id: 'petang-10',
    title: 'Pelepas Kesulitan & Penata Segala Urusan',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
    latin: 'Yaa Hayyu Yaa Qayyuum bi rahmatika astaghiits, ashlih lii sya\'nii kullah, wa laa takilnii ilaa nafsii tharfata \'ayn.',
    translation: 'Wahai Rabb Yang Mahahidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah seluruh urusanku dan janganlah Engkau serahkan urusanku kepada diriku sendiri walau sekejap mata.',
    repeat: 1
  },
  {
    id: 'petang-11',
    title: 'Tasbih & Penyucian Dosa 100 Kali',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    latin: 'Subhaanallaahi wa bihamdih.',
    translation: 'Maha Suci Allah dan dengan memuji-Nya.',
    repeat: 100,
    note: 'Faedah: Barang siapa membacanya 100 kali pada waktu petang, tidak ada seorang pun pada hari kiamat yang membawa amal lebih utama darinya kecuali orang yang membaca semisalnya atau lebih banyak. (HR. Muslim)'
  }
];

if (typeof window !== 'undefined') {
  window.DZIKIR_PAGI = DZIKIR_PAGI;
  window.DZIKIR_PETANG = DZIKIR_PETANG;
}
