FROM node:18.16.0-alpine

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install
COPY tsconfig.json ./
COPY src src
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]