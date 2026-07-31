# Money Dashboard

## Run with Docker Compose

```bash
docker compose up -d --build
```

The stack starts:
- PostgreSQL on port 5432
- the Next.js application on port 3000
- Umami on port 3002
- Grafana on port 3001
- Kibana on port 5601
- Elasticsearch on ports 9200 and 9300

### Environment variables

You can override defaults with a local `.env` file or shell variables.

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=money_dashboard
DATABASE_URL=postgresql://postgres:postgres@db:5432/money_dashboard?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me
UMAMI_APP_SECRET=change-me
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=admin
```

### Access URLs

- App: http://localhost:3000
- Umami: http://localhost:3002
- Grafana: http://localhost:3001
- Kibana: http://localhost:5601

### Stop the stack

```bash
docker compose down
```
