FROM node:16-alpine AS build

ARG REDIS_URL
ARG SEGMENT_WRITE_KEY
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_DSN
ARG SENTRY_LOG_LEVEL=warn
ARG NODE_ENV=production
ARG X_API_KEY
ARG RELEASE_TAG_NAME

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm build

FROM node:16-alpine

ARG REDIS_URL
ARG SEGMENT_WRITE_KEY
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_DSN
ARG SENTRY_LOG_LEVEL=warn
ARG NODE_ENV=production

# Set ENVs so they persist after image is built
ENV REDIS_URL=${REDIS_URL}
ENV SEGMENT_WRITE_KEY=${SEGMENT_WRITE_KEY}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV SENTRY_DSN=${SENTRY_DSN}
ENV SENTRY_LOG_LEVEL=${SENTRY_LOG_LEVEL}
ENV NODE_ENV=${NODE_ENV}
ENV X_API_KEY=${X_API_KEY}
ENV RELEASE_TAG_NAME=${RELEASE_TAG_NAME}

WORKDIR /app

COPY --from=build /app/next.config.js /app/next.config.js
COPY --from=build /app/public /app/public
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/.next/standalone /app


EXPOSE 3000
CMD [ "node", "server.js" ]
