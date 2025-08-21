import { getOrderDetails } from "../utils";

const createPayment = async (
  customerId: number,
  orderId: number,
  paymentGateway: unknown
): Promise<any> => {
  try {
    const order = await getOrderDetails(orderId);

    if (customerId !== order.customerId) {
      throw new Error("Customer ID does not match the order's customer ID");
    }

    // get Order details from order service
    // create new payment in database
    // call payment gateway to create payment
    // fetch amount
    // return paymentSecrets
  } catch (error) {
    console.error("Failed to publish payment event:", error);
    return false;
  }

  const result = {
    secret: "some-secret",
    pubKey: "some-pub-key",
    amount: 100, // should come from order service
  };

  return {};
};

const verifyPayment = async (
  paymentId: string,
  paymentGateway: unknown
): Promise<any> => {
  try {
    // call payment gateway to verify payment
    // update Order Status through kafka
    // return payment status for information
  } catch (error) {
    console.error("Failed to verify payment:", error);
    return false;
  }
};

export const paymentService = {
  createPayment,
  verifyPayment,
};
