// src/api/wcApi.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import fs from 'fs';

interface WooCommerceProduct {
  id: number;
  name: string;
  categories: { id: number; name: string }[];
  // Add other product properties as needed
}

interface WooCommerceCategory {
  id: number;
  name: string;
  // Add other category properties as needed
}

interface WooCommerceApiResponse<T> {
  data: T;
}

class WCApi {
  private api: AxiosInstance;
  private dataFilePath: string;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://your-woocommerce-store-url/wp-json/wc/v3',
      // Add your authentication headers if required
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY', // Uncomment and replace with your actual API key
      },
    });

    // Set the path for the local data file
    this.dataFilePath = './localData.json';
  }

  private async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      // Handle errors (e.g., log, throw custom error, etc.)
      console.error('API request error:', error);
      throw error;
    }
  }

  private saveDataToFile(data: any): void {
    // Save the data to the local file
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  public async getCategories(): Promise<WooCommerceCategory[]> {
    const request = this.api.get<WooCommerceCategory[]>('/products/categories');
    const categories = await this.handleRequest<WooCommerceCategory[]>(request);
    this.saveDataToFile({ categories });
    return categories;
  }

  public async getProductsByCategory(categoryId: number): Promise<WooCommerceProduct[]> {
    const request = this.api.get<WooCommerceProduct[]>('/products', {
      params: {
        category: categoryId,
      },
    });
    const products = await this.handleRequest<WooCommerceProduct[]>(request);
    this.saveDataToFile({ products });
    return products;
  }

  public async getAllData(): Promise<{ categories: WooCommerceCategory[]; products: WooCommerceProduct[] }> {
    // Try to read data from the local file
    try {
      const localData = fs.readFileSync(this.dataFilePath, 'utf-8');
      return JSON.parse(localData);
    } catch (error) {
      // If there is an error reading the file or parsing JSON, return an empty object
      console.error('Error reading local data file:', error);
      return { categories: [], products: [] };
    }
  }

  // Add more methods for other WooCommerce API endpoints as needed
}

// Singleton pattern to ensure a single instance of the API throughout the app
const wcApi = new WCApi();

export default wcApi;
