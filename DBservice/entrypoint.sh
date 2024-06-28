#!/bin/bash

echo "Waiting for RabbitMQ to be ready..."
/app/wait-for-it.sh rabbitmq:5672 --timeout=60 --strict -- echo "RabbitMQ is up"

echo "Initializing service1..."
node createDB.js  

# Start the service
exec "$@"
