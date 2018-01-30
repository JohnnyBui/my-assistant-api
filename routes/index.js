const express = require('express');
const router = express.Router();

const config = require('../config');

router.get('/', function(req, res) {
  res.render('index', { title: `${config.ASSISTANT_NAME} - Johnny Assistant`, assistantName: config.ASSISTANT_NAME });
});

module.exports = router;
