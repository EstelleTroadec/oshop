const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    // logging false pour ne pas polluer le terminal avec les requêtes
    // si on veut voir les requêtes, il faut enlever cette ligne
    // logging: false,
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
});

module.exports = sequelize;
