# ECS193-Salmon

1. `npm i`
2. `npm run client-install`
3. Add .env file see below for example
4. Create db `npm run db:create`
5. Run migrations `npm run db:migrate`

To Run: `npm run dev` & navigate to localhost:3000

## Example .env

```
DB_USERNAME=jacobbev
DB_PASSWORD=null
DB_NAME=ecs193_database_development
DB_HOSTNAME=127.0.0.1
PGCONNECTSTRING=postgres://jacobbev@127.0.0.1:5432/ecs193_database_development
```
