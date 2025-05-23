# 1. Build stage
FROM node:23.11-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Custom nginx config (uncomment if you have nginx.conf)
# COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]