#!/bin/bash
set -e

# Start Keycloak in background with realm import
/opt/keycloak/bin/kc.sh start-dev --import-realm "$@" &
KEYCLOAK_PID=$!

echo "Waiting for Keycloak to be ready..."

# Wait until kcadm can authenticate (Keycloak ready)
until /opt/keycloak/bin/kcadm.sh config credentials \
  --server http://localhost:8080 \
  --realm master \
  --user "${KEYCLOAK_ADMIN}" \
  --password "${KEYCLOAK_ADMIN_PASSWORD}" 2>/dev/null; do
    sleep 3
done

echo "Keycloak is up, patching master realm..."

# Patch master realm to disable SSL
/opt/keycloak/bin/kcadm.sh update realms/master -s sslRequired=NONE

# Wait for Keycloak process to exit
wait $KEYCLOAK_PID
