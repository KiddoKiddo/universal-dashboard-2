FROM node:9.10.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV development
COPY . .
RUN npm install --silent
CMD ["npm", "run", "start:docker"]

EXPOSE 8080
