FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY *.json ./
COPY *.config.js ./
COPY *.config.ts ./
RUN npm i
COPY src/ src/
