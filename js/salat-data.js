// ========================================================
// Data Panduan Salat Sesuai Sunah - Quran Rose
// Berdasarkan Al-Qur'an, Hadis Shahih, dan Fiqih Islam
// Catatan: Perbedaan pendapat ulama disebutkan secara netral
// ========================================================

window.SALAT_DATA = {
  intro: {
    judul: "Panduan Salat Sesuai Sunah",
    subtitle: "Tata cara sholat dari persiapan hingga salam",
    pengantar: "Panduan ini menyajikan tata cara sholat berdasarkan Al-Qur'an dan Sunnah Nabi Muhammad SAW. Perbedaan pendapat fikih yang diakui disebutkan secara netral. Ikutilah panduan ustaz atau lembaga keagamaan terpercaya Anda."
  },

  syarat: {
    judul: "Syarat Sah Sholat",
    items: [
      { nama: "Islam", keterangan: "Pelaku sholat harus beragama Islam." },
      { nama: "Baligh dan Berakal", keterangan: "Wajib bagi yang sudah baligh dan berakal. Anak-anak dianjurkan berlatih sejak usia 7 tahun." },
      { nama: "Suci dari Hadats", keterangan: "Telah berwudhu (hadats kecil) atau mandi wajib (hadats besar), atau tayammum jika tidak ada air." },
      { nama: "Suci Badan, Pakaian, dan Tempat", keterangan: "Dari najis yang tidak dimaafkan." },
      { nama: "Menutup Aurat", keterangan: "Aurat laki-laki: dari pusar hingga lutut. Aurat perempuan: seluruh tubuh kecuali wajah dan telapak tangan (menurut mayoritas ulama)." },
      { nama: "Menghadap Kiblat", keterangan: "Menghadap Ka'bah di Makkah. Jika tidak tahu arahnya, berijtihad sesuai kemampuan." },
      { nama: "Masuk Waktu Sholat", keterangan: "Sholat dilaksanakan pada waktunya masing-masing. Dalil: QS An-Nisa (4): 103." }
    ]
  },

  langkah: [
    {
      id: "niat",
      nomor: 1,
      nama: "Niat",
      emoji: "\uD83E\uDD32",
      status: "rukun",
      bacaanArab: "",
      bacaanLatin: "",
      bacaanTerjemahan: "",
      penjelasan: "Niat dilakukan di dalam hati, disesuaikan dengan sholat yang akan dikerjakan (Subuh, Dzuhur, Ashar, Maghrib, Isya, atau sholat sunah tertentu). Melafazkan niat dengan lisan adalah sunah menurut sebagian ulama; ulama lain berpendapat cukup di dalam hati.",
      referensi: "HR. Bukhari (1) dan Muslim (1907): \"Sesungguhnya setiap amal tergantung pada niatnya.\"",
      catatan: "Niat adalah rukun sholat menurut jumhur ulama."
    },
    {
      id: "takbiratul-ihram",
      nomor: 2,
      nama: "Takbiratul Ihram",
      emoji: "\uD83D\uDC99",
      status: "rukun",
      bacaanArab: "اللَّهُ أَكْبَرُ",
      bacaanLatin: "Allahu Akbar",
      bacaanTerjemahan: "Allah Maha Besar.",
      penjelasan: "Mengucapkan 'Allahu Akbar' sambil mengangkat kedua tangan setinggi bahu atau telinga. Ini adalah rukun sholat yang membuka sholat. Sholat tidak sah tanpa takbiratul ihram.",
      referensi: "HR. Bukhari (757): \"Kunci sholat adalah bersuci, yang mengharamkannya adalah takbir, dan yang menghalalkannya adalah salam.\"",
      catatan: "Posisi tangan saat takbir: setinggi bahu (Syafi'i, Maliki) atau setinggi telinga (Hanbali). Ada perbedaan pendapat."
    },
    {
      id: "doa-iftitah",
      nomor: 3,
      nama: "Doa Iftitah",
      emoji: "\uD83D\uDCF0",
      status: "sunah",
      bacaanArab: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
      bacaanLatin: "Allahumma baa'id baynii wa bayna khataayaaya kamaa baa'adta baynal masyriqi wal maghrib. Allahumma naqqinii min khataayaaya kamaa yunaqqats tsawbul abyadu minad danas. Allahummagh-silnii min khataayaaya bits tsalji wal maa-i wal barad.",
      bacaanTerjemahan: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari kesalahan-kesalahanku sebagaimana pakaian putih dibersihkan dari kotoran. Ya Allah, cucilah aku dari kesalahan-kesalahanku dengan salju, air, dan embun.",
      penjelasan: "Doa iftitah dibaca setelah takbiratul ihram sebelum Al-Fatihah. Hukumnya sunah. Terdapat beberapa versi doa iftitah yang diriwayatkan dari Nabi SAW.",
      referensi: "HR. Bukhari (744) dan Muslim (598), dari Abu Hurairah.",
      catatan: "Ada beberapa versi doa iftitah yang sahih. Boleh memilih salah satunya."
    },
    {
      id: "al-fatihah",
      nomor: 4,
      nama: "Membaca Al-Fatihah",
      emoji: "\uD83D\uDCDA",
      status: "rukun",
      bacaanArab: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
      bacaanLatin: "Bismillahirrahmanirrahim (1) Alhamdulillahi rabbil 'aalamin (2) Arrahmanirrahim (3) Maliki yawmiddin (4) Iyyaaka na'budu wa iyyaaka nasta'in (5) Ihdinash shiraathal mustaqim (6) Shiraathal ladziina an'amta 'alayhim ghayril maghdhuubi 'alayhim wa ladh dhaallin (7)",
      bacaanTerjemahan: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam. Yang Maha Pengasih, Maha Penyayang. Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan. Tunjukilah kami jalan yang lurus. (Yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya, bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
      penjelasan: "Membaca Al-Fatihah adalah RUKUN SHOLAT di setiap rakaat menurut Syafi'i, Maliki, dan Hanbali. Menurut Hanafi, Al-Fatihah wajib dibaca tapi bukan rukun; rakaat sah dengan bacaan Al-Qur'an lainnya jika Al-Fatihah tidak dibaca.",
      referensi: "HR. Bukhari (756) dan Muslim (394): \"Tidak ada sholat bagi orang yang tidak membaca Ummul Kitab (Al-Fatihah).\"",
      catatan: "Membaca Aamiin setelah Al-Fatihah adalah sunah. Hukum jahr (keras) atau sir (pelan) bergantung pada jenis sholatnya."
    },
    {
      id: "bacaan-surah",
      nomor: 5,
      nama: "Membaca Surah/Ayat Al-Qur'an",
      emoji: "\uD83D\uDCD6",
      status: "sunah",
      bacaanArab: "",
      bacaanLatin: "",
      bacaanTerjemahan: "",
      penjelasan: "Setelah Al-Fatihah, disunnahkan membaca surah atau ayat lain dari Al-Qur'an pada dua rakaat pertama. Minimal satu ayat menurut Hanafi. Berlaku pada sholat fardhu dan sunah.",
      referensi: "HR. Bukhari dan Muslim dari praktik Nabi SAW dalam sholat.",
      catatan: "Ini sunah muakkadah (sunah yang sangat dianjurkan). Pada rakaat ketiga dan keempat cukup Al-Fatihah."
    },
    {
      id: "ruku",
      nomor: 6,
      nama: "Rukuk",
      emoji: "\uD83C\uDF8F",
      status: "rukun",
      bacaanArab: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      bacaanLatin: "Subhaana rabbiyal 'adziim",
      bacaanTerjemahan: "Maha Suci Tuhanku Yang Maha Agung.",
      penjelasan: "Membungkukkan badan dengan punggung lurus sejajar, kedua tangan memegang lutut. Thuma'ninah (diam sejenak) adalah wajib. Bacaan 'Subhaana rabbiyal 'adziim' minimal satu kali, sunnahnya tiga kali.",
      referensi: "HR. Muslim (772): \"Adapun rukuk, agungkanlah Tuhan kalian padanya.\"",
      catatan: "Thuma'ninah (berhenti dengan tenang) adalah rukun menurut jumhur. Melewatkan thuma'ninah membatalkan sholat menurut mayoritas ulama."
    },
    {
      id: "iktidal",
      nomor: 7,
      nama: "I'tidal (Bangkit dari Rukuk)",
      emoji: "\uD83E\uDDD8",
      status: "rukun",
      bacaanArab: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
      bacaanLatin: "Sami'allahu liman hamidah",
      bacaanTerjemahan: "Allah mendengar orang yang memuji-Nya.",
      penjelasan: "Bangkit tegak dari rukuk sambil mengucapkan 'Sami'allahu liman hamidah'. Kemudian membaca 'Rabbanaa lakal hamd' atau 'Rabbanaa wa lakal hamd'. I'tidal dengan berdiri tegak dan thuma'ninah adalah rukun.",
      referensi: "HR. Bukhari (732) dan Muslim (392)",
      bacaanTambahan: {
        arab: "رَبَّنَا وَلَكَ الْحَمْدُ",
        latin: "Rabbanaa wa lakal hamd",
        terjemahan: "Wahai Tuhan kami, dan bagi-Mu segala puji."
      },
      catatan: "Imam mengucapkan 'Sami'allahu liman hamidah'. Makmum mengucapkan 'Rabbanaa lakal hamd'. Sholat sendiri mengucapkan keduanya."
    },
    {
      id: "sujud",
      nomor: 8,
      nama: "Sujud",
      emoji: "\uD83D\uDE4F",
      status: "rukun",
      bacaanArab: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      bacaanLatin: "Subhaana rabbiyal a'laa",
      bacaanTerjemahan: "Maha Suci Tuhanku Yang Maha Tinggi.",
      penjelasan: "Sujud dengan tujuh anggota tubuh menyentuh lantai: dahi (dan hidung), kedua telapak tangan, kedua lutut, dan kedua ujung jari kaki. Thuma'ninah adalah wajib. Bacaan minimal satu kali, sunnahnya tiga kali.",
      referensi: "HR. Muslim (490): \"Aku diperintahkan untuk bersujud dengan tujuh anggota tubuh.\"",
      catatan: "Sujud dua kali dalam setiap rakaat. Di antara dua sujud ada duduk sebentar (wajib dengan thuma'ninah)."
    },
    {
      id: "duduk-dua-sujud",
      nomor: 9,
      nama: "Duduk di antara Dua Sujud",
      emoji: "\uD83E\uDDD8",
      status: "rukun",
      bacaanArab: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
      bacaanLatin: "Rabbighfir lii, rabbighfir lii",
      bacaanTerjemahan: "Ya Tuhanku, ampunilah aku. Ya Tuhanku, ampunilah aku.",
      penjelasan: "Duduk sebentar dengan thuma'ninah antara sujud pertama dan sujud kedua. Ini adalah rukun. Bacaan di atas adalah sunah.",
      referensi: "HR. Bukhari (818) dan Muslim (990), dari praktik sholat Nabi.",
      catatan: "Posisi duduk: iftirasy (kaki kiri sebagai alas, kaki kanan tegak) menurut mayoritas ulama."
    },
    {
      id: "tasyahud-awal",
      nomor: 10,
      nama: "Tasyahud Awal",
      emoji: "\uD83E\uDD1F",
      status: "sunah",
      bacaanArab: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      bacaanLatin: "At-tahiyyaatu lillahi was shalawaatu wat thayyibaat. As-salaamu 'alayka ayyuhan nabiyyu wa rahmatullahi wa barakaatuh. As-salaamu 'alaynaa wa 'alaa 'ibaadillahish shaalihiin. Asyhadu allaa ilaaha illallah, wa asyhadu anna Muhammadan 'abduhu wa rasuuluh.",
      bacaanTerjemahan: "Segala penghormatan, sholawat, dan kebaikan hanya bagi Allah. Semoga salam, rahmat Allah, dan berkah-Nya tercurah atasmu, wahai Nabi. Semoga salam tercurah pula atas kami dan hamba-hamba Allah yang shalih. Aku bersaksi bahwa tidak ada tuhan selain Allah, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.",
      penjelasan: "Tasyahud awal dibaca pada duduk rakaat kedua (sholat 3 atau 4 rakaat), sebelum berdiri ke rakaat berikutnya. Hukumnya sunah muakkadah (Syafi'i) atau wajib (Hanbali).",
      referensi: "HR. Bukhari (831) dan Muslim (402), dari Ibnu Mas'ud.",
      catatan: "Tasyahud awal sunah menurut Syafi'i dan Maliki. Wajib menurut Hanbali. Perbedaan ini diakui."
    },
    {
      id: "tasyahud-akhir",
      nomor: 11,
      nama: "Tasyahud Akhir",
      emoji: "\uD83D\uDE4F",
      status: "rukun",
      bacaanArab: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
      bacaanLatin: "At-tahiyyaatu lillahi was shalawaatu wat thayyibaat... (lanjutkan seperti tasyahud awal) ...Allahumma shalli 'alaa Muhammad wa 'alaa aali Muhammad, kamaa shallayta 'alaa Ibraahiim wa 'alaa aali Ibraahiim, innaka hamiidun majiid.",
      bacaanTerjemahan: "(Bacaan tasyahud awal) ...Ya Allah, limpahkanlah sholawat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau telah melimpahkan sholawat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
      penjelasan: "Tasyahud akhir adalah RUKUN SHOLAT. Dibaca pada rakaat terakhir setelah sujud terakhir, sebelum salam. Membaca sholawat Ibrahimiyah setelah tasyahud adalah wajib menurut Syafi'i dan Hanbali; sunah menurut Hanafi dan Maliki.",
      referensi: "HR. Bukhari (831), Muslim (402): tentang tasyahud. HR. Bukhari (3370) tentang sholawat Ibrahimiyah.",
      catatan: "Membaca sholawat atas Nabi dalam tasyahud akhir: wajib (Syafi'i, Hanbali) atau sunah (Hanafi, Maliki)."
    },
    {
      id: "salam",
      nomor: 12,
      nama: "Salam",
      emoji: "\uD83E\uDD1D",
      status: "rukun",
      bacaanArab: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      bacaanLatin: "As-salaamu 'alaykum wa rahmatullah",
      bacaanTerjemahan: "Semoga salam dan rahmat Allah terlimpah kepada kalian.",
      penjelasan: "Salam adalah RUKUN SHOLAT yang mengakhiri sholat. Mengucapkan salam ke kanan terlebih dahulu, kemudian ke kiri. Minimal satu salam (ke kanan); dua salam adalah sunah.",
      referensi: "HR. Muslim (582): \"Dan yang menghalalkannya (dari sholat) adalah salam.\"",
      catatan: "Wajib satu salam ke kanan menurut Syafi'i; wajib dua salam menurut Hanbali. Penambahan 'wa barakatuh' pada salam: ada yang sahih dan ada perbedaan ulama tentang derajatnya."
    }
  ],

  shalatWajib: [
    {
      nama: "Subuh",
      rakaat: 2,
      waktu: "Dari fajar shadiq hingga terbit matahari",
      bacaanJahr: "Jahr (keras) pada kedua rakaat"
    },
    {
      nama: "Dzuhur",
      rakaat: 4,
      waktu: "Dari matahari bergeser ke barat hingga bayangan sama panjang",
      bacaanJahr: "Sir (pelan) pada semua rakaat"
    },
    {
      nama: "Ashar",
      rakaat: 4,
      waktu: "Dari bayangan sama panjang hingga matahari terbenam",
      bacaanJahr: "Sir (pelan) pada semua rakaat"
    },
    {
      nama: "Maghrib",
      rakaat: 3,
      waktu: "Dari matahari terbenam hingga hilangnya mega merah",
      bacaanJahr: "Jahr pada dua rakaat pertama"
    },
    {
      nama: "Isya",
      rakaat: 4,
      waktu: "Dari hilangnya mega merah hingga sepertiga malam (utama)",
      bacaanJahr: "Jahr pada dua rakaat pertama"
    }
  ],

  catatanPenting: "Data panduan sholat ini disusun berdasarkan sumber fikih Islam yang terverifikasi. Perbedaan pendapat antar mazhab yang disebutkan adalah perbedaan yang diakui dan dihormati. Untuk memastikan kebenaran praktek ibadah, konsultasikan dengan ustaz terpercaya."
};
