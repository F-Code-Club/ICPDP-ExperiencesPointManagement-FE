FROM node:16-alpine
#Define ARGS to use when build.
ARG VITE_REACT_APP_BASE_URL
#Set environment variable for build stages
ENV VITE_REACT_APP_BASE_URL=$VITE_REACT_APP_BASE_URL
#Set working directory
WORKDIR /app
#Move the packages in first to install
COPY package*.json ./
RUN npm install
#Then we move the rest
COPY . .
#Build to image
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]