'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  });
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Books, {
      foreignKey: 'userId',
      as: 'books',
    });
  };
  return Users;
};