FROM node:18
WORKDIR /app
RUN mkdir -p /app/photos
COPY . .
RUN npm install -g npm@9.8.0
RUN npm i --force
CMD ["npm", "start"]
