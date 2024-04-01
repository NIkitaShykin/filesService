FROM node:20.12.0 as builder
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install 
COPY . /app/
RUN npm run build

FROM node:20.12.0 as production
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json /app/
RUN npm install --production
COPY --from=builder /app/dist .
ENTRYPOINT ["node", "index.js"]
