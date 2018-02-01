/**
 * Alpha stage. Currently intended for personally use only. I will develop for public use soon
 */

const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY || 'YOUR_TELEGRAM_BOT_API_KEY';
const CHAT_ID = 479142572;

const telegramBot = new TelegramBot(TELEGRAM_BOT_API_KEY);

router.get('/', (req, res) => {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Notification Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram Notification',
    serviceUrl: '#'
  });
});

/**
 * Heroku deployment notification
 */
router.post('/heroku-deploy', (req, res) => {
  const data = req.body;

  telegramBot.sendMessage(CHAT_ID, `[Heroku-Deploy] App "${data.app}" has been deployed. `
    + `Open app: ${data.url}. Commit: ${data.head}. Release: ${data.release}.`);
  res.sendStatus(200);
});

/**
 * Netlify deployment notification
 * 3 states: started, succeeded, failed
 */
router.post('/netlify-deploy/:state', (req, res) => {
  const state = req.params.state;
  const data = req.body;

  if (state === 'started') {
    telegramBot.sendMessage(CHAT_ID, `[Netlify-Deploy][Started] App "${data.name}" has started deployment. `
      + `Commit: (${data.commit_ref}) ${data.commit_url}.`);
    res.sendStatus(200);
  } else if (state === 'succeeded') {
    telegramBot.sendMessage(CHAT_ID, `[Netlify-Deploy][Succeeded] App "${data.name}" has been deployed. `
      + `Open app: ${data.ssl_url}. Commit: (${data.commit_ref}) ${data.commit_url}. Deploy Time: ${data.deploy_time}`);
    res.sendStatus(200);
  } else if (state === 'failed') {
    telegramBot.sendMessage(CHAT_ID, `[Netlify-Deploy][Failed] App "${data.name}" deployment has failed. `
      + `Commit: (${data.commit_ref}) ${data.commit_url}. Error: ${data.error_message}. Deploy Time: ${data.deploy_time}`);
    res.sendStatus(200);
  } else {
    res.status(400).send('invalid state');
  }
});

module.exports = router;
