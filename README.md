# Bibliothèque en Ligne

## Description

Bibliothèque en Ligne est une application web moderne permettant de gérer une collection de livres. Elle offre des fonctionnalités pour ajouter, afficher, modifier et supprimer des livres. L'application utilise une interface utilisateur moderne inspirée des sites de streaming, avec des cartes pour chaque livre et une modale pour ajouter de nouveaux livres.

## Prérequis

- **Docker** : Assurez-vous que Docker est installé sur votre machine. Vous pouvez le télécharger et l'installer depuis [le site officiel de Docker](https://www.docker.com/get-started).

## Installation

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/bibliotheque-en-ligne.git
   cd bibliotheque-en-ligne
   ```

2. **Configurer l'environnement** :
   - Assurez-vous que Docker est en cours d'exécution.

3. **Lancez l'application** :
   - Utilisez Docker Compose pour construire et démarrer les conteneurs :
     ```bash
     docker-compose up --build
     ```

4. **Accédez à l'application** :
   - Ouvrez votre navigateur et allez à `http://localhost`.

## Structure du Projet

- **front-end/** : Contient les fichiers HTML, CSS et JavaScript pour l'interface utilisateur.
- **node-api/** : Contient le code serveur Node.js et les contrôleurs pour gérer les requêtes API.
- **db-init/** : Contient le script SQL pour initialiser la base de données.
- **nginx.conf** : Configuration pour Nginx en tant que reverse proxy.

## Conteneurs Docker

- **db** : Utilise l'image `mysql:8.0.36` pour la base de données MySQL. Il initialise la base de données avec le script `init.sql` et expose le port 3306.
- **api** : Construit à partir du Dockerfile dans `node-api/`, ce conteneur exécute le serveur Node.js qui gère les requêtes API.
- **frontend** : Construit à partir du Dockerfile dans `front-end/`, ce conteneur sert l'application front-end via Nginx.

## Dockerfiles

- **node-api/Dockerfile** : Définit l'environnement pour le serveur Node.js, installe les dépendances et démarre l'application.
- **front-end/Dockerfile** : Configure Nginx pour servir les fichiers statiques de l'application front-end.

## Utilisation

- **Ajouter un livre** : Utilisez la modale pour ajouter un nouveau livre à la collection. Vous pouvez spécifier le titre, l'auteur, l'ISBN, la description, l'année de publication et un lien vers l'image de couverture.
- **Afficher les livres** : Les livres sont affichés sous forme de cartes avec leur image de couverture, titre, auteur et année de publication.
- **Modifier un livre** : Bien que cette fonctionnalité soit à implémenter, elle permettra de modifier les détails d'un livre existant.
- **Supprimer un livre** : Supprimez un livre de la collection en un clic.
- **Filtrer les livres** : Utilisez le champ de recherche pour filtrer les livres par titre, auteur ou ISBN.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails. 