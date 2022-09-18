# Installation

Install Nest.js globally and prisma (if using yarn, change to `--dev` instead)

```
npm install install -g @nestjs/cli
cd recipe-app
npm install prisma --save-dev
```

invoke Prisma CLI locally

```
npx prisma
```

install Prisma Client locally

```
npm install @prisma/client
```

install Apollo for Express

```
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

install ts-morph package locally for Graphql schema first approach

```
npm install --save-dev ts-morph
```

# Dev with Docker

Test without authentication

```
npm run start:dev
```

# Prisma

After every change to the Prisma models and you'd like to make official change to db, you need to update the Prisma Client locally

```
npx prisma migrate
```

If you'd like to prototype the schema, then use the command below locally

```
npx prisma db push
```

# Graphql

Generate Graphql Typescript on demand

```
npx ts-node ./src/generate-typings
```
