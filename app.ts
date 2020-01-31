import Botkit, { SlackController, SlackBot } from 'botkit';
import dotenv from 'dotenv';
import { loadSkills } from './skill';

/*****************************************슬랙 봇 기동순서******************************************************
 * 
 * 
 * 1. env파일을 메모리에 적재한다.
 * 2. 봇과 슬랙설정(토큰, id, 등등...)이 일치하는지 확인한다.
 * 3. 몽고DB 혹은 json을 설정한다.
 *  * 반드시 한 저장소에는 접속된 채널 정보가 필수로 필요하기 때문이다.
 * 4. 설정정보를 통해 슬랙 봇 모듈을 생성한다.
 * 5. 슬랙 봇 모듈에 사용 가능한 기능을 모듈화하여 저장한다.
 * 6. [봇]을 실행한다.
 * 7. [웹 서버]를 실행한다.
 **********************************************************************************************************/

 /*****************************************INFO************************************************************
 * 
 * [봇]
 *  - 슬랙 workspace의 토큰값을 통하여 stream형태로 연결된다.
 * 
 * [웹 서버]
 *  - 슬래쉬 커맨드를 사용하기 위해서 반드시 필요하다.
 *  - 슬랙에서 슬래쉬 커맨드를 등록 후 http://[도메인]/login 을 통해 최초 채널 정보 및 사용자 설정을 생성해야한다.
 **********************************************************************************************************/


// config를 동기화 한다.
dotenv.config();

// slack정보를 체크한다.
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}


// 설정파일을 설정한다.
let config = {}
if (process.env.MONGOLAB_URI) {
  let BotkitStorage = require('botkit-storage-mongo');
  config = {
    storage: BotkitStorage({
      mongoUri: process.env.MONGOLAB_URI
    }),
  };
} else {
  config = {
    debug: true,
    json_file_store: './db_slackbutton_slash_command/',
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
  };
}

// 슬랙봇 모듈을 생성한다.
let controller: SlackController = Botkit.slackbot(config).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `${process.env.HOST_SERVER}/oauth`,
  scopes: ['commands', 'bot'],
});

// 기술목록을 생성한다.
loadSkills(controller);
controller.startTicking();

// 봇을 생성한다.
const bot: SlackBot = controller.spawn({
  token: process.env.SLACK_BOT_TOKEN || '',
});

// 봇을 시작한다.
bot.startRTM((error: any) => {
  if (error) {
    console.log(error, '구동에 실패했습니다.');
  } else {
    // bot.say({ text: '봇이 배포되었습니다! 😄', channel: 'slack-dev' });
  }
});

/**
 * 웹서버를 시작한다.
 */
controller.setupWebserver(process.env.PORT, function (err: any, webserver: any) {
  controller.createWebhookEndpoints(webserver);

  controller.createOauthEndpoints(webserver, function (err: any, req: any, res: any) {
    if (err) {
      res.status(500).send('OAUTH ENDPOINT ERROR ================> : ' + err);
    } else {
      res.send('Success!');
    }
  });
});

controller.hears('hi', 'direct_message', (bot: SlackBot, message: any) => {
  bot.reply(message, 'Hello.');
});

