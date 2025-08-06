import expressApp from "./express-app";

const PORT = process.env.PORT || 9003;

export const startServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1); // Exit the process with a failure code
  });
};

startServer().then(() => console.log("Server started successfully"));
