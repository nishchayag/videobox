import { VideoInterface } from "@/models/video.model";

export type VideoFormData = Omit<VideoInterface, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const defaultHeaders = {
      "Content-Type": "Application/json",
      ...headers,
    };
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }
  async getVidoes() {
    return this.fetch("/videos");
  }
  async createVideo(videoData: VideoFormData) {
    return this.fetch("/videos", {
      method: "POST",
    });
  }
}

export const apiClient = new ApiClient();
