var express = require('express');
var router = express.Router();

const config = require('../config');

router.get('/', function(req, res, next) {
  res.render('service-home', {
    title: `${config.ASSISTANT_NAME} Telegram Service`,
    assistantName: config.ASSISTANT_NAME,
    serviceName: 'Telegram',
    serviceUrl: 'https://telegram.org/' });
});

module.exports = router;
