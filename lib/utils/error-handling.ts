import { toast } from "sonner";
import { ZodError } from "zod";

export interface APIError {
  message: string;
  field?: string;
  code?: string;
  status?: number;
}

export interface ErrorContext {
  action?: string;
  userId?: string;
  timestamp?: Date;
  userAgent?: string;
  url?: string;
}

export class ValidationError extends Error {
  public readonly field?: string;
  public readonly code: string = "VALIDATION_ERROR";

  constructor(message: string, field?: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

export class NetworkError extends Error {
  public readonly code: string = "NETWORK_ERROR";
  public readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "NetworkError";
    this.status = status;
  }
}

export class AuthenticationError extends Error {
  public readonly code: string = "AUTH_ERROR";

  constructor(message: string = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  public readonly code: string = "AUTHORIZATION_ERROR";

  constructor(message: string = "Access denied") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorReporting: boolean = process.env.NODE_ENV === "production";

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handle(error: unknown, context?: ErrorContext): void {
    const normalizedError = this.normalizeError(error);
    
    this.logError(normalizedError, context);
    
    this.displayUserError(normalizedError);
    
    if (this.errorReporting) {
      this.reportError(normalizedError, context);
    }
  }

  private normalizeError(error: unknown): APIError {
    if (error instanceof ZodError) {
      return {
        message: "Données invalides",
        field: error.errors[0]?.path?.[0]?.toString(),
        code: "VALIDATION_ERROR",
      };
    }

    if (error instanceof ValidationError) {
      return {
        message: error.message,
        field: error.field,
        code: error.code,
      };
    }

    if (error instanceof NetworkError) {
      return {
        message: error.message,
        code: error.code,
        status: error.status,
      };
    }

    if (error instanceof AuthenticationError) {
      return {
        message: error.message,
        code: error.code,
        status: 401,
      };
    }

    if (error instanceof AuthorizationError) {
      return {
        message: error.message,
        code: error.code,
        status: 403,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message || "Une erreur est survenue",
        code: "GENERIC_ERROR",
      };
    }

    return {
      message: "Une erreur inattendue est survenue",
      code: "UNKNOWN_ERROR",
    };
  }

  private displayUserError(error: APIError): void {
    const userMessages: Record<string, string> = {
      VALIDATION_ERROR: "Veuillez vérifier les données saisies",
      NETWORK_ERROR: "Problème de connexion réseau",
      AUTH_ERROR: "Veuillez vous reconnecter",
      AUTHORIZATION_ERROR: "Vous n'avez pas les droits pour cette action",
      GENERIC_ERROR: error.message,
      UNKNOWN_ERROR: "Une erreur inattendue s'est produite",
    };

    const message = userMessages[error.code || "UNKNOWN_ERROR"] || error.message;

    if (error.status === 401) {
      toast.error(message, {
        action: {
          label: "Se reconnecter",
          onClick: () => {
            if (typeof window !== "undefined") {
              window.location.href = "/auth/signin";
            }
          },
        },
      });
    } else {
      toast.error(message);
    }
  }

  private logError(error: APIError, context?: ErrorContext): void {
    console.error("Error handled:", {
      error,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
    });
  }

  private reportError(error: APIError, context?: ErrorContext): void {
    if (typeof window !== "undefined") {
      fetch("/api/errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error,
          context: {
            ...context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
          },
        }),
      }).catch(() => {

      });
    }
  }
}

export const handleError = (error: unknown, context?: ErrorContext): void => {
  ErrorHandler.getInstance().handle(error, context);
};

export const useErrorHandler = () => {
  const handler = ErrorHandler.getInstance();

  const handleError = (error: unknown, action?: string) => {
    handler.handle(error, { action });
  };

  const handleAsyncError = async <T>(
    promise: Promise<T>,
    action?: string
  ): Promise<T | null> => {
    try {
      return await promise;
    } catch (error) {
      handleError(error, action);
      return null;
    }
  };

  return {
    handleError,
    handleAsyncError,
  };
};

export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  action?: string
): T => {
  return ((...args: Parameters<T>) => {
    return fn(...args).catch((error: unknown) => {
      handleError(error, { action });
      throw error;
    });
  }) as T;
};