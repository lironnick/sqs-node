# AWS SQS NODEjs

Serviço para enviar, ler e deletar da fila do `SQS`

## O que vamos user

- [Nodejs](https://nodejs.org/en)
- [AWS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sqs/)
- [fastify](https://fastify.dev/)
- [zod](https://zod.dev/)
- [typescript](https://www.typescriptlang.org/)
- [tsx](https://www.npmjs.com/package/tsx)
- [tsup](https://www.npmjs.com/package/tsup)
- [sequelize](https://sequelize.org/docs/v6/getting-started/)

### Iniciar

Ambiente producao

```bash
yarn start
```

Ambiente dev

```bash
yarn dev
```

Ambiente build

```bash
yarn build
```

### AWS

**IMPORTANTE**: a lib `aws-sdk` é uma versão (v2) do `javascript` mais antiga, a `AWS` esta atualizando para nova lib que será `@aws-sdk/client-sqs`

```bash
yarn add @aws-sdk/client-sqs
```
