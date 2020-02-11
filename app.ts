import { App, LogLevel } from '@slack/bolt';

import dotenv from 'dotenv';
import { loadFeatures } from './features';

// 설정 로드 및 체크
dotenv.config();
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN
  || !process.env.SLACK_TOKEN || !process.env.CLIENT_SIGNING_SECRET) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN, SLACK_BOT_TOKEN and PORT in environment');
  process.exit(1);
}

const app: App = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.CLIENT_SIGNING_SECRET,
  logLevel: LogLevel.ERROR
});
// 기능로드
loadFeatures(app);

app.error((error) => {
  console.error(JSON.stringify(error));
});

(async () => {
  // Start the app
  await app.start(process.env.PORT);
  console.log('App is running! ⚡️⚡️⚡️');
})();

// ==========================================================================================

app.message('me', async ({ message, context }) => {
  // Call the chat.scheduleMessage method with a token
  const result = await app.client.chat.postMessage({
    // The token you used to initialize your app is stored in the `context` object
    token: context.botToken,
    channel: message.channel,
    text: 'Summer has come and passed'
  });
});