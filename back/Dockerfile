FROM node:23

WORKDIR /usr/src/app/back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]