let config;

if (process.env.NODE_ENV == 'production') {
  config = {
    ASSISTANT_NAME: 'Okos',
    URL: 'https://okos.firefenix.cf' // url to your api. No trailing dash.
  };
} else {
  config = {
    ASSISTANT_NAME: 'Okos',
    URL: 'https://okos.firefenix.cf' // url to your api. No trailing dash.
  };
}

module.exports = config;
