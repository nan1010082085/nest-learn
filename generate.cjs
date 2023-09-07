/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');

const name = process.argv[2];

exec(
  ` npm run typeorm migration:generate -p ./src/migrations/${name}`,
  // ` npm run typeorm migration:generate -p ./${name}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);
