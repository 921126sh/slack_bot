
// import SlackEventAdapter, { verifyRequestSignature, errorCodes, createEventAdapter } from '@slack/events-api';
// import { WebClient, LogLevel, retryPolicies } from '@slack/web-api';
import { App, LogLevel } from '@slack/bolt';

import dotenv from 'dotenv';
import { loadSkills } from './features';


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
  logLevel: LogLevel.DEBUG
});

loadSkills(app);

// The echo command simply echoes on command
app.command("/clean", async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  say('클린클ㄹ리ㅣ크키닠니닠닌');
  console.log("Entered into the app.command for /clean");
});


app.start(process.env.PORT);

// const options = {
//   logLevel: LogLevel.DEBUG, // 로그레벨
//   retryConfig: retryPolicies.fiveRetriesInFiveMinutes, //재시도(5분에 5번 시도)
//   maxRequestConcurrency: 10, // 동시요청(최대)
// };
// const appId = 'DTK7364EB';
// const web = new WebClient(process.env.SLACK_TOKEN, options);
// // web.oauth.v2.access({
// //   client_id: process.env.CLIENT_ID,
// //   client_secret: process.env.CLIENT_SECRET,
// //   code: 'CODE',
// //   redirect_uri: process.env.REDIRECT_URI,
// // });

// const list = web.conversations.list();
// list.then((data)=> {console.log('ssss', data)})



// // Initialize using signing secret from environment variables
// const slackEvents = createEventAdapter(process.env.CLIENT_SIGNING_SECRET);
// const port: any = process.env.PORT;

// slackEvents.on('message', async (event) => {
//   if (event.text === "sss") {
//     await web.chat.postMessage({ channel: appId, text: 'hi bro' });
//   }
//   console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);

// });


// // Handle errors (see `errorCodes` export)
// slackEvents.on('error', console.error);

// // Start a basic HTTP server
// slackEvents.start(port).then(() => {
//   // Listening on path '/slack/events' by default
// });