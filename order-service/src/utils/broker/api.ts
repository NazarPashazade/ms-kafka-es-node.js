import axios from "axios";
import { Product } from "../../dto/product.dto";
import { APIError } from "../error";
import { logger } from "../logger";

const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL;

export const getProductDetails = async (id: number) => {
  try {
    const { data } = await axios.get(`${CATALOG_BASE_URL}/products/${id}`);
    return data as Product;
  } catch (err) {
    logger.error(err);
    throw new APIError("Product not found!");
  }
};
