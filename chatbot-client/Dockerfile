FROM node:12.0

LABEL maintainer="arun_prasath@ymail.com"
ENV UIAPP /srv/app/fin-chatbot-client/

RUN mkdir -p ${UIAPP}
WORKDIR ${UIAPP}

#RUN npm install -g serve

#install dependencies
COPY package*.json ${UIAPP}
COPY ./src/ ${UIAPP}/src
COPY ./public/ ${UIAPP}/public
COPY .env ${UIAPP}
RUN npm install

ENV PATH "$PATH:$UIAPP/node_modules/.bin/"

#use npm start for development & npm build for production
CMD ["npm","run","start"]