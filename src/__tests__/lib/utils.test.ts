import {
  cn,
  todayJST,
  toDateString,
  formatDate,
  get7DaysCentered,
} from '@/lib/utils';
import { addDays, subDays } from 'date-fns';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', undefined, 'class3')).toBe('class1 class3');
      expect(cn()).toBe('');
    });

    it('should handle conditional classes', () => {
      expect(cn('base', true && 'active')).toBe('base active');
      expect(cn('base', false && 'active')).toBe('base');
    });
  });

  describe('todayJST', () => {
    it('should return a date 9 hours ahead of UTC', () => {
      const now = new Date();
      const jstDate = todayJST();

      // The JST date should be roughly 9 hours ahead
      const diffInHours =
        (jstDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      expect(diffInHours).toBeCloseTo(9, 1);
    });
  });

  describe('toDateString', () => {
    it('should convert valid date to ISO date string', () => {
      const date = new Date('2023-12-25T10:30:00Z');
      expect(toDateString(date)).toBe('2023-12-25');
    });

    it('should convert string date to ISO date string', () => {
      expect(toDateString('2023-12-25')).toBe('2023-12-25');
    });

    it('should handle invalid dates gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      expect(toDateString('invalid-date')).toBe('');
      expect(toDateString('')).toBe('');

      consoleSpy.mockRestore();
    });

    it('should skip placeholder dates', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      expect(toDateString('[YYYY-MM-DD]')).toBe('');
      expect(toDateString('2023-[MM]-25')).toBe('');

      consoleSpy.mockRestore();
    });
  });

  describe('formatDate', () => {
    it('should format date in Vietnamese locale by default', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toContain('2023');
      expect(formatted).toContain('25');
    });

    it('should format date with custom locale', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date, 'en-US');
      expect(formatted).toContain('December');
      expect(formatted).toContain('25');
      expect(formatted).toContain('2023');
    });

    it('should handle string dates', () => {
      const formatted = formatDate('2023-12-25');
      expect(formatted).toContain('2023');
      expect(formatted).toContain('25');
    });
  });

  describe('get7DaysCentered', () => {
    it('should return 7 days centered around given date', () => {
      const centerDate = '2023-12-25';
      const result = get7DaysCentered(centerDate);

      expect(result).toHaveLength(7);
      expect(result).toContain('2023-12-25');

      // Should include 3 days before and after
      expect(result).toContain('2023-12-22');
      expect(result).toContain('2023-12-28');
    });

    it('should adjust if the range goes beyond today', () => {
      // Use a future date that would cause adjustment
      const futureDate = addDays(new Date(), 10);
      const futureDateStr = toDateString(futureDate);

      const result = get7DaysCentered(futureDateStr);
      expect(result).toHaveLength(7);

      // Should not contain dates in the future beyond today + 3
      const today = todayJST();
      const maxAllowedDate = addDays(today, 3);

      result.forEach((dateStr) => {
        const date = new Date(dateStr);
        expect(date.getTime()).toBeLessThanOrEqual(maxAllowedDate.getTime());
      });
    });

    it('should return 7 days centered around today when no date provided', () => {
      const result = get7DaysCentered();
      expect(result).toHaveLength(7);

      // Should be in reverse order (latest first)
      const dates = result.map((d) => new Date(d));
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i].getTime()).toBeGreaterThanOrEqual(
          dates[i + 1].getTime()
        );
      }
    });

    it('should return dates in reverse order', () => {
      const result = get7DaysCentered('2023-12-25');
      const dates = result.map((d) => new Date(d));

      // Verify reverse chronological order
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i].getTime()).toBeGreaterThanOrEqual(
          dates[i + 1].getTime()
        );
      }
    });
  });
});
