import expressApp from "./express-app";
import { logger } from "./utils/logger";

const PORT = 3000;

export const startServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  process.on("uncaughtException", (error) => {
    logger.error(error);
    process.exit(1); // Exit the process with a failure code
  });
};

startServer().then(() => logger.info("Server started successfully"));
