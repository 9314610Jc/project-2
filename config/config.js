module.exports = {
  development: {
    username: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    database: "workouts_db",
    dialect: "mysql",
    host: process.env.SEQUELIZE_HOST,
    port: 3306,
  },
  test: {
    username: process.env.TU,
    password: process.env.TP,
    database: "workouts_db",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql",
  },
};
