const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY || 'YOUR_TELEGRAM_BOT_API_KEY';

const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY);

// This informs the Telegram servers of the new webhook.
telegramBot.setWebHook(`${config.URL}/chat/telegram-new-message`);

router.get('/', (req, res) => {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Chat Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram Chat',
    serviceUrl: '#'
  });
});

/**
 * Receive message from Telegram, process it for event emitter
 */
router.post('/telegram-new-message', (req, res) => {
  telegramBot.processUpdate(req.body);
  res.sendStatus(200);
});

/**
 * Event on receiving message, process and reply to sender
 */
telegramBot.on('message', msg => {
  telegramBot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}. You said "${msg.text}" to me. `
    + 'But my father @johnnybui hasn\'t taught me what to do with that yet. Please let him know. Cheers');
});

/**
 * Event on receiving inline query
 */
telegramBot.on('inline_query', inlineQuery => {
  // Check if inline query for GIF search
  if (_.startsWith(inlineQuery.query, 'gif ')) {
    // Filter to get the GIF query string
    const query = _.replace(inlineQuery.query, 'gif ', '');

    // Search on Giphy
    giphy.search(query, (err, res) => {
      const gifs = [];
      for (const giphy of res.data) {
        const gif = {
          type: 'gif',
          id: giphy.id,
          gif_url: giphy.images.original.url,
          thumb_url: giphy.images.preview_gif.url
        };
        gifs.push(gif);
      }

      telegramBot.answerInlineQuery(inlineQuery.id, gifs);
    });
  }
});

module.exports = router;