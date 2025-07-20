/**
 * Custom error classes for better error handling
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

/**
 * Error handler for async functions
 */
export const catchAsync = <T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
): ((...args: T) => Promise<R>) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (err: unknown) {
      console.error('Async error:', err);
      throw err;
    }
  };
};

/**
 * Validation utilities
 */
export const validators: {
  isValidDate: (date: string) => boolean;
  isValidSlug: (slug: string) => boolean;
  isValidEmail: (email: string) => boolean;
  isValidUrl: (url: string) => boolean;
} = {
  isValidDate: (date: string): boolean => {
    const parsedDate: Date = new Date(date);
    return !isNaN(parsedDate.getTime());
  },

  isValidSlug: (slug: string): boolean => {
    const slugRegex: RegExp = /^[a-z0-9-]+$/;
    return slugRegex.test(slug);
  },

  isValidEmail: (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Safe JSON parsing
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};
