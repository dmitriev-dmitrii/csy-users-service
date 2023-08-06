#FROM node:18-alpine
#
#ADD package.json /webapp/whatsapp/package.json
#ADD package-lock.json /webapp/whatsapp/package-lock.json
#
#RUN cd /webapp/whatsapp; npm ci
#
#ADD . /webapp/whatsapp
#
#WORKDIR /webapp/whatsapp
#
#CMD ["npm", "run", "start"]
