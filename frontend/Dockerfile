FROM node:22-alpine
RUN mkdir -p /frontend
WORKDIR /frontend
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
