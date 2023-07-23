FROM node:14.17.1-alpine
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]