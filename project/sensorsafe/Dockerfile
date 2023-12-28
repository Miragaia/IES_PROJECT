# --- reactjs ---
FROM node:20.9.0

# set working directory
WORKDIR /sensorsafe

ENV REACT_APP_API_ADDRESS=172.18.0.3
ENV REACT_APP_RABBIT_MQ_ADDRESS=172.18.0.7
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000

CMD ["sh", "-c", "sleep 20 && npm start"]