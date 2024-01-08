// src/api/wcApi.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import fs from 'fs';
import handleLocalData from '../utils/dataHandler';
import ""

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

    // Set the path for the WooCommerce data file
    this.dataFilePath = '../../public/wcData.json';

    // Fetch data initially
    this.fetchAndSaveData();

    // Set up an interval to fetch and save data every 30 minutes (30 * 60 * 1000 milliseconds)
    setInterval(() => this.fetchAndSaveData(), 30 * 60 * 1000);
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
    // Save the data to the WooCommerce data file
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  private async fetchAndSaveData(): Promise<void> {
    try {
      const categories = await this.getCategories();
      const products = await this.getProductsByCategory(0); // Change the category ID as needed

      // Use handleLocalData to merge and save the WooCommerce data
      handleLocalData('wcData.json', { categories, products });

      console.log('WooCommerce data fetched and saved successfully.');
    } catch (error) {
      console.error('Error fetching and saving WooCommerce data:', error);
    }
  }

  public async getCategories(): Promise<WooCommerceCategory[]> {
    const request = this.api.get<WooCommerceCategory[]>('/products/categories');
    return this.handleRequest<WooCommerceCategory[]>(request);
  }

  public async getProductsByCategory(categoryId: number): Promise<WooCommerceProduct[]> {
    const request = this.api.get<WooCommerceProduct[]>('/products', {
      params: {
        category: categoryId,
      },
    });
    return this.handleRequest<WooCommerceProduct[]>(request);
  }

  public async getAllData(): Promise<{ categories: WooCommerceCategory[]; products: WooCommerceProduct[] }> {
    // Try to read data from the WooCommerce data file
    try {
      const localData = fs.readFileSync(this.dataFilePath, 'utf-8');
      return JSON.parse(localData);
    } catch (error) {
      // If there is an error reading the file or parsing JSON, return an empty object
      console.error('Error reading WooCommerce data file:', error);
      return { categories: [], products: [] };
    }
  }

  // Add more methods for other WooCommerce API endpoints as needed
}

// Singleton pattern to ensure a single instance of the API throughout the app
const wcApi = new WCApi();

export default wcApi;
