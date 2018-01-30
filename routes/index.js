var express = require('express');
var router = express.Router();
const axios = require('axios');

const TELEGRAM_BOT_API_KEY = process.env.TELEGRAM_BOT_API_KEY;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Okos - Johnny Assistant' });
});

router.post('/new-message', function(req, res, next) {
  const message = req.body.message;

  axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_API_KEY}/sendMessage`, {
    chat_id: message.chat.id,
    text: `Hello world! I heard ${message.text}`
  }).then(response => {
      res.send('ok');
  }).catch(err => {
    res.send('Error :' + err);
  });
});

module.exports = router;
