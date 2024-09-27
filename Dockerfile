# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# RUN apt-get update && apt-get install -y python make g++
# RUN npm rebuild better-sqlite3 --build-from-source

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "preview"]