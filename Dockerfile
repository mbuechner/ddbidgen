FROM caddy:2-alpine

ENV XDG_CONFIG_HOME=/tmp \
	XDG_DATA_HOME=/tmp \
	APP_ROOT=/srv \
	APP_BASE_PATH=/app/ddbidgen

WORKDIR /srv

COPY . /srv
COPY Caddyfile /etc/caddy/Caddyfile

# Keep files readable for arbitrary OpenShift runtime UIDs.
RUN chmod -R g=u /srv /etc/caddy

EXPOSE 8080
