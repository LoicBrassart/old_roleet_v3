FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src/ src/
RUN mkdir data
RUN npm run db:reset

CMD npm run dev