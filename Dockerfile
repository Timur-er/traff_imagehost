# Step 1: Build the React application
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 to the outer world
EXPOSE 3000
# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]