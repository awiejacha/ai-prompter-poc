import * as fs from 'fs';

/**
 * @typedef {{prompt: string, completion: string}} Instruction
 * @typedef {Instruction[]} Training
 * @typedef {{role?: string, training: Training}} Context
 * @typedef {{role: 'system'|'user'|'assistant', completion: string}[]} Chat
 */

/**
 * @param {string} name
 * @param {string} model
 * @returns {Context}
 */
export const readContext = (name, model = 'gpt-3.5-turbo') =>
  JSON.parse(fs.readFileSync(`contexts/${model}.${name}.json`).toString('utf-8'));

/**
 * @param {string} name
 * @param {Context} context
 * @param {string} model
 */
export const saveContext = (name, context, model = 'gpt-3.5-turbo') =>
  fs.writeFileSync(`contexts/${model}.${name}.json`, Buffer.from(JSON.stringify(context, null, 2)));

/**
 * @param {string} name
 * @param {string} model
 * @returns {?string}
 */
export const readRole = (name, model = 'gpt-3.5-turbo') => {
  try {
    const context = readContext(name, model);
    return context.role;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return undefined;
    }
    throw e;
  }
};

/**
 * @param {...Training} trainings
 * @returns {Training}
 */
const mergeTrainings = (...trainings) => {
  const trainingMap = new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const instruction of trainings.flatMap((training) => training)) {
    if (trainingMap.has(instruction.prompt)) {
      trainingMap.delete(instruction.prompt);
    }
    trainingMap.set(instruction.prompt, instruction.completion);
  }

  return Array.from(trainingMap, (entry) => ({ prompt: entry[0], completion: entry[1] }));
};

/**
 * @param {string} name
 * @param {Training} training
 * @param {string} role
 * @param {string} model
 * @returns {Context}
 */
export const trainContext = (name = undefined, training = [], role = undefined, model = 'gpt-3.5-turbo') => {
  const context = { role, training };

  if (typeof name === 'undefined') {
    return context;
  }

  try {
    const existingContext = readContext(name, model);
    if (typeof context.role === 'undefined' && existingContext.role) {
      context.role = existingContext.role;
    }
    if (context.role !== existingContext.role) {
      throw new Error('Existing and training context roles do not match');
    }
    context.training = mergeTrainings(existingContext.training, training);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }

  return context;
};
