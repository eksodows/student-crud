# Multi-stage build for Spring Boot application (Java 21)
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and dependencies
COPY pom.xml .
COPY src ./src

# Build JAR package (skipping tests since database is not available at build time)
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Render assigns PORT dynamically; default to 8080
ENV PORT=8080
EXPOSE 8080

# Run Spring Boot application
ENTRYPOINT ["sh", "-c", "exec java -Dserver.port=${PORT} -jar app.jar"]
