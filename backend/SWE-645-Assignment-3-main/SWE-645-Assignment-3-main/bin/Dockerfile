FROM openjdk:17-jdk-alpine
EXPOSE 8080 
# COPY env.properties env.properties
COPY target/finalJar.jar finalJar.jar
ENTRYPOINT ["java","-jar","/finalJar.jar"]