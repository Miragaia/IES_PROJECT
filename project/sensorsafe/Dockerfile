# --- reactjs ---
FROM node:20.9.0

# set working directory
WORKDIR /sensorsafe

ENV REACT_APP_API_ADDRESS=172.1.0.1
ENV REACT_APP_RABBIT_MQ_ADDRESS=172.1.0.2
 
COPY package*.json ./

RUN npm install

COPY . .
 
EXPOSE 3000

CMD [ "npm", "start" ]