FROM node:16-alpine

WORKDIR /app

# Copy only package.json (exclude package-lock.json)
COPY package.json ./

# Install without generating package-lock.json
RUN npm install --no-package-lock

# Copy the rest of the app, but ignore package-lock.json
COPY . .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Run the production build
CMD ["serve", "-s", "build", "-l", "3000"]