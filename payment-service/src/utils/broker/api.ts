import axios from "axios";
import { AUTH_BASE_URL, ORDER_BASE_URL } from "../../config";
import { InProcessOrder } from "../../dto/order.model";
import { User } from "../../dto/user.model";
import { APIError, AuthorizeError } from "../error";
import { logger } from "../logger";

export const getOrderDetails = async (
  orderId: number
): Promise<InProcessOrder> => {
  try {
    const { data } = await axios.get(`${ORDER_BASE_URL}/orders/${orderId}`);

    const orderDetails: InProcessOrder = {
      id: data.id,
      customerId: data.customerId,
      orderNumber: data.orderNumber,
      amount: data.amount,
      status: data.status,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    return orderDetails;
  } catch (err) {
    logger.error(err);
    throw new APIError("Failed to fetch order details");
  }
};

export const validateUser = async (token: string) => {
  try {
    const headerOption = { headers: { Authorization: token } };

    const { data, status } = await axios.get(
      `${AUTH_BASE_URL}/validate`,
      headerOption
    );

    if (status != 200) throw new AuthorizeError("The user is not authorized");

    return data as User;
  } catch (err) {
    logger.error(err);
    throw new AuthorizeError("General: The user is not authorized");
  }
};
