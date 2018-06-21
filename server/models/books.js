

module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    ratings: DataTypes.ARRAY(DataTypes.INTEGER),
    averageRatings: DataTypes.FLOAT,
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
