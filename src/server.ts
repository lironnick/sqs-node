import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { errorHandler } from '@/error-handler';

import { registerSend } from '@/routes/send';
import { registerRead } from '@/routes/read';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(registerSend);
app.register(registerRead);

app.setErrorHandler(errorHandler);

const PORT = Number(process.env.PORT) || 3333;

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running PORT :${PORT}!`);
});

// id,item, numped
