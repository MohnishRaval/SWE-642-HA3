FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install

FROM openjdk:17-jdk-alpine
EXPOSE 8080
COPY --from=build /app/target/finalJar.jar finalJar.jar
ENTRYPOINT ["java","-jar","/finalJar.jar"]