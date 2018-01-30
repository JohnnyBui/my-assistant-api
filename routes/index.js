const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = require('../config');

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;

router.get('/', function(req, res, next) {
  res.render('index', { title: `${config.ASSISTANT_NAME} - Johnny Assistant`, assistantName: config.ASSISTANT_NAME });
});

router.post('/new-message', function(req, res, next) {
  const message = req.body.message;

  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_API_KEY}/sendMessage`, {
    chat_id: message.chat.id,
    text: `Hello ${message.from.first_name}. You said "${message.text}" to me. `
      + `But my father @johnnybui hasn't taught me what to do with that yet. Please let him know. Cheers!`
  }).then(response => {
      res.send('ok');
  }).catch(err => {
    res.send('Error :' + err);
  });
});

module.exports = router;
