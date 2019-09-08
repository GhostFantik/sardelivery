FROM node as node
WORKDIR /app

COPY ./package*.json ./
RUN npm i

COPY . /app
RUN npm run build

FROM nginx as nginx
RUN mkdir /app
COPY  --from=node /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf 
