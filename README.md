# Money Dashboard

## Run with Docker Compose

```bash
docker compose up -d --build
```

The stack starts:
- a PostgreSQL database on port 5432
- the Next.js application on port 3000

### Environment variables

You can override defaults with a local `.env` file or shell variables.

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=money_dashboard
DATABASE_URL=postgresql://postgres:postgres@db:5432/money_dashboard?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me
```

### Stop the stack

```bash
docker compose down
```
