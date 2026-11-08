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

# Convert Render DATABASE_URL (postgres:// or postgresql://) to jdbc:postgresql:// if present
ENTRYPOINT ["sh", "-c", "if [ -n \"$DATABASE_URL\" ] && [ -z \"$SPRING_DATASOURCE_URL\" ]; then export SPRING_DATASOURCE_URL=$(echo \"$DATABASE_URL\" | sed -e 's/^postgres:\\/\\//jdbc:postgresql:\\/\\//' -e 's/^postgresql:\\/\\//jdbc:postgresql:\\/\\//'); fi; exec java -Dserver.port=${PORT} -jar app.jar"]

