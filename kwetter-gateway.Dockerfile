FROM node:12

WORKDIR /Kwetter/apps/gateway
COPY package.json .

RUN npm install
ADD . /Kwetter/apps/gateway

ENV PORT_GATEWAY ${PORT_GATEWAY}
ENV FRONTEND_HOST ${FRONTEND_HOST}
ENV AUTH_SERVICE_HOST ${AUTH_SERVICE_HOST}
ENV PROFILE_SERVICE_HOST ${PROFILE_SERVICE_HOST}
ENV TREND_SERVICE_HOST ${TREND_SERVICE_HOST}
ENV KWEET_SERVICE_HOST ${KWEET_SERVICE_HOST}
ENV FOLLOW_SERVICE_HOST ${FOLLOW_SERVICE_HOST}
ENV LIKE_SERVICE_HOST ${LIKE_SERVICE_HOST}

RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000