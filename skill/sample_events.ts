import { SlackController } from "botkit";
export default (controller: SlackController) => {

    controller.on('user_channel_join,user_group_join', function(bot, message) {

        bot.reply(message, 'Welcome, <@' + message.user + '>');

    });

}
