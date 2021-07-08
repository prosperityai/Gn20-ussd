FROM node:12
WORKDIR /app
COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 8000

RUN npm install -g nodemon

CMD [ "nodemon", "app.js" ]

