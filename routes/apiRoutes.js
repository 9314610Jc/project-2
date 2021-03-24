const router = require("express").Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

module.exports = (passport, db) => {
  const AuthController = require("../controllers/authController")(passport, db);
  const AppController = require("../controllers/appController")(db);

  // Authentication
  router.post("/register", AuthController.register);
  router.post("/login", AuthController.login);
  router.get("/logout", AuthController.logout);
  router.put("/user/:id", ensureAuthenticated, AuthController.updateUser);
  router.delete("/user/:id", ensureAuthenticated, AuthController.deleteUser);
  router.post("/user/confirm", AuthController.confirmAuth);

  // App
  router.get("/workouts", AppController.getWorkouts);
  router.post("/workouts", AppController.createWorkout);
  router.delete("/workouts/:id", AppController.deleteWorkout);

  return router;
};
