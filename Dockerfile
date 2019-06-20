FROM node:8.6.0

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

RUN npm config set registry "https://registry.npm.taobao.org"

WORKDIR /usr/src/app
RUN npm install
CMD npm run start