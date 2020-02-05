import fs from 'fs';
import { App } from '@slack/bolt';

export const loadFeatures = (app: App) => {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename !== 'index.ts' && !filename.includes('.disabled.') && !filename.endsWith(".json")) {
      require('./' + filename).default(app);
    }
  });
}; 