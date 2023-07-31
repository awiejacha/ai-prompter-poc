import fastify from 'fastify';
import cors from '@fastify/cors';
import { S } from 'fluent-json-schema';
import completion from '../completion.mjs';
import { readContext, saveContext, trainContext } from '../context.mjs';

const PORT = 3001;

const server = fastify();
server.register(cors, {});

const contextResponseSchema = S.object()
  .prop('role', S.string())
  .prop('training', S.array().items(S.object().prop('prompt', S.string()).prop('completion', S.string())))
  .valueOf();
const trainingBodySchema = S.object()
  .prop(
    'training',
    S.array()
      .items(S.object().prop('prompt', S.string().required()).prop('completion', S.string().required()))
      .required(),
  )
  .prop('role', S.string())
  .valueOf();
const completionQuerySchema = S.object().prop('prompt', S.string().required()).prop('context', S.string()).valueOf();
const completionResponseSchema = S.object()
  .prop(
    'context',
    S.object()
      .prop('role', S.string())
      .prop('training', S.array().items(S.object().prop('prompt', S.string()).prop('completion', S.string()))),
  )
  .prop('prompt', S.string())
  .prop('completion', S.string())
  .valueOf();

server
  .get(
    '/context/:contextName',
    {
      schema: {
        response: { 200: contextResponseSchema },
      },
    },
    async (request, reply) => {
      const { contextName } = request.params;
      console.log('GET /context requested');
      console.log('Context name:', `"${contextName}"`);
      try {
        const context = await readContext(contextName);
        reply.send(context);
      } catch (e) {
        reply.code(404).send({});
      }
    },
  )
  .post(
    '/train/:contextName',
    {
      schema: {
        body: trainingBodySchema,
        response: 201,
      },
    },
    async (request, reply) => {
      const { contextName } = request.params;
      const { training, role } = request.body;
      console.log('POST /train requested');
      console.log('Context name:', `"${contextName}"`);
      const trainedContext = await trainContext(contextName, training, role);
      await saveContext(contextName, trainedContext);
      reply.code(201).send('');
    },
  )
  .get(
    '/completion/:contextName',
    {
      schema: {
        querystring: completionQuerySchema,
        response: {
          200: completionResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { contextName } = request.params;
      const { prompt } = request.query;
      console.log('GET /completion requested');
      console.log('Prompt:', `"${prompt}"`);
      console.log('Context name:', `"${contextName}"`);

      const response = await completion(prompt, contextName);
      console.log('Completion:', response.completion);

      reply.send(response);
    },
  );

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

void start();
