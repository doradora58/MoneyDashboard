FROM node:20-alpine AS builder

WORKDIR /app

# monorepo のルートから必要なファイルをコピー
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/money_dashboard ./apps/frontend/money_dashboard

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# アプリをビルド
RUN cd apps/frontend/money_dashboard && pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# 実行に必要な最小限のファイルだけをコピー
COPY --from=builder /app/apps/frontend/money_dashboard/.next/standalone ./
COPY --from=builder /app/apps/frontend/money_dashboard/.next/static ./.next/static
COPY --from=builder /app/apps/frontend/money_dashboard/public ./public

EXPOSE 3000

CMD ["node", "server.js"]