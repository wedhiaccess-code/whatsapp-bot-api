const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// 1. ENDPOINT UNTUK UPTIMEROBOT
app.get('/', (req, res) => {
    res.send('WhatsApp API Gateway is Active and Running 24/7!');
});

app.get('/ping', (req, res) => {
    res.json({ status: "online", timestamp: new Date() });
});

app.listen(port, () => {
    console.log(`Server web berjalan di port ${port}`);
});

// 2. LOGIKA UTAMA WHATSAPP BOT
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('SCAN QR CODE DI BAWAH INI MENGGUNAKAN WHATSAPP ANDA:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot siap digunakan!');
});

client.on('message', async (msg) => {
    if (msg.body.toLowerCase() === 'ping') {
        await msg.reply('pong! Bot Anda aktif.');
    }
    if (msg.body.toLowerCase().includes('halo') || msg.body.toLowerCase().includes('hi')) {
        await msg.reply('Halo! Ada yang bisa kami bantu? Ini adalah balasan otomatis dari bot.');
    }
});

client.initialize().catch(err => console.error("Gagal menginisialisasi WhatsApp:", err));
