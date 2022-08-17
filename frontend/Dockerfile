FROM node:14.15.4

WORKDIR /app
ADD . /app/


RUN rm yarn.lock
RUN yarn install
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000
