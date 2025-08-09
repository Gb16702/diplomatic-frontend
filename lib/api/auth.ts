import { api } from "./client";
import { 
  loginRequestSchema,
  registerRequestSchema,
  loginResponseSchema,
  registerResponseSchema,
  userSchema,
  type LoginRequest,
  type RegisterRequest,
  type LoginResponse,
  type RegisterResponse,
  type User
} from "@/lib/schemas/api";

export async function loginUser(credentials: LoginRequest) {
  const validatedCredentials = loginRequestSchema.parse(credentials);
  
  return api.post("/api/v1/auth/login", loginResponseSchema, validatedCredentials);
}

export async function registerUser(userData: RegisterRequest) {
  const validatedUserData = registerRequestSchema.parse(userData);
  
  return api.post("/api/v1/auth/register", registerResponseSchema, validatedUserData);
}

export async function getCurrentUser() {
  return api.get("/api/v1/auth/me", userSchema);
}

export async function logoutUser() {
  return api.post("/api/v1/auth/logout");
}

export async function refreshToken() {
  return api.post("/api/v1/auth/refresh", loginResponseSchema);
}

export type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, User };