FROM node:12

WORKDIR /Kwetter/apps/gateway
COPY package.json .

RUN npm install
ADD . /Kwetter/apps/gateway

RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000