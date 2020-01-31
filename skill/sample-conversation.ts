import { SlackController } from 'botkit';

export default (controller: SlackController) => {
  controller.hears(['color'], ['direct_message', 'direct_mention'], (bot, message) => {
    bot.startConversation(message, (error, convo) => {
      convo.say('This is an example of using convo.ask with a single callback.');
      convo.ask('What is your favorite color?', (response) => {
        convo.say('Cool, I like ' + response.text + ' too!');
        convo.next();
      });
    });
  });

  controller.hears(['question'], ['direct_message', 'direct_mention'], (bot, message) => {
    bot.createConversation(message, (error, convo) => {
      convo.addMessage({ text: 'How wonderful.' }, 'yes_thread');
      convo.addMessage({ text: 'Cheese! It is not for everyone.', action: 'stop' }, 'no_thread');
      convo.addMessage({ text: 'Sorry I did not understand. Say `yes` or `no`', action: 'default' }, 'bad_response');

      convo.ask('Do you like cheese?', [{
        pattern: bot.utterances.yes,
        callback: (response) => {
          convo.gotoThread('yes_thread');
        },
      }, {
        pattern: bot.utterances.no,
        callback: (response) => {
          convo.gotoThread('no_thread');
        },
      }, {
        default: true,
        callback: (response) => {
          convo.gotoThread('bad_response');
        },
      }]);

      convo.activate();

      convo.on('end', () => {
        if (convo.successful()) {
          bot.reply(message, 'Let us eat some!');
        }
      });
    });
  });
};