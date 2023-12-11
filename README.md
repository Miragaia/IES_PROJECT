# SensorSafe

- Interactive system to manage Humidity/Temperature/Smoke Sensors 

# About the Project

## Primary Goals:

- Safety Enhancement: Enable users to proactively manage sensor data for fire detection, temperature control, and humidity monitoring, contributing to a safer living and working environment.

- User Empowerment: Provide a user-friendly interface for configuring and customizing sensor thresholds, allowing for personalized automation rules and immediate notifications based on sensor readings.

## Key Features:

- Personalized Automation   

- Real-time Notifications

# Team

| NMec | Name | email | Roles |
|:---: |:--- |:---|:---:|
| 108317 | Miguel Aido Miragaia      | [miguelmiragaia@ua.pt](https://github.com/Miragaia)                  |  Team manager, DevOps     |
| 108536 | Cristiano Antunes Nicolau | [cristianonicolau@ua.pt](https://github.com/cristiano-nicolau)       |  Architect, DevOps        |
| 107572 | Gonçalo Rafael Correia Moreira Lopes  | [goncalorcml@ua.pt](https://github.com/MoreiraLopes)     |  Product Owner, DevOps    |

# Architecture

![Architecture](reports/I2/Architecture_Diagram.png)

### Data Generation Layer
- Virtual agents in Python simulate real-world sensors (e.g., temperature, humidity). These agents send data through message queues to the backend for processing, with RabbitMQ serving as the message broker.

### Persistance Layer
- MongoDB is chosen as the database to store persistent data. Initially considered MySQL, MongoDB's document-oriented nature was deemed more suitable for our data classes. The middleware/services layer acts as a wrapper for database interactions.

### Middleware/Services Layer
- Implemented in Java and integrated into the Spring Boot application, this layer performs aggregation operations and calculates room statistics. It also notifies the front-end of important data changes. Authentication and Authorization mechanisms secure the Spring Controller exposed by the Middleware.

### Security
- Authentication relies on access tokens (JWT) issued to users upon login. These tokens, stored in the browser's local storage, serve as user authentication for endpoints. Bcrypt encrypts sensitive user data, such as passwords, in the database.

### API Layer
- The REST API, developed in Spring Boot (Java), connects integrations and clients to the system. It interfaces with the Middleware to access databases. Public endpoints, like register and login, are open, while private endpoints require authorization. Clients interact with the API through HTTP requests to retrieve information for presentation in the front-end.

### Front-end
- The system's front-end is built with ReactJS, offering a Single-Page Application (SPA) experience. ReactJS facilitates the creation of a dynamic and responsive user interface.

### Integration and Clients
- Applications and clients connect to the system via a REST API written in Spring Boot. This API, in turn, interfaces with the Middleware to access the databases. HTTP requests are used by applications/clients to query the API for necessary information to be presented in the front-end.


# Personas and Scenarios

## Personas

### Persona 1

    • Name: John Smith
    • Age: 47
    • Gender: Male
    • Role: Building Manager
    • Background: John has several years of experience managing residential and commercial buildings. He is responsible for ensuring the safety and comfort of all residents and occupants.

### Persona 2

    • Name: Peter  Williams
    • Age: 37
    • Gender: Male
    • Role: Resident on the third floor of the building
    • Background: Peter is a resident on the third floor of the building. He is deeply concerned about the safety and comfort of his family. Peter is interested in installing sensors in his apartment to enhance fire safety, monitor humidity in the bathrooms, and control the temperature to create a comfortable living environment for his family. He is actively seeking technological solutions to achieve these objectives within his apartment.


## Scenario

- SensorSafe it's a visionary approach to redefine how we interact with and manage the environments we inhabit. In a world where safety, comfort and control are primordial SensorSafe emerges. It has the objective of managing all the Sensors in a building. This system was design to help different types of users, from house owners to the Building Manager, having control of the temperatures/humidity of his own divisions/apartments or even for a security context by having control of a smoke sensor to prevent a fire. We aspire to revolutionize how users perceive and interact with sensors by offering a unified system that transcends the boundaries of traditional applications. This system offers a full control of every type of sensors, allows users to have an app to manage them all, to prevent the need of the users to own multiple apps to control each one.	

## User Stories

```
User Story 1: As the Building Manager, John requires the ability to configure customized alerts for specific divisions within the building. For example, he should receive immediate notifications if the temperature in the boiler room exceeds a predefined threshold. This feature empowers John to proactively prevent potential equipment damage.

System: Using SafeSensor John can define specific temperature and humidity thresholds for each division.
```
```
User Story 2: In his role as Building Manager, John seeks access to historical data regarding smoke sensor events. This access allows him to analyze trends and identify potential areas of concern within the building.

System: The data is presented in a clear and visual format, helping John in identifying trends or patterns.
```

```
User Story 3: John intends to automate the generation of reports on sensor status, events, and maintenance schedules for management purposes."

System: There are some types of reports (sensor status, maintenance schedule). Reports are automatically scheduled.
```

```
User Story 4: As a resident on the third floor, Peter wants to install smoke detectors in multiple rooms of his apartment to ensure the safety and comfort of his family. He would like to receive immediate notifications on his smartphone in case of smoke detection in any area of his apartment.

System: The system allows for the installation of smoke detectors in specific rooms with real-time notifications and monitoring to ensure Peter and his family's safety.
```

```
User Story 5: Peter envisions automation for the various sensors installed in different rooms of his apartment. Specifically, he wants to configure the system to activate the air conditioner when the temperature falls below a certain threshold, trigger the bathroom fan if humidity levels rise beyond a specified maximum, or even activation of the fire sprinklers.

System: The system will provide a user-friendly interface to set personalized automation rules for the sensors in their apartments.
``` 

# Bookmarks

## Quick Links

- [Report](reports/I2/IES_Project_Specification_ReportFinal.pdf)

Running the application:
- [API_Documentation](http://localhost:8080/swagger-ui/index.html)

## Project Management Board

- Using the Github Porjects feature the tasks and functionalities were divided and organized in a very intuitive and effeecient way.    


# Development

## Branches

- The project is divided in **branches:**
    - `master:` This branch contains the latest stable version of the project and reports (currently the project is not stabeleized).
    - `new/SensorsDevelopment:` This branch contains the latest version of the project, including the latest features and bug fixes.

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

## DataBase Access

- mongosh --username root --password password
