let config;

if (process.env.NODE_ENV == 'production') {
  config = {
    ASSISTANT_NAME: 'Okos'
  };
} else {
  config = {
    ASSISTANT_NAME: 'Okos'
  };
}

module.exports = config;