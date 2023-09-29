# Use the official Node.js 14 image from the DockerHub
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
# If you are building your code for production
# RUN npm ci --only=production
# For development
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD [ "npm", "start" ]
