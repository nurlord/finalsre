# -------- STAGE 1: Build --------
FROM node:22.16.0-bookworm AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build


# -------- STAGE 2: Runtime --------
FROM node:22.16.0-bookworm

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
# RUN npx prisma migrate deploy
# CMD ["node", "dist/main"]
