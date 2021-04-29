# Stage 1
FROM node:14.15.4 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install

# Expose port 80
EXPOSE 3000

# set env and run 
#ENV NODE_ENV=development
CMD ["node", "/app/bin/www"]
