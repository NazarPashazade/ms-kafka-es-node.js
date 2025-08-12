import axios from "axios";
import { APIError } from "../error";
import { logger } from "../logger";
import { Product } from "../../dto/product.dto";

const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:3000/api/catalog";

export const getProductDetails = async (id: number) => {
  const data = { stock: 10 } as any;

  try {
    const { data } = await axios.get(`${CATALOG_BASE_URL}/products/${id}`);
    return data as Product;
  } catch (err) {
    logger.error(err);
    throw new APIError("Product not found!");
  }

  return data;
};
