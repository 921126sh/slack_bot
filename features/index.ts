import fs from 'fs';
import { App } from '@slack/bolt';

export const loadSkills = (app: App) => {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename !== 'index.ts' && !filename.includes('.disabled.')) {
      require('./' + filename).default(app);
    }
  });
}; 