# ECS193-Salmon

1. `npm i`
2. `npm run client-install`
3. Add .env file see below for example
4. Create db `npm run db:create`
5. Run migrations `npm run db:migrate`

To Run: `npm run dev` & navigate to localhost:3000  
To open REPL: `npm run repl`

## Example .env

```
DATABASE_URL=postgres://tchen@127.0.0.1:5432/ecs193_database_development
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=YYY
AWS_BUCKET=salmon-health
NOAA_TOKEN=ZZZ
ADMIN_PASSWORD=password
```
