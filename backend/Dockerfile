FROM node:24

# Create app directory
WORKDIR /usr/src/app

# Copy content of Backend Directory
COPY . .

# Install dependencies
RUN npm install

# Exposing PORT to external Environment
# EXPOSE 3001

# This command will run when the container will start
CMD ["npm", "start"]