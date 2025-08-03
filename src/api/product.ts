// Type for WooCommerce products used in your store
export interface ProductVariation {
  id: number;
  attributes: { name: string; option: string }[];
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  image?: { id: number; src: string; alt?: string };
  sku: string;
  in_stock: boolean;
}

export interface StoreProductData {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: { id: number; src: string; alt?: string }[];
  categories: { id: number; name: string; slug: string }[];
  stock_quantity: number | null;
  in_stock: boolean;
  sku: string;
  type: string; // simple, variable, grouped, external
  attributes: {
    id: number;
    name: string;
    options: string[];
  }[];
  variations?: number[]; // array of variation IDs
  default_attributes?: { name: string; option: string }[];
}
