FROM python:3.8

WORKDIR /
COPY . .

ENV API_USER=admin
ENV API_PASS=password
ENV API_ADDRESS=http://172.1.0.3
ENV API_PORT=8080

ENV RABBITMQ_ADDRESS=172.1.0.6
ENV RABBITMQ_PORT=5672
ENV RABBITMQ_USER=test
ENV RABBITMQ_PASS=test

RUN pip install -r requirements.txt
RUN chmod a+x run.sh
CMD [ "./run.sh"]