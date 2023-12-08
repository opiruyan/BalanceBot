# BalanceBot

## Technical
The bot is build with framework for telegram bots [grammY](https://grammy.dev) and deployed to [Fly.io](https://fly.io/)

### Environment
To run the bot you need env BOT_TOKEN defined.

It can be set either in your local `.env` file or fetched from the [dotenv-vault](https://www.dotenv.org/docs/quickstart).

Workflow of working with dotenv-valut is:
1. you run an app with set env var DOTENV_KEY
I.e. for bot that would we runing in cli:
```
DOTENV_KEY='<environment_key>' ts-node ./src/Bot.ts
```
2. DOTENV_KEY defined which environment will be loaded
3. you can see the actual env vars either in your .env files or by opening the vault with `npx dotenv-vault keys {environment_name}`. So for production it would be
```
npx dotenv-vault keys production
```

## Deploy
The bot deployed with GitHub actions.

Basics of using it for Fly.io are here - https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/

To access `BOT_TOKEN` stored in dotenv-vault pipeline need a `DOTENV_KEY`.
 
`DOTENV_KEY` is stored as a github [environment secret](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment). Therefore to make it work
1. `DOTENV_KEY` is included to the workflow job as `jobs.<job_id>.environment` (see https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#using-an-environment)
2. `DOTENV_KEY` value is saved as Fly `secret` which will be used in a machinve running the app.

### References
https://www.dotenv.org/docs/languages/nodejs/github-actions - CI/CD in Node.js with GitHub Actions
https://fly.io/docs/reference/secrets/ - Fly.io secrets
https://grammy.dev/hosting/fly - host grammY bot on Fly.io