# Okos Assistant API
## API of Okos the assistant
* NodeJS
* ExpressJS
* Telegram Bot API

### Demo
[@OkosBot](https://t.me/OkosBot)

API Server: https://okos.phucbui.me

### What can Okos do?
For the moment, Okos can send notifications to your Telegram. Response to general chat/commands and search GIFs.

### Run
`npm start` for local serving

or

`npm install -g nodemon`

then

`npm run dev` for development serving

App will be running at `http://localhost:3000`

### External Service API Keys
- For local serving and testing, create `.env` file in project root folder with content (environment variables):
```
NTBA_FIX_319=1
TELEGRAM_BOT_API_KEY=Your_Telegram_API_Key
GIPHY_API_KEY=Your_Giphy_API_Key
```

- If you deploy this project on live server, add those environment variables to your server config.

### Modify to use Okos as your personal assistant
- First, fork this repo.

- You can chat with [@BotFather](https://t.me/BotFather) to create new bot then set your bot's API Key to environment variable as instrunction above.

#### 1. Notification Service
For your own notification services, implement them in `routes/notification.js`. Change `CHAT_ID` to the `chat_id` bewteen you and your bot. Then modify or implement HTTP webhooks to match your needs.
To get `chat_id`, chat with your bot and then make a HTTP request:
```bash
curl https://api.telegram.org/bot460111688:AAE93QlqcYNSRK1FO1UwL1Ytdk3PxPFmo2U/getUpdates
```
You will see your `chat_id` you need.
If you ran this project before making this request or you manually set webhook for you bot. You'll have to make this request before the last one:
```bash
curl https://api.telegram.org/bot460111688:AAE93QlqcYNSRK1FO1UwL1Ytdk3PxPFmo2U/deleteWebhook
```

#### 2. Chat & Command Responses
For general chat reply and response to commands, implement in `routes/chat.js`, inside this block:
```javascript
telegramBot.on('message', msg => {
...
}
```
`msg` object contains important data from message sent to your bot. You can switch cases to response base on what message text your bot got. It's in `msg.text`. Example for greetings message:
```javascript
if (msg.text === '/start' || msg.text.trim().toLowerCase() === 'hi' || msg.text.trim().toLowerCase() === 'hello') {
    telegramBot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`);
}
```
Use `telegramBot.sendMessage` with `msg.chat.id` and message text to response to sender.
 
For more information about `message` object, modifying `inline_keyboard`, `callback_query` and everything else, checkout https://core.telegram.org/bots/api
 
### Contribution
Please help me to develop more services for this API. Any helpful service ideas are welcome. If you think we should change improve the structure, please let me know.
