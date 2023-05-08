FROM node:18

RUN mkdir -p /backend
WORKDIR /backend

COPY --chown=node:node package*.json /backend

RUN npm install

COPY --chown=node:node . .
EXPOSE 7000

ENTRYPOINT ["npm", "run", "start:dev"]