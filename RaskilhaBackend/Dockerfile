# Utilisation de l’image officielle OpenJDK
FROM openjdk:17-jdk-slim

# Définition du répertoire de travail
WORKDIR /app

# Copier le fichier JAR dans le conteneur
COPY target/*.jar app.jar

# Exposition du port de l’application
EXPOSE 8081

# Démarrage de l’application
ENTRYPOINT ["java", "-jar", "app.jar"]
