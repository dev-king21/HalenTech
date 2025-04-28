# Use official Node.js image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (for better layer caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies and Prisma
RUN npm install
RUN npx prisma generate

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3001

# Run the app
CMD ["npm", "run", "dev"]