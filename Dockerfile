FROM node:8-alpine

MAINTAINER Konstantin Pogorelov <or@pluseq.com>

COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# Bundle app source
COPY . /app

CMD sleep 1000000000
