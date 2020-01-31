import { SlackController } from "botkit";
export default (controller: SlackController) => {
    controller.on('bot_channel_join', (bot, message) => {
        bot.reply(message,'I have arrived! I am a friendly helper bot.');
    });

}
