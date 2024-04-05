import crypto from 'crypto';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandOutput,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

import { env } from '../env';

const randomUUID = crypto.randomUUID();

const queueUrl = process.env.AWS_QUEUEURL;

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: env.AWS_REGION,
});

export function message(value: object) {
  return JSON.stringify(value);
}

type Props = {
  messageBody: string;
  messageGroupId?: string;
  messageDeduplicationId?: string;
};

export async function messageCommand({
  messageBody,
  messageGroupId = '1',
  messageDeduplicationId = randomUUID,
}: Props) {
  const message: SendMessageCommand = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: messageBody,
    MessageGroupId: messageGroupId,
    MessageDeduplicationId: messageDeduplicationId,
  });

  return message;
}

export async function send(sendMessageCommand: SendMessageCommand) {
  try {
    const data: SendMessageCommandOutput = await sqsClient.send(
      sendMessageCommand
    );

    return data.MessageId;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

type readMessageCommandProps = {
  maxNumberOfMessages?: number;
  attributeNames?: any;
};

export async function readMessageCommand({
  maxNumberOfMessages = 10,
  attributeNames = ['All'],
}: readMessageCommandProps) {
  const message: ReceiveMessageCommand = new ReceiveMessageCommand({
    QueueUrl: queueUrl,
    // MaxNumberOfMessages: 10,
    AttributeNames: attributeNames, // Retrieve all message attributes
  });

  return message;
}

export async function read(readMessageCommandProps: any) {
  try {
    const data: ReceiveMessageCommandOutput = await sqsClient.send(
      readMessageCommandProps
    );
    const messages = data.Messages;

    return messages;
  } catch (error) {
    console.error('Erro ao ler as mensagens:', error);
  }
}

type removeProps = {
  receiptHandle?: any;
};

export async function remove({ receiptHandle }: removeProps) {
  // Delete the message after successful processing
  const deleteParams = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle,
  };
  await sqsClient.send(new DeleteMessageCommand(deleteParams));
  console.log(`      - Messagem deletada.`);
}
