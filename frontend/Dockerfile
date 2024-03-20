# Use a base image with Node.js
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package*.json /app/

# # Install Angular CLI
# RUN npm install -g @angular/cli@latest

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Build the Angular application
RUN npm run build

# Use a smaller, more efficient base image for serving the Angular application
FROM nginx:alpine

# Copy the built Angular application from the build stage to the nginx directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose the port on which your Angular application is running
EXPOSE 80

# Command to run nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
