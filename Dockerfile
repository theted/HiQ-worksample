FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY . /app
COPY --chown=node:node . /app
RUN npm install
RUN npm run build --if-present

USER node

EXPOSE 4244

CMD ["npm", "start"]
