FROM node:18-alpine
WORKDIR /test-sse
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]