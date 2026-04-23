# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package configurations
COPY package*.json ./

# Install all dependencies (development dependencies needed for building)
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Pass the production API URL as a Build Argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the project
RUN npm run build

# Stage 2: Expose the built files
# We use a tiny image to just hold the files for the Caddy volume
FROM alpine:latest
WORKDIR /app
COPY --from=builder /usr/src/app/dist .
CMD ["tail", "-f", "/dev/null"]
