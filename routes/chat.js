var express = require('express');
var router = express.Router();
const axios = require('axios');

const config = require('../config');
const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;

router.get('/', function (req, res) {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Chat Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram Chat',
    serviceUrl: '#'
  });
});

router.post('/telegram-new-message', function (req, res) {
  const message = req.body.message;

  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_API_KEY}/sendMessage`, {
    chat_id: message.chat.id,
    text: `Hello ${message.from.first_name}. You said "${message.text}" to me. `
    + 'But my father @johnnybui hasn\'t taught me what to do with that yet. Please let him know. Cheers'
  }).then(response => {
    console.log(response);
    res.send('ok');
  }).catch(err => {
    res.send('Error :' + err);
  });
});

module.exports = router;
