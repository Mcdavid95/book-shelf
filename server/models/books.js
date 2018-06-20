'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    ratings: DataTypes.ARRAY(DataTypes.INTEGER),
    author: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  });
  Books.associate = (models) => {
    // associations can be defined here
    Books.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Books;
};