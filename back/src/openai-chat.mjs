import { Configuration, OpenAIApi } from 'openai';

/**
 * @typedef {{prompt: string, completion: string}} Instruction
 * @typedef {Instruction[]} Training
 * @typedef {{role?: string, training: Training}} Context
 * @typedef {{role: 'system'|'user'|'assistant', completion: string}[]} Chat
 * @typedef {{context: Context, prompt: string, completion: string}} Completion
 */

/**
 * @param {string} prompt
 * @param {Context} context
 * @returns {Chat}
 */
const prepareChat = (prompt, context) => [
  ...(typeof context.role === 'string' ? [{ role: 'system', content: context.role }] : []),
  ...context.training.flatMap((entry) => [
    { role: 'user', content: entry.prompt },
    { role: 'assistant', content: entry.completion },
  ]),
  { role: 'user', content: prompt },
];

/**
 * @param {string} prompt
 * @param {Context} context
 * @param {string} model
 * @returns {Promise<Completion>}
 */
export default async (prompt, context, model) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const chat = prepareChat(prompt, context);

  const response = await openai.createChatCompletion({
    model,
    messages: chat,
  });

  if (
    response.data.choices &&
    response.data.choices[0] &&
    (response.data.choices[0].finish_reason === 'stop' || response.data.choices[0].finish_reason === 'length')
  ) {
    return {
      context,
      prompt,
      completion: response.data.choices[0].message.content,
    };
  }

  throw new Error('Chat completion was not properly configured');
};
