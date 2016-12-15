#!/usr/bin/env bash

docker-compose up -d

# Setup RethinkDB
docker exec -i rethink python <<EOF
import rethinkdb as r

r.connect("localhost", 28015).repl()

r.db_create("atlas").run()
r.db("atlas").table_create("Carts").run()
r.db("atlas").table_create("Checkouts").run()
r.db("atlas").table_create("Collections").run()
r.db("atlas").table_create("Contents").run()
r.db("atlas").table_create("Orders").run()
r.db("atlas").table_create("Products").run()
r.db("atlas").table_create("Users").run()

exit()
EOF

# Install and setup backend then launch it
mkdir src
cd src && mkdir app
cd app

git clone https://github.com/yoonic/atlas.git backend

cd backend

npm install

SECRET="$(openssl rand -base64 32)"
sed -i "s#JWT_KEY#JWT_KEY || \"${SECRET}\"#" config/development.js

# Install and setup front then launch it
cd ../

git clone https://github.com/yoonic/nicistore.git frontend

cd frontend

npm install

sed -i "s/api.atlas.baseUrl/http://localhost:8000/v1/" config/client/development.js
