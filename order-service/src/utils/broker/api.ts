import axios from "axios";
import { Product } from "../../dto/product.dto";
import { APIError, AuthorizeError } from "../error";
import { logger } from "../logger";
import { CATALOG_BASE_URL, AUTH_BASE_URL } from "../../config";
import { User } from "../../dto/user.model";

export const getProductDetails = async (id: number): Promise<Product> => {
  try {
    const { data } = await axios.get(`${CATALOG_BASE_URL}/products/${id}`);
    return data as Product;
  } catch (err) {
    logger.error(err);
    throw new APIError("Product not found! on getProductDetails API");
  }
};

export const getStockDetails = async (ids: number[]): Promise<Product[]> => {
  try {
    const { data } = await axios.post(`${CATALOG_BASE_URL}/products/stock`, {
      ids,
    });
    return data as Product[];
  } catch (err) {
    logger.error(err);
    throw new APIError("Could not get stock details!");
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
