# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Set the Vite server host to listen on all interfaces
ENV VITE_HOST=0.0.0.0

# Define the command to run the app
CMD ["npm", "run", "dev"]
