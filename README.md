# O'shop

## Description

Site fictif de E-commerce d'un client, développé à titre d'exercice dans le cadre d'une formation de développeur web et web mobile.

### Objectifs de l'exercice

- Travailler dans du code existant, respecter des consignes et trouver sa place comme en entreprise.
- S'y retrouver dans un code source avec une architecture que vous n'avez pas choisi, et s'adapter à un nouvel environnement.
- Valider les acquis :
  - Création de base de données (à l'aide d'un script existant)
  - `Sequelize`
    - Création de modèles (pour nos tables)
    - Associations entre différentes tables
    - Requêtes
  - Les sessions avec `express-session`
  - Consolider les trucs `<%= bizarres %>` avec ejs

## Technologies utilisées

- Node.js
- Express
- EJS
- PostgreSQL

### Outils

- Visual Studio Code
- Git / Github
- Terminal

## Installation de l'application
  
### Pré-requis

- Node.JS
- npm
- postgreSQL

### Marche à suivre

#### Cloner le dépôt

Clonez ce dépôt sur votre machine :

```shell
git clone git@github.com:EstelleTroadec/oshop.git
```

Puis entrez dans le dépôt local et ouvrez-le avec votre éditeur de code :

```shell
cd nomDuDepot && code .
```

#### Créez la base de données

1. Depuis un terminal, connectez-vous à Postgres et créez votre base de données PostgreSQL. Commandes depuis un terminal :

```shell
# Commandes pour se connecter à Postgres
`sudo -i -u postgres psql` (ou `psql postgres` sur MacOsX)`

# pour créer votre bdd
`CREATE USER your_username WITH PASSWORD 'your_password';`
`CREATE DATABASE your_database OWNER your_username;`
```

2. Déconnectez-vous de votre base données (commande : `ctrl d` ou `\q`)

3. Toujours depuis le terminal, chargez les données du projet dans la base de données que vous venez de créer :

```shell
psql -U your_username -d your_database -f data/structure_data.sql
```

4. Configurez les paramètres de connexion à la base de données dans votre fichier .env, en reprenant l'exemple ci-dessous :

```shell
PG_URL=postgres://your_username:your_password@localhost/your_database
PORT=3000
SESSION_SECRET=secretQuiEstAssezLongPourEtreSecurisé
````

#### Installez les dépendances du projet

``` shell
npm install
```

#### Démarrez le serveur

```shell
npm run dev
````

#### Ouvrez le projet dans un navigateur

Une fois le serveur démarré, rendez-vous dans votre navigateur préféré à l'adresse http://localhost:5000 (ou au port que vous avez configuré dans votre fichier .env) pour voir le rendu visuel et interragir avec le site.