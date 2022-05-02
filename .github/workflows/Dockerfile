FROM node:16-alpine
RUN apk add tini
ENTRYPOINT ["tini", "--"]
WORKDIR /usr/src/app
COPY . .
ARG node_env
ENV NODE_ENV=${node_env}
RUN printenv
RUN npm run-script build
CMD ["npm", "run-script", "start"]
