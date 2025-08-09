import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember_me: z.boolean().default(false),
});

export const registerRequestSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().default("bearer"),
  expires_in: z.number().optional(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }).optional(),
});

export const registerResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().default("bearer"),
  expires_in: z.number().optional(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string().optional(),
  avatar: z.string().url().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type User = z.infer<typeof userSchema>;
