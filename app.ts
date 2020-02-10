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
  logLevel: LogLevel.DEBUG
});
loadFeatures(app);


// hi 하면 hello
app.message('hi', async ({ message, say }) => {
  say(`Hello, <@${message.user}>`);
});


app.message('me', async ({ message, context }) => {
  // Call the chat.scheduleMessage method with a token
  const result = await app.client.chat.postMessage({
    // The token you used to initialize your app is stored in the `context` object
    token: context.botToken,
    channel: message.channel,
    text: 'Summer has come and passed'
  });
});

app.action('button-4444', async ({ ack, say }) => {
  ack();
  // Update the message to reflect the action
  console.log('button-4444');
});

// app.command("/clean", async ({ payload, ack, context, say }) => {
//   console.log('command', payload);
//   ack();

//   const result = app.client.views.open({
//     token: context.botToken,
//     // Pass a valid trigger_id within 3 seconds of receiving it
//     trigger_id: payload.trigger_id,
//     // View payload
//     view: {
//       "type": "modal",
//       "title": {
//         "type": "plain_text",
//         "text": "청소를 합니다",
//         "emoji": true
//       },
//       "submit": {
//         "type": "plain_text",
//         "text": "역할배정",
//         "emoji": true
//       },
//       "close": {
//         "type": "plain_text",
//         "text": "취소",
//         "emoji": true
//       },
//       "blocks": [
//         {
//           "type": "section",
//           "fields": [
//             {
//               "type": "mrkdwn",
//               "text": "*청소할 조를 골라주세요~*"
//             }
//           ],
//           "accessory": {
//             "type": "radio_buttons",
//             "initial_option": {
//               "text": {
//                 "type": "plain_text",
//                 "text": "A조"
//               },
//               "value": "A"
//             },
//             "options": [
//               {
//                 "text": {
//                   "type": "plain_text",
//                   "text": "A조"
//                 },
//                 "value": "A"
//               },
//               {
//                 "text": {
//                   "type": "plain_text",
//                   "text": "B조"
//                 },
//                 "value": "B"
//               }
//             ]
//           }
//         },
//         {
//           "type": "divider"
//         },
//         {
//           "type": "section",
//           "block_id": "section678",
//           "text": {
//             "type": "mrkdwn",
//             "text": "청소인원"
//           },
//           "accessory": {
//             "action_id": "clean_members",
//             "type": "multi_users_select",
//             "initial_users": [],
//             "placeholder": {
//               "type": "plain_text",
//               "text": "청소할 사람"
//             }
//           }
//         }
//       ]
//     }
//   });

//   console.log(result);

// });






app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  let ddd: any = {
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ]
  };

  say(ddd);
});

app.action('button_click', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say(`<@${body.user.id}> clicked the button`);
});







app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(JSON.stringify(error));
});

(async () => {
  // Start the app
  await app.start(process.env.PORT);
  console.log('App is running! ⚡️⚡️⚡️');
})();




