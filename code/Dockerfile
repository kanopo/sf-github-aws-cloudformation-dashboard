FROM node:20.2.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start" ]
