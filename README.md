# Ecommerce app and mailserver automation install
Ecommerce app and mail server automation install using Docker and Docker compose 🐳

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
Use `$ docker-compose up` to start the project installation

## Author
* [Jérôme Pogeant](https://github.com/Jerome1337)
