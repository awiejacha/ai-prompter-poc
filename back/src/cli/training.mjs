import readlineSync from 'readline-sync';
import { readRole, saveContext, trainContext } from '../context.mjs';
import completion from '../completion.mjs';
import 'colors';

/**
 * @typedef {{prompt: string, completion: string}} Instruction
 * @typedef {Instruction[]} Training
 * @typedef {{role?: string, training: Training}} Context
 * @typedef {{role: 'system'|'user'|'assistant', completion: string}[]} Chat
 */

/**
 * @param {string} typePrompt
 * @returns {string}
 */
const type = (typePrompt) => {
  let typed;
  let count = 0;
  while (!typed) {
    typed = readlineSync.question(
      `${count ? 'You have not typed anything, I repeat: '.red : ''}${typePrompt.green}\n> `,
    );
    count++;
  }
  return typed.toString();
};

/**
 * @param {string[]} choices
 * @param {string} choicePrompt
 * @param {string} typePrompt
 * @returns {string}
 */
const chooseOrType = (choices, choicePrompt, typePrompt) => {
  const index = readlineSync.keyInSelect(choices, choicePrompt.green);
  return index !== -1 ? choices[index] : type(typePrompt);
};

/**
 * @returns {string}
 */
const prepareContextName = () => chooseOrType(['demo-training'], 'Pick context name', 'Type own context name');

/**
 * @param {string} name
 * @returns {?string}
 */
const prepareRoleDescription = (name) => {
  const savedRole = readRole(name);
  return savedRole
    ? savedRole
    : readlineSync.keyInYN(`Do you want to describe assistant's role?`.green)
    ? chooseOrType(
        [
          'You are a newsletter content creator, you are writing call to action slogans encouraging to buy home and living products',
        ],
        `Pick assistant's role description`,
        `Type assistant's role description of your own`,
      )
    : undefined;
};

/**
 * @type {Map<string, string>}
 */
const trainingChoices = new Map();
trainingChoices.set(
  'Write enthusiastic call to action slogan, encouraging to buy Corduroy corner sofa Melva',
  "Experience ultimate comfort and style with Corduroy corner sofa Melva, exclusively from our collection! Don't miss out on the chance to transform your living space into a cozy paradise - get your hands on this must-have piece today!",
);
trainingChoices.set(
  'Write newsletter call to action slogan using formal language, encouraging to buy Lesley coffee table',
  'Elevate your living room with the timeless elegance of Lesley coffee table, available exclusively from our collection. Ideal for both formal and casual settings, this piece is a must-have addition to your home décor. Act now and acquire the sophistication and functionality that Lesley coffee table brings to your living space',
);
trainingChoices.set(
  'Write call to action slogan to buy spring sale in the spring mood',
  "Spring has sprung and so has our incredible sale! Don't miss out on the chance to refresh and revitalize your home with our collection's unbeatable spring deals. From stunning furnishings to chic décor, our collection has everything you need to transform your space into a spring oasis. Shop now and get into the spring mood - while supplies last!",
);
trainingChoices.set(
  'Write newsletter call to action slogan using up to 10 words, addressed to young people, encouraging to buy Lennon Sofa from our collection',
  'Stay cool and buy Lennon Sofa from our collection!',
);

/**
 * @returns {string}
 */
const preparePrompt = () =>
  chooseOrType(
    Array.from(trainingChoices.keys()),
    'Pick prompt for the assistant',
    'Type own prompt for the assistant',
  );

/**
 * @param {string} name
 * @param {string} role
 * @returns {Promise<Training>}
 */
const prepareTraining = async (name, role) => {
  const training = [];
  while (!training.length || readlineSync.keyInYN('Do you want to add another training instruction?'.green)) {
    const prompt = preparePrompt();
    console.log('Chosen prompt:', prompt.cyan);
    let completionText;

    if (
      trainingChoices.has(prompt) &&
      readlineSync.keyInYN(
        `Since you have picked prompt from choices, there is ${
          trainingChoices.get(prompt).cyan
        } completion prepared for it already. ${'Do you want to use it?'.green}`,
      )
    ) {
      completionText = trainingChoices.get(prompt);
    } else {
      let aiPromptLoopRuns = 0;

      while (
        readlineSync.keyInYN(`Do you want to retrieve completion from AI${aiPromptLoopRuns ? ' again' : ''}?`.green)
      ) {
        aiPromptLoopRuns++;
        completionText = await completion(prompt, name, training, role);

        if (
          readlineSync.keyInYN(
            `${'Are you satisfied with the AI completion response:'.green}\n${completionText.cyan}\n${'?'.green}`,
          )
        ) {
          break;
        }
        completion = undefined;
      }
      if (!completion) {
        completion = type(`Type assistant's completion of your own`);
      }
    }
    training.push({ prompt, completion });
  }

  return training;
};

(async () => {
  const name = prepareContextName();
  console.log('Chosen context name:'.white, name.cyan);
  const role = prepareRoleDescription(name);
  console.log('Chosen role description:', role ? role.cyan : 'N/A'.cyan);
  const training = await prepareTraining(name, role);
  const context = trainContext(name, training, role);
  console.log('Trained context:', context);
  if (readlineSync.keyInYN('Do you want to save context?')) {
    saveContext(name, context);
  }
})();
