const fetch = require('node-fetch');

const apiKey = 'usmCmHSELiA1SijeIeexWuicoahY1MHP';

async function getWeather(city) {
  const url = `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.data) {
      const temperature = data.data.timelines[0].intervals[0].values.temperature;
      return `Suhu di ${city}: ${temperature}°C`;
    } else {
      return 'Data suhu tidak tersedia atau nama kota salah';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Terjadi kesalahan saat mengambil data suhu.';
  }
}

// Ekspor fungsi agar bisa digunakan di file lain
module.exports = { getWeather };
