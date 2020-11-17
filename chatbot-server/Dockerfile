#base image
FROM alpine:3.9
FROM node:12.0

LABEL maintainer="arun_prasath@ymail.com"

ENV APP /srv/app/fin-chatbot-server/

RUN mkdir -p ${APP}
WORKDIR ${APP}

#install dependencies
COPY package*.json ${APP}
COPY . .
RUN npm install

ENV PATH "$PATH:$APP/node_modules/.bin/"

#start server
CMD ["npm","start"]