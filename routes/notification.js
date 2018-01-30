/**
 * Alpha stage. Currently intended for personally use only. I will develop for public use soon
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;
const CHAT_ID = 479142572;

router.get('/', function (req, res) {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Notification Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram Notification',
    serviceUrl: '#'
  });
});

router.post('/heroku-deploy', function (req, res) {
  const data = req.body;

  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_API_KEY}/sendMessage`, {
    chat_id: CHAT_ID,
    text: `Heroku App "${data.app}" has been deployed sucessfully. Open app: ${data.url}. Last commit message: ${data.git_log}`
  }).then(response => {
    console.log(response);
    res.send('ok');
  }).catch(err => {
    res.send('Error :' + err);
  });
});

module.exports = router;
