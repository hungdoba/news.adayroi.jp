import {
  AppError,
  ValidationError,
  NotFoundError,
  catchAsync,
  validators,
  safeJsonParse,
} from '@/lib/errors';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create an AppError with default values', () => {
      const error = new AppError('Test error');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe('Error');
    });

    it('should create an AppError with custom values', () => {
      const error = new AppError('Custom error', 400, false);

      expect(error.message).toBe('Custom error');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(false);
    });

    it('should be an instance of Error', () => {
      const error = new AppError('Test error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });

    it('should have a stack trace', () => {
      const error = new AppError('Test error');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ValidationError', () => {
    it('should create a ValidationError with 400 status code', () => {
      const error = new ValidationError('Invalid input');

      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  describe('NotFoundError', () => {
    it('should create a NotFoundError with default message', () => {
      const error = new NotFoundError();

      expect(error.message).toBe('Resource not found');
      expect(error.statusCode).toBe(404);
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(NotFoundError);
    });

    it('should create a NotFoundError with custom resource name', () => {
      const error = new NotFoundError('Post');

      expect(error.message).toBe('Post not found');
      expect(error.statusCode).toBe(404);
    });
  });
});

describe('catchAsync', () => {
  it('should wrap async function and handle success', async () => {
    const asyncFn = jest.fn().mockResolvedValue('success');
    const wrappedFn = catchAsync(asyncFn);

    const result = await wrappedFn('arg1', 'arg2');

    expect(result).toBe('success');
    expect(asyncFn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should wrap async function and handle errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const error = new Error('Async error');
    const asyncFn = jest.fn().mockRejectedValue(error);
    const wrappedFn = catchAsync(asyncFn);

    await expect(wrappedFn()).rejects.toThrow('Async error');
    expect(asyncFn).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

describe('validators', () => {
  describe('isValidDate', () => {
    it('should return true for valid dates', () => {
      expect(validators.isValidDate('2023-12-25')).toBe(true);
      expect(validators.isValidDate('2023-12-25T10:30:00Z')).toBe(true);
      expect(validators.isValidDate('12/25/2023')).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(validators.isValidDate('invalid-date')).toBe(false);
      expect(validators.isValidDate('2023-13-40')).toBe(false);
      expect(validators.isValidDate('')).toBe(false);
      expect(validators.isValidDate('[YYYY-MM-DD]')).toBe(false);
    });
  });

  describe('isValidSlug', () => {
    it('should return true for valid slugs', () => {
      expect(validators.isValidSlug('valid-slug')).toBe(true);
      expect(validators.isValidSlug('another-valid-slug-123')).toBe(true);
      expect(validators.isValidSlug('simple')).toBe(true);
      expect(validators.isValidSlug('123-numbers')).toBe(true);
    });

    it('should return false for invalid slugs', () => {
      expect(validators.isValidSlug('Invalid Slug')).toBe(false); // spaces
      expect(validators.isValidSlug('invalid_slug')).toBe(false); // underscores
      expect(validators.isValidSlug('Invalid-Slug')).toBe(false); // uppercase
      expect(validators.isValidSlug('invalid@slug')).toBe(false); // special chars
      expect(validators.isValidSlug('')).toBe(false); // empty
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(validators.isValidEmail('test@example.com')).toBe(true);
      expect(validators.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(validators.isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validators.isValidEmail('invalid-email')).toBe(false);
      expect(validators.isValidEmail('test@')).toBe(false);
      expect(validators.isValidEmail('@example.com')).toBe(false);
      expect(validators.isValidEmail('test@.com')).toBe(false);
      expect(validators.isValidEmail('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(validators.isValidUrl('https://example.com')).toBe(true);
      expect(validators.isValidUrl('http://localhost:3000')).toBe(true);
      expect(
        validators.isValidUrl('https://sub.domain.com/path?query=value')
      ).toBe(true);
      expect(validators.isValidUrl('ftp://files.example.com')).toBe(true);
    });
  });
});

describe('safeJsonParse', () => {
  it('should parse valid JSON', () => {
    const validJson = '{"name": "test", "value": 123}';
    const fallback = { default: true };

    const result = safeJsonParse(validJson, fallback);

    expect(result).toEqual({ name: 'test', value: 123 });
  });

  it('should return fallback for invalid JSON', () => {
    const invalidJson = '{"invalid": json}';
    const fallback = { default: true };

    const result = safeJsonParse(invalidJson, fallback);

    expect(result).toEqual(fallback);
  });

  it('should return fallback for empty string', () => {
    const fallback: unknown[] = [];

    const result = safeJsonParse('', fallback);

    expect(result).toEqual(fallback);
  });

  it('should preserve fallback type', () => {
    const stringFallback = 'default';
    const numberFallback = 42;
    const arrayFallback = ['default'];
    const objectFallback = { default: true };

    expect(safeJsonParse('invalid', stringFallback)).toBe(stringFallback);
    expect(safeJsonParse('invalid', numberFallback)).toBe(numberFallback);
    expect(safeJsonParse('invalid', arrayFallback)).toBe(arrayFallback);
    expect(safeJsonParse('invalid', objectFallback)).toBe(objectFallback);
  });

  it('should handle null and undefined gracefully', () => {
    const fallback = { default: true };

    expect(safeJsonParse('null', fallback)).toBeNull();
    expect(safeJsonParse('undefined', fallback)).toBe(fallback); // undefined is not valid JSON
  });
});
