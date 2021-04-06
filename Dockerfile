FROM node:10-alpine AS build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY /dist/cloud-firebase-assignment /usr/share/nginx/html
