FROM node:16-alpine
RUN apk add tini
ENTRYPOINT ["tini", "--"]
WORKDIR /usr/src/app
COPY . .
ARG SECRET_COOKIE_PASSWORD
RUN echo "SECRET_COOKIE_PASSWORD=$SECRET_COOKIE_PASSWORD" > .env
RUN echo "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID" >> .env
RUN npm run-script build
CMD ["npm", "run-script", "start"]
