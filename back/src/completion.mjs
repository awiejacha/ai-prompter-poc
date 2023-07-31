import { trainContext } from './context.mjs';
import openaiChat from './openai-chat.mjs';

/**
 * @typedef {{prompt: string, completion: string}} Instruction
 * @typedef {Instruction[]} Training
 * @typedef {{role?: string, training: Training}} Context
 * @typedef {{context: Context, prompt: string, completion: string}} Completion
 */

/**
 * @param {string} prompt
 * @param {string} name
 * @param {Training} training
 * @param {string} role
 * @param {string} model
 * @returns {Context}
 */
const prepareContext = (prompt, name = undefined, training = [], role, model) => {
  const trainedContext = trainContext(name, training, role, model);
  return {
    role: trainedContext.role,
    training: trainedContext.training.filter((instruction) => instruction.prompt !== prompt),
  };
};

/**
 * @param {string} prompt
 * @param {string} contextName
 * @param {Training} training
 * @param {string} role
 * @param {string} model
 * @returns {Promise<Completion>}
 */
export default async (prompt, contextName = '', training = [], role = undefined, model = 'gpt-3.5-turbo') => {
  const context = prepareContext(prompt, contextName, training, role, model);
  return openaiChat(prompt, context, model);
};
