import fs from 'fs';

export const loadSkills = (controller: any) => {
  fs.readdirSync(__dirname).forEach((filename) => {
    if (filename !== 'index.ts' && !filename.includes('.disabled.')) {
      require('./' + filename).default(controller);
    }
  });
};