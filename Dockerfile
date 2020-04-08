FROM node:12.16.1-alpine as builder

# ARGS for node
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache make gcc g++ python

# Install npm dependencies
COPY package.json package-lock.* /usr/src/app/
RUN NODE_ENV=development npm i

# Build ts
COPY src tsconfig*.json /usr/src/app/
RUN npm run build && npm prune --production

FROM node:12.16.1-alpine

LABEL maintainer "Marcelo Núñez <marcelo1nunez@gmail.com>"

ENV NODE_ENV=$NODE_ENV PORT=3000

WORKDIR /usr/src/app

# Copy source code from builder
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
# Copy node_modules from builder
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE $PORT

CMD [ "node", "dist/main.js" ]
