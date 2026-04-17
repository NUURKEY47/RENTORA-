# Use Node.js 18 Alpine for a small footprint
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package configurations
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies 
# Using --omit=dev for production efficiency
RUN npm install --omit=dev

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "node", "src/server.js" ]
