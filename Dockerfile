FROM node:18-alpine

COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]
