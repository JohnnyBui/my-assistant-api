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

router.post('/heroku-deploy', req => {
  const data = req.body;

  telegramBot.sendMessage(CHAT_ID, `[Deployment] Heroku App "${data.app}" has been deployed. `
    + `Open app: ${data.url}. Commit: ${data.head}. Release: ${data.release}.`);
});

router.post('/netlify-deploy/:state', req => {
  const state = req.param.state;
  const data = req.body;

  if (state === 'started') {
    telegramBot.sendMessage(CHAT_ID, `[Deployment][Started] Netlify App "${data.name}" has started deployment. `
    + `Commit: (${data.commit_ref}) ${data.commit_url}.`);
  } else if (state === 'succeeded') {
    telegramBot.sendMessage(CHAT_ID, `[Deployment][Succeeded] Netlify App "${data.name}" has been deployed. `
    + `Open app: ${data.ssl_url}. Commit: (${data.commit_ref}) ${data.commit_url}. Deploy Time: ${data.deploy_time}`);
  } else if (state === 'failed') {
    telegramBot.sendMessage(CHAT_ID, `[Deployment][Failed] Netlify App "${data.name}" deployment has failed. `
    + `Commit: (${data.commit_ref}) ${data.commit_url}. Error: ${data.error_message}. Deploy Time: ${data.deploy_time}`);
  }
});

module.exports = router;
