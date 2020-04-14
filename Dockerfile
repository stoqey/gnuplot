FROM mhart/alpine-node:10.19 AS builder

WORKDIR /srv

COPY . .
RUN apk add gnuplot
RUN yarn
RUN yarn test

# use lighter image
FROM mhart/alpine-node:slim-10.19
RUN apk add gnuplot
COPY --from=builder /srv .
CMD ["node", "dist/dev.js"]