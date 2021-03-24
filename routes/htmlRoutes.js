const router = require("express").Router();
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
module.exports = (db) => {
  // Load register page
  router.get("/register", (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/profile");
    } else {
      res.render("register");
    }
  });

  // Load profile page
  router.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id,
        },
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
        };
        // console.log(user);
        res.render("profile", user);
      });
    } else {
      res.redirect("/");
    }
  });

  // Load dashboard page
  router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
      };
      res.render("dashboard", user);
    } else {
      res.render("dashboard");
    }
  });
  //load feed page

  router.get("/feed", (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
      };

      db.Workout.findAll({
        where: {
          id: {
            [Op.ne]: 0,
          },
        },
        order: [["createdAt", "DESC"]],
        include: { model: db.User },
      }).then((allWorkouts) => {
        // console.log(user);
        // console.log(activities);
        res.render("feed", {
          allWorkouts: allWorkouts,
          user: user,
          isloggedin: user.isloggedin,
        });
      });
    } else {
      res.render("/");
    }
  });

  // Load dashboard page
  router.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated(),
      };
      res.render("dashboard", user);
    } else {
      res.render("dashboard");
    }
  });

  // Load example index page
  router.get("/workout", (req, res) => {
    if (req.isAuthenticated()) {
      db.Workout.findAll({
        where: { UserId: req.session.passport.user.id },
        raw: true,
      }).then((dbWorkouts) => {
        res.render("workout", {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: "Keep track of your workout and save it below!",
          workouts: dbWorkouts,
        });
      });
    } else {
      res.redirect("/");
    }
  });

  // Load example page and pass in an example by id
  router.get("/workout/:id", (req, res) => {
    if (req.isAuthenticated()) {
      db.Workout.findOne({ where: { id: req.params.id }, raw: true }).then(
        (dbWorkout) => {
          res.render("workout-detail", {
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            workout: dbWorkout,
          });
        }
      );
    } else {
      res.redirect("/");
    }
  });

  // Logout
  router.get("/logout", (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/");
    });
  });

  // Render 404 page for any unmatched routes
  router.get("*", (req, res) => {
    res.render("404");
  });

  return router;
};
