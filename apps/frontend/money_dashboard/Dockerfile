FROM node:20-alpine AS builder

WORKDIR /app

# monorepo のルートから必要なファイルをコピー
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/money_dashboard ./apps/frontend/money_dashboard
COPY prisma ./prisma

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Prisma Client を生成
RUN cd apps/frontend/money_dashboard && pnpm prisma generate

RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# 実行に必要な最小限のファイルだけをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV HOSTNAME "0.0.0.0"
ENV PORT 3000
CMD ["node", "server.js"]