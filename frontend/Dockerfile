FROM node:18
WORKDIR /app
RUN mkdir -p /app/photos
COPY . .
RUN npm i --force
CMD ["npm", "run", "build"]
