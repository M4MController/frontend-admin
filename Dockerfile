FROM nginx:alpine
MAINTAINER Ed Asriyan <ed-asriyan@protonmail.com>

RUN apk update && apk add --no-cache nodejs; if ! type "npm" > /dev/null; then apk add --no-cache npm; fi

WORKDIR /application

ADD package.json .
RUN npm install

# build the app
ADD src ./src
ADD public ./public

RUN npm run build

# copy generated files
RUN mkdir -p /usr/html/ && cp -R build/. /usr/html/

# remove unnecessary source files
RUN rm -fr /application

ADD nginx.conf /etc/nginx/nginx.conf
