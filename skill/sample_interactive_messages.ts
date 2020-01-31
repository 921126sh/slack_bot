import { SlackController, Message, SlackMessage } from "botkit";

export default (controller: SlackController) => {
    controller.middleware.receive.use((bot, message: any, next) => {
      if (message.type == 'interactive_message_callback') {
        if (message.actions[0].name.match(/^say$/)) {
            var reply = message.original_message;

            for (var a = 0; a < reply.attachments.length; a++) {
                reply.attachments[a].actions = null;
            }

            var person = '<@' + message.user + '>';
            if (message.channel[0] == 'D') {
                person = 'You';
            }

            reply.attachments.push(
                {
                    text: person + ' said, ' + message.actions[0].value,
                }
            );

            bot.replyInteractive(message, reply);
  
         }
      }
      
      next();    
      
    });

}
