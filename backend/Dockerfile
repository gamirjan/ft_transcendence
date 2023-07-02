FROM node:18
WORKDIR /app
COPY . .
RUN npm i
RUN npm install ts-node --save-dev
RUN npm install typescript -g 
RUN npm install typescript --save-dev
CMD ["npm", "start"]
