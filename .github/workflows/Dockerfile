FROM node:16-alpine
RUN apk add tini
ENTRYPOINT ["tini", "--"]
WORKDIR /usr/src/app
COPY . .
RUN npm run-script build
CMD ["npm", "run-script", "start"]
