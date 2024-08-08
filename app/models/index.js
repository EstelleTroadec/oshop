const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Role = require('./Role');

// A category can have several products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products',
});
// A product can have only one category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});
// A role can have several users
Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users',
});

// A user can have only one role
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});

module.exports = { User, Category, Product, Role };
