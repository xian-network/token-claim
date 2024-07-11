# token-claim

a website for verifying your participation in token sale

# requirement
`pnpm v9.x` | follow instructions [here](https://pnpm.io/installation) to install pnpm

# usage

clone the repo and move into the clone folder then install dependencies

```
pnpm install
```

create `.env` file at the root of the clone folder and add database path
> NOTE: it is advisable to put db file in lib/server of sveltekit project
```
DB_PATH=src/lib/server/the.db
```

use migrate command to create the database

```
pnpm run db:migrate
```

run the app

```
pnpm run dev
```

open the indicated url in your browser
