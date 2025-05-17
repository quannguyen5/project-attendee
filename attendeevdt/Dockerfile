FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Sao chép pom.xml và tải các dependencies đầu tiên để tận dụng caching của Docker
COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline

# Sao chép mã nguồn và build ứng dụng
COPY src ./src
RUN mvn package -DskipTests

# Giai đoạn runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Sao chép JAR từ giai đoạn build
COPY --from=build /app/target/*.jar app.jar

# Biến môi trường
ENV SPRING_PROFILES_ACTIVE=docker

EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]