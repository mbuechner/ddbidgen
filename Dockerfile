FROM httpd:2.4-alpine
COPY / /usr/local/apache2/htdocs/
RUN sed -i 's/Listen 80/Listen 8080/g' /usr/local/apache2/conf/httpd.conf
RUN chmod 755 -R /usr/local/apache2/htdocs/

EXPOSE 80
