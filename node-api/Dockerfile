#Utilisation une image de node
FROM node:18-alpine


#2 Définir le dossier de travail 
WORKDIR /app

#3. Copier les fichiers du projet 
COPY package*.json package-lock.json ./
Run npm install --only=produciton

#4. Copier les fichiers du projet
COPY . .

#eXPOSER LE PORT UTILIS2 PAR L'API 
EXPOSE 3000 

#6 Démarrer le sevruer Node js
CMD ["node", "server.js"]