FROM node:14.16.1-alpine
RUN npm install -g npm@6.14.6
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
COPY ./package.json /var/www/gateway
RUN npm install
COPY . /var/www/gateway
#CMD npm build && npm start
CMD npm run start:dev