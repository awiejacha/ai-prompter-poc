import readlineSync from 'readline-sync';
import completion from '../completion.mjs';
import 'colors';

(async () => {
  let name;

  if (readlineSync.keyInYN('Do you want to use named context?'.green)) {
    name = readlineSync.question(`${'Enter context name'.green}> `).toString();
  }
  const prompt = readlineSync.question(`${'Write prompt in natural language'.green}> `).toString();
  const completionText = await completion(prompt, name);
  console.log('Received completion:', completionText.cyan);
})();
