FROM node:18

RUN mkdir -p /frontend
WORKDIR /frontend

COPY --chown=node:node package*.json /frontend

RUN npm install

COPY --chown=node:node . .
EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]