module.exports = function (sequelize, DataTypes) {
  const Workout = sequelize.define('Workout', {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Workout.associate = function (models) {
    Workout.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Workout;
};
