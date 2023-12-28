# Deployment

## Local Deployment

To run the project locally, ensure you have the following prerequisites installed on your machine:

1. **Java Development Kit (JDK):**
   - Minimum version: Java 17
   - [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)

2. **Maven:**
   - Build and dependency management tool
   - Minimum version: Maven 3.6.3
   - [Download Maven](https://maven.apache.org/download.cgi)

3. **Python:**
    - Minimum version: Python 3.8
    - [Download Python](https://www.python.org/downloads/)

4. **Python Packages:**
    - Install the required Python packages by running `pip install -r requirements.txt`

5. **React and NPM:**
    - Minimum version: React 18.2.0 and NPM 7.20.3
    - [Download React](https://reactjs.org/docs/getting-started.html)
    - [Download NPM](https://www.npmjs.com/get-npm)

6. **RabbitMQ:**
    - Message broker
    - [Download RabbitMQ](https://www.rabbitmq.com/download.html)

7. **MongoDB:**
    - Document database
    - [Download MongoDB](https://www.mongodb.com/try/download/community)

### Running the Application

To run the application, you will have to garantuee that have rabbitmq and mongodb running in your machine and that the ports 5672 and 27017 are available.
You will also have to garantuee that the settings in the `application.properties` file are:
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=sensorsafe
spring.data.mongodb.username=sensorsafe
spring.data.mongodb.auto-index-creation=true

jwt.secret=my-32-character-ultra-secure-and-ultra-long-secret

spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
spring.rabbitmq.template.exchange="spring_exchange"
```


You can run the application in two ways:

- **Run the application using the IDE:**
    1. Open the project in your IDE
    2. Run the `API` project
    3. Run the `web` project
    4. Run the `data_generation` project
    5. Access the application in `http://localhost:3000`

- **Run the application using the terminal:**

    1. **Build the API Project:**
    - Open a terminal in the project [/API](/API/) directory
    - Run the following command to build the project:
        ```bash
        mvn clean package
        ```

    2. **Run the API Application:**
        - Once the project is built, you can run the application:
        ```bash
        java -jar target/API-0.0.1-SNAPSHOT.jar
        ```

    3. **Run the Web Application:**
        - Open a terminal in the project [/project/sensorsafe](/project/sensorsafe/) directory
        - Run the following command to install the dependencies:
        ```bash
        npm install
        ```
        - Run the following command to start the application:
        ```bash
        npm start
        ```

    4. **Run the data generator:**
        - Open a terminal in the project [/data_generation](/data_generation/) directory
        - If you donÂ´t have the python packages installed, run the following command:
        ```bash
        pip install -r requirements.txt
        ```
        - Run the following command to start the data generator:
        ```bash
            python data_generator.py
        ```

    5. **Access the Application:**
        - Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the running application.





## Docker Deployment

To run the project in Docker, ensure you have the following prerequisites installed on your machine:

1. **Docker:**
   - Containerization platform
   - [Download Docker](https://www.docker.com/get-started)

2. **Docker Compose:**
    - Container orchestration tool
    - [Download Docker Compose](https://docs.docker.com/compose/install/)


### Running the Application

First, ensure that the application properties are the next ones:
```properties
jwt.secret=my-32-character-ultra-secure-and-ultra-long-secret

spring.data.mongodb.uri=mongodb://root:password@172.18.0.5:27017/?readPreference=primary&appname=sensorsafe%20Compass&ssl=false
spring.data.mongodb.database=sensorsafe
spring.data.mongodb.auto-index-creation=true
spring.data.mongodb.repositories.enabled=true

spring.rabbitmq.host=rabbitmq_sensorsafe
spring.rabbitmq.port=5672
spring.rabbitmq.username=test
spring.rabbitmq.password=test
spring.rabbitmq.template.exchange="spring_exchange"
```

Second, ensure that the following ports are available:
- 5672: RabbitMQ
- 15672: RabbitMQ Management
- 27017: MongoDB
- 3000: Web Application

If you have any of these ports in use, you can change them in the `docker-compose.yml` file.

If you have MongoDB or RabbitMQ running in your machine, you will have to stop them:
* MongoDB: `sudo service mongod stop`
* RabbitMQ: `sudo rabbitmqctl stop`

To run the application, follow these steps:

1. **Build Docker Image:**
   - Open a terminal in the [/project/](/project/) directory
   - Run the following command to build a Docker image:
     ```bash
     docker-compose build --no-cache
     
     ```

2. **Run Docker Container:**
   - Once the image is built, you can run a Docker container:
     ```bash
     docker-compose up
     ```
    - If you want to run the container in the background, run the following command:
      ```bash
        docker-compose up -d
        ```

3. **Access the Application:**
   - Open a web browser and navigate to [http://localhost:8000](http://localhost:8000) to access the running application.

4. **Stop Docker Container:**
    - To stop the Docker container, run the following command:
      ```bash
      docker-compose down
      ```

## UA Server Deployment

To run the project in the UA server, ensure that you are connected to internet of "Universidade de Aveiro" locally or via vpn.
The access link to the server is: [http://deti-ies-21.ua.pt:3000/]