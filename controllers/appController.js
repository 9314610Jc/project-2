module.exports = function (db) {
  return {
    // Get all examples
    getWorkouts: function (req, res) {
      db.Workout.findAll({
        where: { UserId: req.session.passport.user.id },
      }).then((dbWorkout) => {
        res.json(dbWorkout);
      });
    },
    // Create a new example
    createWorkout: function (req, res) {
      db.Workout.create(req.body).then((dbWorkout) => {
        res.json(dbWorkout);
      });
    },
    // Delete an example by id
    deleteWorkout: function (req, res) {
      db.Workout.destroy({ where: { id: req.params.id } }).then((dbWorkout) => {
        res.json(dbWorkout);
      });
    },
  };
};
