#!/bin/bash

echo "Initializing service1..."
node createDB.js  

# Start the service
exec "$@"
