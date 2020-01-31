import { SlackController } from 'botkit';
import fs from 'fs';

export const loadSkills = (controller: SlackController) => {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename !== 'index.ts' && !filename.includes('.disabled.')) {
      require('./' + filename).default(controller);
    }
  });
};