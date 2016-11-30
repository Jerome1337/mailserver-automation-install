FROM nexylan/php-dev:7.0-fpm

EXPOSE 9000

COPY entrypoint.sh /
RUN chmod u+x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["php-fpm"]
