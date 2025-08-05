# ---------- Stage 1: Build ----------
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Manually increase memory limit for Node.js during build
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

