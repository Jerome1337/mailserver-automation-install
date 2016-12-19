#!/usr/bin/env bash

docker-compose up -d

# Setup RethinkDB
docker exec -i rethink python <<EOF
import rethinkdb as r

r.connect("localhost", 28015).repl()

r.db_list().contains('atlas').do(
    function (databaseExists) {
        return r.branch(
            databaseExists,
            { dbs_created: 0 },
            r.db_create("atlas")
            r.db("atlas").table_create("Carts")
            r.db("atlas").table_create("Checkouts")
            r.db("atlas").table_create("Collections")
            r.db("atlas").table_create("Contents")
            r.db("atlas").table_create("Orders")
            r.db("atlas").table_create("Products")
            r.db("atlas").table_create("Users")
        );
    }
).run()

exit()
EOF
