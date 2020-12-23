FROM node:10-slim

# Copy the source files in.
COPY client client/
COPY server server/
COPY package.json ./
COPY package-lock.json ./
COPY webpack.config.js ./

# Install the dependencies needed by the server and frontend.
RUN npm install

# Build the React frontend.
RUN npm run build

# Expose the 8080 port since this is where the server is hosted.
EXPOSE 8080

# Run the server.
ENTRYPOINT [ "npm", "run", "server" ]