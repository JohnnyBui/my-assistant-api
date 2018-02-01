const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash');
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY || 'YOUR_GIPHY_API_KEY');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY || 'YOUR_TELEGRAM_BOT_API_KEY';

const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY);

// This informs the Telegram servers of the new webhook.
telegramBot.setWebHook(`${config.URL}/chat/telegram`);

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
router.post('/telegram', (req, res) => {
  telegramBot.processUpdate(req.body);
  res.sendStatus(200);
});

/**
 * Event on receiving message, process and reply to sender
 */
telegramBot.on('message', msg => {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Search GIFs', callback_data: 'gif' }],
        [{ text: 'Shorten URL (comming soon)', callback_data: 'url' }]
      ]
    }
  };

  if (msg.text === '/start' || msg.text.trim().toLowerCase() === 'hi' || msg.text.trim().toLowerCase() === 'hello') {
    telegramBot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}. I'm Okos, your personal assistant. I can help you with chores on Telegram. `
    + 'Tap on a job below and I will show you how to have me do that job. If you need to request more job that I haven\'t leanred, please contact my father @johnnybui. '
    + 'If you are a developer, please contribute to his project to teach me more wonderful job at https://github.com/JohnnyBui/my-assistant-api.');
  }

  telegramBot.sendMessage(msg.chat.id, 'What can I do for you?', options);
});

/**
 * Event on receiving callback query
 */
telegramBot.on('callback_query', callbackQuery => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;

  if (data === 'gif') {
    telegramBot.sendMessage(msg.chat.id, 'In any chat, including groups, type `@okosbot gif <keyword>`. I will show you relevant GIFs to choose and send.');
  } else if (data === 'url') {
    telegramBot.sendMessage(msg.chat.id, 'I\'m learning this job. Check back soon!');
  } else {
    telegramBot.sendMessage(msg.chat.id, 'Sorry, I don\'t get it');
  }

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
    giphy.search({ q: query, limit: 10 }, (err, res) => {
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