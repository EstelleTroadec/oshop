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

## Installation de l'application

1. Installer les dépendances de l'application : `npm install`

### BDD

1. Créer une base de données et un utilisateur ayant le droit de s'y connecter (les bons souvenirs des saisons précédentes !).

<details>
    <summary>
        Je ne me rappelle plus trop des commandes...
    </summary>
    Un petit tour sur la fiche recap ? https://kourou.oclock.io/ressources/objectifs/creer-une-nouvelle-base-de-donnee-sur-postgresql/
</details>

2. Exécuter le script SQL fourni dans `data/structure-data.sql` afin de créer les tables dans notre BDD et y ajouter un échantillon de données.

3. Copier le contenu du fichier `.env.example` dans un fichier `.env` que vous devrez créer, modifier la variables `PG_URL` avec les informations nécessaires pour pouvoir vous connecter à votre BDD.

### L'application [X]

1. Démarrez l'application `npm run dev`
2. Aller sur [localhost:3000](http://localhost:3000)
3. Appréciez le travail de notre designer / intégrateur.

### Précisions :straight_ruler:

Il y a deux utilisateurs en DB :

1. _John Example_, email : `example@example.com`, mot de passe : `password`, rôle : _customer_
2. _Maurice Admin_, email: `admin@admin.com`, mot de passe: `password`, rôle : _admin_

Il y a aussi trois produits, deux catégories et deux rôles dans la BDD.

#### Vos tâches :construction_worker:

1. Dans le répertoire `app/models`, vous devrez compléter les modèles Sequelize `Product` [X] et `Category` [X] dans les fichiers correspondants, et créer les associations relatives à ces 2 entités dans le fichier `app/models/index.js` [X]. Des commentaires dans les fichiers fournis vous aideront.

2. Vous devrez rendre la page `/shop` dynamique en affichant les catégories dans la sidebar et les informations des produits sur cette page. Des commentaires sont inclus dans les fichiers pour vous aider. Faites de même pour les pages de détail des catégories et des produits. [X]

3. Vous devrez faire fonctionner la connexion via les routes existantes sur `/login`.

4. Bonus : faire fonctionner le bouton `logout` de `NavLinks.ejs` et du `header.ejs` du dashboard via la route existante sur `/logout`

5. Bonus : finir la méthode `register` de `userController`. :fireworks:

---

<details>
<summary>Enfin, voici l'architecture de notre application</summary>


```bash
.
├── README.md
├── app
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── cartController.js
│   │   ├── catalogController.js
│   │   ├── sessionController.js
│   │   └── userController.js
│   ├── database.js
│   ├── models
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   └── index.js
│   ├── routers.js
│   └── views
│       ├── 401.ejs
│       ├── admin.ejs
│       ├── cart.ejs
│       ├── category.ejs
│       ├── dashboard
│       │   ├── dashboard.ejs
│       │   └── partials
│       │       ├── head.ejs
│       │       ├── header.ejs
│       │       ├── quickActions.ejs
│       │       └── sidebar.ejs
│       ├── error.ejs
│       ├── index.ejs
│       ├── login.ejs
│       ├── partials
│       │   ├── foot.ejs
│       │   ├── head.ejs
│       │   ├── header.ejs
│       │   ├── nav.ejs
│       │   └── navlinks.ejs
│       ├── product.ejs
│       ├── register.ejs
│       └── shop.ejs
├── assets
│   ├── css
│   │   ├── app.css
│   │   └── dashboard.css
│   ├── favicon.ico
│   └── img
│       ├── 404.gif
│       ├── blog1.png
│       ├── blog2.png
│       ├── blog3.png
│       ├── kenshiro.jpg
│       ├── macbook-pro-laravel.png
│       ├── macbook-pro.png
│       └── triangles.svg
├── data
│   └── structure-data.sql
├── index.js
├── middlewares
│   ├── auth.js
│   ├── cartCalculations.js
│   ├── errorHandlers.js
│   ├── initCart.js
│   ├── isAdmin.js
│   └── loadUserToLocals.js
├── package-lock.json
├── package.json
└── utils
    └── helpers.js
```


</details>

