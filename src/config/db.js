module.exports = {
  development: {
    username: process.env.DB_USERNAME || "simple_rest",
    password: process.env.DB_PASSWORD || "simple_rest",
    database: process.env.DB_DATABASE || "simple_rest",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "simple_rest",
    password: process.env.DB_PASSWORD || "simple_rest",
    database: process.env.DB_DATABASE || "simple_rest",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || "simple_rest",
    password: process.env.DB_PASSWORD || "simple_rest",
    database: process.env.DB_DATABASE || "simple_rest",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};
