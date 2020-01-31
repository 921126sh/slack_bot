import Botkit, { SlackController, SlackBot } from 'botkit';
import dotenv from 'dotenv';
import { loadSkills } from './skill';
dotenv.config();


if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}

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

let controller: SlackController = Botkit.slackbot(config).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `${process.env.HOST_SERVER}/oauth`,
  scopes: ['commands', 'bot'],
});

// const controller = Botkit.slackbot({});
loadSkills(controller);
controller.startTicking();

const bot = controller.spawn({
  token: process.env.SLACK_BOT_TOKEN || '',
});

bot.startRTM((error: any) => {
  if (error) {
    console.log(error, '구동에 실패했습니다.');
  } else {
    // bot.say({ text: '봇이 배포되었습니다! 😄', channel: 'slack-dev' });
  }
});

/**
 * Setup server
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



// Slash-command definition
controller.on('slash_command', function (bot: SlackBot, message: any) {
  switch (message.command) {
    case "/foodme": //handle the `/foodme` slash command. We might have others assigned to this app too!
      if (message.token !== process.env.VERIFICATION_TOKEN) return; //just ignore it.

      if (message.text === "") {
        let foodmoji = [":coffee:", ":tea:", ":sake:", ":baby_bottle:",
          ":beer:", ":beers:", ":cocktail:", ":tropical_drink:",
          ":wine_glass:", ":fork_and_knife:", ":pizza:", ":hamburger:",
          ":fries:", ":poultry_leg:", ":meat_on_bone:", ":spaghetti:",
          ":curry:", ":fried_shrimp:", ":bento:", ":sushi:", ":fish_cake:",
          ":rice_ball:", ":rice_cracker:", ":rice:", ":ramen:", ":stew:",
          ":oden:", ":dango:", ":egg:", ":bread:", ":doughnut:", ":custard:",
          ":icecream:", ":ice_cream:", ":shaved_ice:", ":birthday:",
          ":cake:", ":cookie:", ":chocolate_bar:", ":candy:", ":lollipop:",
          ":honey_pot:", ":apple:", ":green_apple:", ":tangerine:",
          ":lemon:", ":cherries:", ":grapes:", ":watermelon:",
          ":strawberry:", ":peach:", ":melon:", ":banana:", ":pear:",
          ":pineapple:", ":sweet_potato:", ":eggplant:", ":tomato:",
          ":corn:"
        ];
        let food1 = foodmoji[Math.floor(Math.random() * foodmoji.length)];
        let food2 = foodmoji[Math.floor(Math.random() * foodmoji.length)];
        let food3 = foodmoji[Math.floor(Math.random() * foodmoji.length)];

        bot.replyPublic(message, "How about having " + food1 + " + " + food2 + " + " + food3 + " tonight?");
      }

      // /foodme help displays this message
      if (message.text === "help") {
        bot.replyPrivate(message, "Foodme is a Slack command" +
          " that helps you find something to eat. Just type `/foodme`" +
          " to start.")
      }

      break;
    default:
      bot.replyPublic(message, "I'm sorry " + message.user +
        ", I'm afraid I can't do that. :robot_face:");
  }
});