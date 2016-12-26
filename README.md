# Ecommerce app and mailserver automation install
Ecommerce app and mail server automation install using Docker and Docker compose 🐳

#### Requirements
* Docker engine `>=1.10.0`
* Docker compose `>=1.6.0`

#### Ecommerce app components
* NPM
* NodeJS
* RethinkDB

#### Mailserver components (using [hardware/mailserver](https://github.com/hardware/mailserver) docker image)
* Postfix
* Dovecot
* OpenDKIM
* OpenDMARC
* Spamassassin
* Postgrey
* ClamAV
* Amavisd-new
* Amavisd-milter
* Supervisor
* Rsyslog
* ManageSieve server

## Usage
To install / configure project dependencies and start the containers the first time :
```
$ sh start
```

To start the project containers use :
```
$ docker-compose up
```

#### Available running services

* Website frontend: [http://localhost:53000/](http://localhost:53000/)
* Website backend: [http://localhost:55000/](http://localhost:55000/)
* PhpMyAdmin: [http://localhost:8100/](http://localhost:8100/)
* RethinkDB: [http://localhost:58080/](http://localhost:58080/)

## Author
* [Jérôme Pogeant](https://github.com/Jerome1337)
