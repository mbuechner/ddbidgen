FROM caddy:2-alpine

ENV XDG_CONFIG_HOME=/tmp \
	XDG_DATA_HOME=/tmp \
	APP_ROOT=/srv \
	APP_BASE_PATH=/app/ddbidgen

WORKDIR /srv

COPY . /srv
COPY Caddyfile /etc/caddy/Caddyfile

# OpenShift with allowPrivilegeEscalation=false can deny exec when binaries carry file capabilities.
RUN apk add --no-cache libcap \
	&& setcap -r /usr/bin/caddy \
	&& apk del libcap

# Keep files readable for arbitrary OpenShift runtime UIDs.
RUN chmod -R g=u /srv /etc/caddy

EXPOSE 8080
