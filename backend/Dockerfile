FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY *.json ./
RUN npm i
COPY src/ src/
RUN mkdir data

CMD npm run dev