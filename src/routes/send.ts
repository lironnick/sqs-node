import { FastifyInstance } from 'fastify';
import * as AWS from '@/lib/sqs';

import z from 'zod';

export async function registerSend(app: FastifyInstance) {
  app.post('/send', async (request, reply) => {
    const bodySchema = z.object({
      id: z.string().min(1),
      item: z.string().min(3),
      numped: z.string().min(3),
    });

    const boby = bodySchema.parse(request.body);

    const message = AWS.message(boby);

    const sendMessageCommand = await AWS.messageCommand({
      messageBody: message,
      // messageGroupId: '2',
      // messageDeduplicationId: messageDeduplicationId,
    });

    const messageId = await AWS.send(sendMessageCommand);

    return reply
      .status(201)
      .send({ message: 'Mensagem enviada com sucesso:', messageId });
  });
}
