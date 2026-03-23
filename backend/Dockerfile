FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx nx build backend

EXPOSE 3333

CMD ["node", "dist/backend/main.js"]