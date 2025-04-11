#!/bin/sh
set -e

envsubst '$BACKEND_HOST $BACKEND_PORT' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'