# Use Node.js official image from Docker Hub
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other files to working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
