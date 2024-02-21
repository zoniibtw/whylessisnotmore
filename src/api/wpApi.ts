// src/api/wpApi.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";
import fs from "fs";
import path from "path";

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
  private dataFilePath: string;

  // You can find the json file under public folder
  constructor() {
    this.api = axios.create({
      baseURL: "https://your-wordpress-site-url/wp-json/wp/v2",
      // Add your authentication headers if required
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer YOUR_API_KEY', // Uncomment and replace with your actual API key
      },
    });

    // Set the path for the WordPress data file inside the public folder
    this.dataFilePath = path.join(__dirname, "../../public/wpData.json");

    // Fetch data initially
    this.fetchAndSaveData();

    // Set up an interval to fetch and save data every 30 minutes (30 * 60 * 1000 milliseconds)
    setInterval(() => this.fetchAndSaveData(), 30 * 60 * 1000);
  }

  private async handleRequest<T>(
    request: Promise<AxiosResponse<T>>,
  ): Promise<T> {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      // Handle errors (e.g., log, throw custom error, etc.)
      console.error("API request error:", error);
      throw error;
    }
  }

  private saveDataToFile(data: any): void {
    // Save the data to the WordPress data file inside the public folder
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  }

  private async fetchAndSaveData(): Promise<void> {
    try {
      const posts = await this.getPosts();

      // Use handleLocalData to merge and save the WordPress data
      this.handleLocalData({ posts });

      console.log("WordPress data fetched and saved successfully.");
    } catch (error) {
      console.error("Error fetching and saving WordPress data:", error);
    }
  }

  private handleLocalData(newData: Partial<{ posts: WordPressPost[] }>): void {
    try {
      // Try to read the existing data from the WordPress data file
      const existingData = JSON.parse(
        fs.readFileSync(this.dataFilePath, "utf-8"),
      ) as { posts: WordPressPost[] };

      // Merge the new data with the existing data
      const mergedData = {
        posts: [...existingData.posts, ...(newData.posts || [])],
      };

      // Save the merged data back to the WordPress data file
      this.saveDataToFile(mergedData);

      console.log("WordPress data successfully merged and saved.");
    } catch (error) {
      console.error("Error handling WordPress data:", error);
    }
  }

  public async getPosts(): Promise<WordPressPost[]> {
    const request = this.api.get<WordPressPost[]>("/posts");
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
