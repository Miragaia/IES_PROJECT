# Prerequisites for running this project

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
        - If you don´t have the python packages installed, run the following command:
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

To run the application, follow these steps:

1. **Build Docker Image:**
   - Open a terminal in the project directory
   - Run the following command to build a Docker image:
     ```bash
     docker build -t your-image-name .
     ```

2. **Run Docker Container:**
   - Once the image is built, you can run a Docker container:
     ```bash
     docker run -p 8080:8080 your-image-name
     ```
     Adjust the port mapping (`-p host-port:container-port`) as needed.

3. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:8080` to access the running application.

Note: Ensure that the application configuration (e.g., database connection settings) is suitable for running in a Dockerized environment.

