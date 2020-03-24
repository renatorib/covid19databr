### API Development

```
cd api
yarn install
yarn dev
```

#### DB

Execute seed:

```
yarn knex seed:run <name>
```

Create a new migration:

```
yarn migration <name>
```

Run all migrations that have not yet been run:

```
yarn migrate:up
```

Run next migration:

```
yarn migrate:up
```

Rollback last migration:

```
yarn migrate:down
```
