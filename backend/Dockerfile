# syntax=docker/dockerfile:1
FROM ruby:3.0.0
WORKDIR /test2backend
COPY . /test2backend
COPY Gemfile.lock /test2backend/Gemfile.lock
RUN bundle install
RUN rails db:migrate

