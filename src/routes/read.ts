import { FastifyInstance } from 'fastify';
import { QueryTypes } from 'sequelize';
import * as AWS from '@/lib/sqs';

import mysql from '@/lib/mysql';
import sqlserver from '@/lib/sqlserver';

import { BadRequest } from './_errors/bad-request';

export async function registerRead(app: FastifyInstance) {
  app.get('/read', async (request, reply) => {
    const message = await AWS.readMessageCommand({});

    const response = await AWS.read(message);

    if (!response || response.length <= 0) {
      throw new BadRequest('Nenhuma mensagem recebida neste momento.');
    }

    for (const message of response) {
      if (!message.Body) {
        throw new BadRequest('Nenhuma mensagem recebida neste momento.');
      }
      const { id, item, numped } = JSON.parse(message.Body);

      const result = await mysql.query(
        /*sql*/ `select * from user where id = ? limit 1`,
        { replacements: [1], type: QueryTypes.SELECT }
      );

      // const result2 = await sqlserver.query(
      //   /*sql*/ `select top 1 * from ITEMCLICAD WHERE item = ?`,
      //   { replacements: ['31168281'], type: QueryTypes.SELECT }
      // );

      console.log('[CONSULTA] => ', result);
      // console.log('[CONSULTA DB MU] => ', result2);

      await AWS.remove({ receiptHandle: message.ReceiptHandle });

      return reply.status(200).send({
        id: message.MessageId,
        body: JSON.parse(message.Body),
      });
    }
  });
}
