# Utiliser Node.js pour le développement
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port 3000 (React Dev Server)
EXPOSE 3000

# Démarrer l'application React en mode développement
CMD ["npm", "start"]
