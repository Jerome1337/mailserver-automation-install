FROM node:argon

RUN npm install pm2 -g --silent

WORKDIR /usr/src/app
COPY process.yml /usr/src/app

RUN git clone https://github.com/yoonic/atlas.git backend
RUN cd backend && \
    npm i --silent && \
    sed -i "s#8000#5000#" config/development.js && \
    sed -i "s#JWT_KEY#JWT_KEY || \"`openssl rand -base64 32`\"#" config/development.js && \
    sed -i "s#'localhost'#'rethink'#" config/development.js

RUN git clone https://github.com/yoonic/nicistore.git frontend
RUN cd frontend && \
    npm i --silent && \
    sed -i "s#'http://localhost:8000/v1'#'http://localhost:55000/v1'#" config/client/development.js

CMD ["pm2-docker", "process.yml"]
