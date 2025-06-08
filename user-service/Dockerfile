FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ../proto ../proto
RUN npx tsc
CMD ["node", "dist/index.js"]
