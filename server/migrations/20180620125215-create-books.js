
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    ratings: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    averageRatings: {
      type: Sequelize.FLOAT
    },
    author: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'books'
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books')
};
