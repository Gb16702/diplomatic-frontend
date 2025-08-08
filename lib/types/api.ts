// API Request Types
export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// API Response Types
export interface LoginResponse {
  message: string;
  session_id: string;
  expires_in: number;
}

export interface RegisterResponse {
  user_id: string;
  email: string;
  message: string;
  verification_required: boolean;
}

// Error Types
export interface APIError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

export interface APIResponse<T> {
  data?: T;
  error?: APIError;
  status: number;
}