// src/api/wcApi.ts
import axios from 'axios';

export interface WooCommerceProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  link: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  description: string;
  price: string;
  link: string;
}

export interface WooCommerceData {
  categories: WooCommerceCategory[];
  products: WooCommerceProduct[];
}

const wcApi = {
  // You can find the json file under public folder
  // Replace 'YOUR_API_BASE_URL' with the actual base URL of your WooCommerce API
  baseUrl: 'YOUR_API_BASE_URL',

  async getAllData(selectedCategory: string | null): Promise<WooCommerceData> {
    try {
      // Make API request to fetch categories and products based on the selected category
      const response = await axios.get<WooCommerceData>(
        `${this.baseUrl}/wp-json/wc/v3/products?category=${selectedCategory}`
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching WooCommerce data:', error);
      throw error;
    }
  },

  async getDistinctCategories(): Promise<string[]> {
    try {
      // Make API request to fetch distinct categories
      const response = await axios.get<WooCommerceCategory[]>(
        `${this.baseUrl}/wp-json/wc/v3/products/categories`
      );

      const distinctCategories = response.data.map(category => category.name);
      return distinctCategories;
    } catch (error) {
      console.error('Error fetching distinct categories:', error);
      throw error;
    }
  },
};

export default wcApi;
