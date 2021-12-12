FROM node:14.18.1-alpine

WORKDIR /app

RUN yarn global add @vue/cli
RUN yarn global add firebase-tools
