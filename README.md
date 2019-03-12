# joke-tag-api

API for tags management (CRUD)

## Requirements

**Environement variables :**

- `PG_PASSWORD` : Postgres password - default to `"postgres"`
- `PG_DB` : Postgres database - default to `"postgres"`
- `PG_HOST` : Postgres host - default to `"localhost"`
- `PG_USER` : Postgres user - default to `"postgres"`

- `NODE_ENV` : NodeJS environement - default to `"development"`
- `PORT` : TCP port to bind app on - default to `3000`

**Softwares :**

- Yarn
- Node
- Postgres server

**Setup :**

- Postgres database need to be created beforehand/manually

## Clone

```bash
git clone https://github.com/SalathielGenese/joke-tag-api
```

## Install

```bash
cd joke-tag-api
```

```bash
yarn install
```

## Run app

```bash
yarn start
```

- Visit the Swagger API at `${HOST}:${PORT}/docs`
- Check the healthy state of the app at `${HOST}:${PORT}/PING`

## Run tests

```bash
yarn test
```

## Run dev

Restart test and app on change. _(App won't be started when tests fail !)_

```bash
yarn dev
```

Restart test on change

```bash
yarn dev:test
```

Restart app on change

```bash
yarn dev:start
```

## License

MIT License

Copyright (c) 2019 Salathiel Genèse Yimga Yimga
