import { up } from "up-fetch";
import { z } from "zod";

const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema.optional(),
    message: z.string().optional(),
    success: z.boolean(),
    errors: z.array(
      z.object({
        field: z.string().optional(),
        message: z.string(),
      })
    ).optional(),
  });

export type APIResponse<T = any> = {
  data?: T;
  message?: string;
  success: boolean;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
};

export const apiClient = up(fetch, {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://15.237.182.40:8000",
  
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,

  retry: {
    attempts: 3,
    delay: 500,
  },

  beforeRequest: (url, options) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth-token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  },

  beforeResponse: async (response) => {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        window.location.href = "/auth/signin";
      }
    }
    
    return response;
  },
});

export const api = {
  get: async <T>(endpoint: string, schema?: z.ZodSchema<T>, params?: Record<string, any>) => {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    if (schema) {
      return await apiClient(url, { schema });
    }
    return await apiClient(url);
  },

  post: async <T>(endpoint: string, schema?: z.ZodSchema<T>, body?: any) => {
    if (schema) {
      return await apiClient(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        schema,
      });
    }
    return await apiClient(endpoint, {
      method: "POST", 
      body: JSON.stringify(body),
    });
  },

  put: async <T>(endpoint: string, schema?: z.ZodSchema<T>, body?: any) => {
    if (schema) {
      return await apiClient(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
        schema,
      });
    }
    return await apiClient(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  patch: async <T>(endpoint: string, schema?: z.ZodSchema<T>, body?: any) => {
    if (schema) {
      return await apiClient(endpoint, {
        method: "PATCH",
        body: JSON.stringify(body),
        schema,
      });
    }
    return await apiClient(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete: async <T>(endpoint: string, schema?: z.ZodSchema<T>) => {
    if (schema) {
      return await apiClient(endpoint, {
        method: "DELETE",
        schema,
      });
    }
    return await apiClient(endpoint, { method: "DELETE" });
  },
};

export const commonSchemas = {
  empty: z.object({}),
  message: z.object({
    message: z.string(),
  }),
  withId: z.object({
    id: z.string(),
  }),
};
