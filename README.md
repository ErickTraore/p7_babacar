#Pré-requis 

1- Le seveur MySQL doit être démarré (ex : via MAMP)

2- La base de données doit être créée dans mysql.

drop database database_development;
create database database_development;
```

3- Vérifier dans backend/config/config.json que les informations de connexion à la base de données soient les bonnes

4- Depuis le back, lancer les migrations
```

npm install
cd backend

5- Synchroniser la bdd crée avec les tables du site groupomania.
sequelize db:drop
sequelize db:create
sequelize db:migrate
```

#Lancer le projet en local

6- Démarrer le serveur back
```
nodemon serve
```

7- Démarrer le serveur front 
```
cd ../frontend
npm install
npm run serve 
```