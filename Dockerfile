# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Build the app with cache dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --prod
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/README.md ./README.md

RUN mkdir -p /usr/src/app/log && chmod -R 777 /usr/src/app

#RUN chmod -R 777 /usr/src/app

# This line for archivo exceptions:
COPY /src/common/filters/costum-codes-exceptions.json ./dist/common/filters/

# Oracle instantclients
RUN apk add --no-cache libaio
WORKDIR /
RUN mkdir -p /tmp && \
    cd /tmp 
RUN wget -O instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/2114000/instantclient-basiclite-linux.x64-21.14.0.0.0dbru.zip &&\
    unzip instantclient-basiclite.zip && \
    mv instantclient*/ /usr/lib/instantclient && \
    rm instantclient-basiclite.zip
RUN ln -s /lib/libc.musl-x86_64.so.1 /usr/lib/libresolv.so.2 && \
    ln -s /lib/ld-musl-x86_64.so.1 /usr/lib/ld-linux-x86-64.so.2
ENV LD_LIBRARY_PATH /usr/lib/instantclient

# Run App
WORKDIR /usr/src/app

CMD [ "node","dist/main" ]