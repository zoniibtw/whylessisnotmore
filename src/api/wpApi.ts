// src/api/wpApi.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  // Add other post properties as needed
}

interface WordPressApiResponse<T> {
  data: T;
}

class WPApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://your-wordpress-site-url/wp-json/wp/v2',
      // Add your authentication headers if required
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY', // Uncomment and replace with your actual API key
      },
    });
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

  public async getPosts(): Promise<WordPressPost[]> {
    const request = this.api.get<WordPressPost[]>('/posts');
    return this.handleRequest<WordPressPost[]>(request);
  }

  public async getPostById(postId: number): Promise<WordPressPost> {
    const request = this.api.get<WordPressPost>(`/posts/${postId}`);
    return this.handleRequest<WordPressPost>(request);
  }

  // Add more methods for other WordPress API endpoints as needed
}

// Singleton pattern to ensure a single instance of the API throughout the app
const wpApi = new WPApi();

export default wpApi;
