FROM node as node
WORKDIR /app
ADD . /app
RUN npm i && npm run build

FROM nginx as nginx
RUN mkdir /app
COPY  --from=node /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf 
