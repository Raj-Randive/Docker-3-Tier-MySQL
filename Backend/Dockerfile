# Use node image as base
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]
