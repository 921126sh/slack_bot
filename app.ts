import { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } from "botbuilder-adapter-slack";
import { Botkit } from "botkit";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}

// 몽고디비 쓸려면...
// if (process.env.MONGO_URI) {
//   storage = mongoStorage = new MongoDbStorage({
//       url : process.env.MONGO_URI,
//   });
// }

const adapter: SlackAdapter = new SlackAdapter({
  // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
  enable_incomplete: false,

  // parameters used to secure webhook endpoint
  verificationToken: process.env.VERIFICATION_TOKEN,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,

  // auth token for a single-team app
  botToken: process.env.BOT_TOKEN,

  // credentials used to set up oauth for multi-team apps
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ['commands', 'bot'],
  redirectUri: process.env.REDIRECT_URI,
  // functions required for retrieving team-specific info
  // for use in multi-team apps
  getTokenForTeam: getTokenForTeam,
  getBotUserByTeam: getBotUserByTeam,
});

// Use SlackEventMiddleware to emit events that match their original Slack event types.
adapter.use(new SlackEventMiddleware());

// Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware());

const controller = new Botkit({
  webhook_uri: '/slack/receive',
  adapter: adapter,
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/features',['.ts']);

  /* catch-all that uses the CMS to trigger dialogs */
  if (controller.plugins.cms) {
    controller.on('message,direct_message', async (bot, message) => {
      let results = false;
      results = await controller.plugins.cms.testTrigger(bot, message);

      if (results !== false) {
        // do not continue middleware!
        return false;
      }
    });
  }

});


controller.webserver.get('/', (req: any, res: any) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});

controller.webserver.get('/login', (req: any, res: any) => {
  // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
  res.redirect(controller.adapter.getInstallLink());
});

controller.webserver.get('/oauth', async (req: any, res: any) => {
  try {
      const results = await controller.adapter.validateOauthCode(req.query.code);

      console.log('FULL OAUTH DETAILS', results);

      // Store token by team in bot state.
      tokenCache[results.team_id] = results.bot.bot_access_token;

      // Capture team to bot id
      userCache[results.team_id] =  results.bot.bot_user_id;

      res.json('Success!');

  } catch (err) {
      console.error('OAUTH ERROR:', err);
      res.status(401);
      res.send(err.message);
  }
});

let tokenCache: any = {};
let userCache: any = {};

async function getTokenForTeam(teamId: any): Promise<any> {
  if (tokenCache[teamId]) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(tokenCache[teamId]);
      }, 150);
    });
  } else {
    console.error('Team not found in tokenCache: ', teamId);
  }
}

async function getBotUserByTeam(teamId: any): Promise<any> {
  if (userCache[teamId]) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(userCache[teamId]);
      }, 150);
    });
  } else {
    console.error('Team not found in userCache: ', teamId);
  }
}









