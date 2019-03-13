FROM node:dubnium-alpine
CMD [ "yarn", "start" ]
WORKDIR /opt/app/

COPY package.json yarn.loc[k] /opt/app/
RUN yarn install

COPY migrations /opt/app/migrations/
COPY seeders /opt/app/seeders/
COPY config /opt/app/config/
COPY models /opt/app/models/
COPY src /opt/app/src/

LABEL COPYRIGHT MIT License
LABEL MAINTAINER Salathiel Genèse <salathielgenese@gmail.com>
