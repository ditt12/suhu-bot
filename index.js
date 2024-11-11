const { Telegraf } = require('telegraf');
const settings = require('./settings.json');
const { getWeather } = require('./fitur/cuaca');

const bot = new Telegraf(settings.telegram_token);

bot.command('suhu', async (ctx) => {
  const city = ctx.message.text.split(' ')[1]; // Mengambil nama kota setelah '/suhu'
  
  if (!city) {
    ctx.reply('Tolong masukkan nama kota setelah perintah "/suhu". Misal: /suhu Jakarta');
    return;
  }

  const weather = await getWeather(city);
  ctx.reply(weather);
});

bot.start((ctx) => {
  ctx.reply(`
    Hai! 👋 Selamat datang di bot suhu.

    Gunakan perintah berikut untuk mendapatkan suhu:

    /suhu {kota} - untuk mengetahui suhu di kota tertentu.

    Contoh:
    /suhu Jakarta - untuk mendapatkan informasi suhu di Jakarta.
 
    Jangan ragu untuk mencoba!
 (tidak selalu akurat) @orangjawa
  `);
});

bot.launch().then(() => {
  console.log('Bot is running...');
});
