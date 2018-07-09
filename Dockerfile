# This docker file is only for setting up the dev environment
FROM node:8-alpine

MAINTAINER Konstantin Pogorelov <or@pluseq.com>

COPY Makefile /app/
RUN apk add --no-cache make

COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

COPY . /app

CMD echo see Makefile for actual commands. Exiting...
