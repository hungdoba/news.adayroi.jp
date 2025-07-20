'use client';
import { useTheme } from 'next-themes';
import ExportedImage from 'next-image-export-optimizer';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <ExportedImage
      src={
        theme === 'dark'
          ? '/images/thumbnails/logo/logo-dark.png'
          : '/images/thumbnails/logo/logo.png'
      }
      priority
      width={430}
      height={148}
      className="h-10 w-auto rounded"
      alt="Logo"
    />
  );
}
