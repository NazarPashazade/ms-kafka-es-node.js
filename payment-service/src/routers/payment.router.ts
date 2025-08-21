import * as express from "express";
import { RequestAuthorizer } from "../middleware/auth.middleware";
import { paymentService } from "../services/payment.service";

export const paymentRouter = express.Router();
const paymentGateway = {};

paymentRouter.post(
  "/create-payment",
  RequestAuthorizer,
  async (req, res, next) => {
    try {
      const orderId = req.body.orderId;
      const user = (req as any).user;

      if (!user) {
        next(new Error("User not authenticated"));
        return;
      }

      const response = await paymentService.createPayment(
        user.id,
        orderId,
        paymentGateway
      );

      res.status(201).json({
        message: "Payment created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
);

paymentRouter.get(
  "/verify-payment/:orderId",
  RequestAuthorizer,
  async (req, res, next) => {
    try {
      const paymentId = req.params.id;

      if (!paymentId) {
        next(new Error("Payment ID is required"));
        return;
      }

      const user = (req as any).user;

      if (!user) {
        next(new Error("User not authenticated"));
        return;
      }

      await paymentService.verifyPayment(paymentId, paymentGateway);

      res.status(200).json({ message: "Payment verified!" });
    } catch (error) {
      next(error);
    }
  }
);
