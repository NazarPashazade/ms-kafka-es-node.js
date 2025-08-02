import * as express from "express";

export const catalogRouter = express.Router();

catalogRouter.post("/products", async (req, res) => {
  try {
    res.status(201).json({});
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
