import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, APIResponse } from "@/lib/types/api";

const API_BASE_URL = "http://15.237.182.40:8000";

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data,
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: {
        detail: [
          {
            loc: ["network"],
            msg: "Network error occurred",
            type: "network_error",
          },
        ],
      },
      status: 0,
    };
  }
}

export async function loginUser(credentials: LoginRequest): Promise<APIResponse<LoginResponse>> {
  return apiCall<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(userData: RegisterRequest): Promise<APIResponse<RegisterResponse>> {
  return apiCall<RegisterResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}