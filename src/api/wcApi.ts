// src/api/wcApi.ts
import axios from "axios";
import type { StoreProductData, ProductVariation } from "./product";

const BASE_URL = process.env.REACT_APP_WC_BASE_URL!;
const CONSUMER_KEY = process.env.REACT_APP_WC_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.REACT_APP_WC_CONSUMER_SECRET!;

export const fetchProducts = async (
  categoryId?: string,
  page: number = 1,
): Promise<StoreProductData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/wp-json/wc/v3/products`, {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
      params: {
        per_page: 50,
        page,
        ...(categoryId && { category: categoryId }),
      },
    });

    // Filter out external/affiliate products
    const filteredProducts = response.data.filter(
      (product: any) => product.type !== "external",
    );

    return filteredProducts;
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return [];
  }
};

export const fetchCategories = async (): Promise<
  { id: number; name: string; slug: string }[]
> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/wp-json/wc/v3/products/categories`,
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET,
        },
        params: {
          per_page: 50,
        },
      },
    );

    return response.data.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Error fetching WooCommerce categories:", error);
    return [];
  }
};

export const fetchProductVariations = async (
  productId: number,
): Promise<ProductVariation[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/wp-json/wc/v3/products/${productId}/variations`,
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET,
        },
        params: {
          per_page: 50,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product variations:", error);
    return [];
  }
};
