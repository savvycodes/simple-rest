const app = require("./app");
const { sequelize } = require("./models");

const logger = console;

(async function () {
  logger.info(`Connecting to database...`);
  try {
    await sequelize.authenticate();
  } catch (err) {
    logger.error(`Could not connect to database ${err.message}, ${err}`);
    return process.exit(1);
  }
  logger.info(`Connected ⚡️`);

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    logger.info(`Server started on http://localhost:${PORT}`);
  });

  /**
   * Cleanup function on shutdown signal
   */
  function shutdown() {
    logger.info("Received kill signal, shutting down gracefully");

    // Stops the server from accepting new connections and finishes existing connections.
    server.close(async (err) => {
      // if error, log and exit with error (1 code)
      if (err) {
        logger.error("Could not close server connections", err);
        process.exit(1);
      }

      logger.info("Closed out remaining connections");

      // Close database connection
      try {
        await sequelize.close();
        logger.info("Closed database connection");
      } catch (err) {
        logger.error("Could not close database connection", err);
      }
      process.exit(0);
    });

    setTimeout(() => {
      logger.info(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 10000);
  }

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();
