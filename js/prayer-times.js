// ========================================================
// Prayer Times & Qibla Calculation Engine
// Based on Standard Astronomical Formula & Kemenag RI Method
// ========================================================

const PrayerTimesEngine = {
  // Kaaba Coordinates
  KAABA_LAT: 21.422487,
  KAABA_LNG: 39.826206,

  // Indonesian Major Cities Preset
  CITIES: [
    { name: 'Jakarta (DKI Jakarta)', lat: -6.2088, lng: 106.8456, timezone: 7 },
    { name: 'Surabaya (Jawa Timur)', lat: -7.2575, lng: 112.7521, timezone: 7 },
    { name: 'Bandung (Jawa Barat)', lat: -6.9175, lng: 107.6191, timezone: 7 },
    { name: 'Medan (Sumatera Utara)', lat: 3.5952, lng: 98.6722, timezone: 7 },
    { name: 'Semarang (Jawa Tengah)', lat: -6.9667, lng: 110.4167, timezone: 7 },
    { name: 'Makassar (Sulawesi Selatan)', lat: -5.1477, lng: 119.4327, timezone: 8 },
    { name: 'Palembang (Sumatera Selatan)', lat: -2.9761, lng: 104.7754, timezone: 7 },
    { name: 'Yogyakarta (DIY)', lat: -7.7956, lng: 110.3695, timezone: 7 },
    { name: 'Denpasar (Bali)', lat: -8.6705, lng: 115.2126, timezone: 8 },
    { name: 'Balikpapan (Kalimantan Timur)', lat: -1.2379, lng: 116.8529, timezone: 8 },
    { name: 'Banjarmasin (Kalimantan Selatan)', lat: -3.3167, lng: 114.5833, timezone: 8 },
    { name: 'Banda Aceh (Aceh)', lat: 5.5483, lng: 95.3238, timezone: 7 },
    { name: 'Jayapura (Papua)', lat: -2.5337, lng: 140.7181, timezone: 9 }
  ],

  // Qibla Bearing Formula (Spherical Trigonometry)
  getQiblaBearing(lat, lng) {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kLatRad = (this.KAABA_LAT * Math.PI) / 180;
    const kLngRad = (this.KAABA_LNG * Math.PI) / 180;

    const y = Math.sin(kLngRad - lngRad);
    const x = Math.cos(latRad) * Math.tan(kLatRad) - Math.sin(latRad) * Math.cos(kLngRad - lngRad);
    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  },

  // Distance to Kaaba in Kilometers (Haversine Formula)
  getDistanceToKaaba(lat, lng) {
    const R = 6371; // Earth's radius in km
    const dLat = ((this.KAABA_LAT - lat) * Math.PI) / 180;
    const dLng = ((this.KAABA_LNG - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((this.KAABA_LAT * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  },

  // Calculate Sun Position & Equation of Time (NOAA / Meeus Astronomical Standard)
  _sunPosition(julianDate) {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;
    const d = julianDate - 2451545.0;

    // Mean anomaly & mean longitude
    const g = (357.529 + 0.98560028 * d) % 360;
    const q = (280.459 + 0.98564736 * d) % 360;

    // Apparent ecliptic longitude
    const L = (q + 1.915 * Math.sin(g * rad) + 0.02 * Math.sin(2 * g * rad)) % 360;

    // Obliquity of the ecliptic
    const e = 23.439 - 0.00000036 * d;

    // Right ascension (in hours)
    let RA = Math.atan2(Math.cos(e * rad) * Math.sin(L * rad), Math.cos(L * rad)) * deg;
    RA = ((RA % 360) + 360) % 360 / 15;

    // Declination (in degrees)
    const decl = Math.asin(Math.sin(e * rad) * Math.sin(L * rad)) * deg;

    // Equation of time (in hours)
    const qHours = ((q % 360) + 360) % 360 / 15;
    let EqT = qHours - RA;
    if (EqT > 12) EqT -= 24;
    if (EqT < -12) EqT += 24;

    return { declination: decl, equationOfTime: EqT };
  },

  _julianDate(year, month, day) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  },

  // Compute Prayer Times for Given Date & Coordinates (Kemenag RI Standard)
  calculate(date, lat, lng, timezone = 7) {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;

    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const JD = this._julianDate(y, m, d);
    const sun = this._sunPosition(JD);

    const D = sun.declination;
    const EqT = sun.equationOfTime;

    // Solar Transit / Solar Noon in local time hours
    const noon = 12 + timezone - lng / 15 - EqT;

    const D_rad = D * rad;
    const Lat_rad = lat * rad;

    // Helper for Hour Angle
    const hourAngle = (angle) => {
      const cosHA = (-Math.sin(angle * rad) - Math.sin(Lat_rad) * Math.sin(D_rad)) / (Math.cos(Lat_rad) * Math.cos(D_rad));
      if (cosHA > 1 || cosHA < -1) return 0;
      return Math.acos(cosHA) * deg / 15;
    };

    // Subuh: Kemenag standard uses 20 degrees below horizon
    const haSubuh = hourAngle(20);
    // Terbit: 0.833 degrees (atmospheric refraction)
    const haSunrise = hourAngle(0.833);
    // Maghrib: 0.833 degrees
    const haSunset = hourAngle(0.833);
    // Isya: Kemenag standard uses 18 degrees below horizon
    const haIsya = hourAngle(18);

    // Ashar: Shafi'i shadow ratio = 1 + tan(|lat - D|)
    const shadowFactor = 1 + Math.tan(Math.abs(Lat_rad - D_rad));
    const asharAngle = Math.atan(1 / shadowFactor) * deg;
    const cosHAAshar = (Math.sin(asharAngle * rad) - Math.sin(Lat_rad) * Math.sin(D_rad)) / (Math.cos(Lat_rad) * Math.cos(D_rad));
    const haAshar = cosHAAshar >= -1 && cosHAAshar <= 1 ? Math.acos(cosHAAshar) * deg / 15 : 3;

    // Calculate raw times (in decimal hours) + 2 minutes ihtiyat (safety margin used by Kemenag)
    const ihtiyat = 2 / 60;
    const subuhHours = noon - haSubuh + ihtiyat;
    const sunriseHours = noon - haSunrise;
    const dzuhurHours = noon + ihtiyat;
    const asharHours = noon + haAshar + ihtiyat;
    const maghribHours = noon + haSunset + ihtiyat;
    const isyaHours = noon + haIsya + ihtiyat;

    const toTimeString = (decimal) => {
      let totalMinutes = Math.round(decimal * 60);
      let hours = Math.floor(totalMinutes / 60) % 24;
      if (hours < 0) hours += 24;
      let minutes = totalMinutes % 60;
      if (minutes < 0) minutes += 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    return {
      subuh: toTimeString(subuhHours),
      terbit: toTimeString(sunriseHours),
      dzuhur: toTimeString(dzuhurHours),
      ashar: toTimeString(asharHours),
      maghrib: toTimeString(maghribHours),
      isya: toTimeString(isyaHours),
      raw: {
        subuh: subuhHours,
        terbit: sunriseHours,
        dzuhur: dzuhurHours,
        ashar: asharHours,
        maghrib: maghribHours,
        isya: isyaHours
      }
    };
  },

  // Approximate Hijri Calendar Conversion
  getHijriDate(date) {
    const months = [
      'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
      'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
      'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
    ];

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    let a = Math.floor(y / 100);
    let b = 2 - a + Math.floor(a / 4);
    if (y < 1583) b = 0;
    if (y === 1582) {
      if (m > 10) b = -10;
      if (m === 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4);
    }
    let bb = jd + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    let wd = (jd + 1) % 7;
    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let mHijri = Math.floor((24 * l) / 709);
    let dHijri = l - Math.floor((709 * mHijri) / 24);
    let yHijri = 30 * n + j - 30;

    return `${dHijri} ${months[mHijri - 1] || 'Jumadil Awal'} ${yHijri} H`;
  }
};

if (typeof window !== 'undefined') {
  window.PrayerTimesEngine = PrayerTimesEngine;
}
if (typeof module !== 'undefined') {
  module.exports = PrayerTimesEngine;
}
