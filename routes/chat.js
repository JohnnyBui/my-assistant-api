const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY || 'YOUR_TELEGRAM_BOT_API_KEY';

const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY);

router.get('/', (req, res) => {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Chat Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram Chat',
    serviceUrl: '#'
  });
});

router.post('/telegram-new-message', (req, res) => {
  const message = req.body.message;

  telegramBot.sendMessage(message.chat.id, `Hello ${message.from.first_name}. You said "${message.text}" to me. `
    + 'But my father @johnnybui hasn\'t taught me what to do with that yet. Please let him know. Cheers');
  res.sendStatus(200);
});

module.exports = router;