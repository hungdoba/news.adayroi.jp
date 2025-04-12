import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { subDays } from 'date-fns';
import { addDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayJST() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000);
}

export function toDateString(date: string | Date) {
  try {
    return new Date(date).toISOString().split('T')[0];
  } catch (error) {
    console.error('Error converting date to string:', error);
    return '';
  }
}

export function formatDate(date: Date | string, locale = 'vi-VN') {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const get7DaysCentered = (dateStr?: string): string[] => {
  let date = dateStr ? new Date(dateStr) : new Date();
  const today = todayJST();

  const maxDate = addDays(date, 3);
  if (maxDate > today) {
    date = subDays(today, 3);
  }

  return Array.from({ length: 7 }, (_, i) =>
    toDateString(addDays(date, i - 3))
  ).reverse();
};
