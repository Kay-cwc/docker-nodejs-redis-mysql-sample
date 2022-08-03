FROM node:14

WORKDIR /worker

COPY package.json .

RUN npm install

COPY . .

CMD npm start