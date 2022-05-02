FROM node:16-alpine
RUN apk add tini
ENTRYPOINT ["tini", "--"]
WORKDIR /usr/src/app
COPY . .
ARG SECRET_COOKIE_PASSWORD
RUN printenv
RUN npm run-script build
CMD ["npm", "run-script", "start"]
