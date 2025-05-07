'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'}
      priority
      width={430}
      height={148}
      className="h-10 w-auto pr-4 rounded"
      alt="Logo"
    />
  );
}
