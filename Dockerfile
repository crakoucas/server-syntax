FROM mhart/alpine-node:8
# File Author / Maintainer
LABEL authors="Rousset Renaud <renaud@crakoucas.ovh>"

# Install app dependencies
COPY /package.json /www/package.json
RUN cd /www
RUN yarn
# Copy app source
COPY . /www
# Set work directory to /www
WORKDIR /www/
RUN yarn build
# set your port
ENV PORT 3000
# expose the port to outside world
EXPOSE  3000
# start command as per package.json
CMD ["yarn", "start"]