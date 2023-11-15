FROM node:18-alpine AS dev

#ENV P=csy-users-service12
#
#WORKDIR /home/$P

#COPY package*.json ./

COPY . .

RUN npm i

CMD ["npm", "run", "dev"]

FROM node:18 AS development

COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]

FROM node:18 AS production

COPY . .

RUN npm ci

CMD ["npm","run","start"]