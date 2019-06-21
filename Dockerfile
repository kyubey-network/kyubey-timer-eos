FROM node:8.6.0

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

RUN npm config set registry "https://registry.npm.taobao.org"

WORKDIR /usr/src/app
RUN npm install
CMD npm run start

# docker build . -t="kyubey_eos_watcher"
# docker run -d --restart=always --name="kyubey_watcher_test" -v /usr/local/kyubey/ormconfig_test.json:/usr/src/app/ormconfig.json kyubey_eos_watcher
# docker update kyubey_watcher_test --restart=always
# docker logs kyubey_watcher_test