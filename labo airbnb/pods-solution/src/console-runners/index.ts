import prompts from 'prompts';
import { ENV } from '#core/constants/index.js';
import { dbServer } from '#core/servers/index.js';
import { getAccomodations } from './queries.runner.js';

const { connectionURL } = await prompts({
  name: 'connectionURL',
  initial: ENV.MONGODB_URL,
  type: 'text',
  message: 'Connection URL (Press enter to use default): ',
});
console.log('Connecting to database...');
await dbServer.connect(connectionURL);

let exit = false;
while (!exit) {
  
  const { consoleRunner } = await prompts({
    name: 'consoleRunner',
    type: 'select',
    message: 'Which console-runner do you want to run?',
    choices: ['create admin', 'queries', 'seed-data', 'exit'].map((option) => ({
      title: option,
      value: option,
    })),
  });
  
  const { run } = await import(`./${consoleRunner}.runner.js`);
  // if (consoleRunner !== 'exit') {
  // }
  if (consoleRunner === 'queries') {
    const { queries } = await prompts({
      name: 'queries',
      type: 'select',
      message: 'Which querie do you want to run?',
      choices: ['getAccomodations', 'exit'].map((option) => ({
        title: option,
        value: option,
      })),
    });
  } else {
    exit = true;
    await dbServer.disconnect();
  }
}
