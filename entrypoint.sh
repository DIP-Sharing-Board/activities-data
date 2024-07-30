#!/bin/sh

# Read the secret from the file and export it as an environment variable
export DATABASE_PASSWORD=$(cat /run/secrets/db-password)
# Now you can start your main application
exec node dist