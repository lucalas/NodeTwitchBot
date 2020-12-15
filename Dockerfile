FROM node:14.14.0

ENV NODE_ENV=production

WORKDIR /app

COPY ["./package.json", ".env", "./build", "./"]

RUN npm install --production

CMD [ "node", "app.js" ]