# Use an official Node.js image as a base
FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the code and build the app
COPY . .
RUN npm run build

EXPOSE 8080
CMD ["node", "dist/server.js"]
