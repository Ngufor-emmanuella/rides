# Stage 1: Build
FROM node:22.12.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve
FROM node:22.12.0
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]