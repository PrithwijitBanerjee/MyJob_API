FROM node:20.12.2
COPY . .
RUN npm install
EXPOSE 5000
RUN apt-get update && apt-get install -y wait-for-it
CMD ["wait-for-it", "mongodb:27017", "--", "npm", "start"]
