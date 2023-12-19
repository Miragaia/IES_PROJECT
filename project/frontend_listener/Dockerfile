FROM node:14

WORKDIR /frontend_listener

ENV REACT_APP_API_ADDRESS=172.18.0.3
ENV REACT_APP_RABBIT_MQ_ADDRESS=172.18.0.7
 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "sleep 15 && node index.js"]