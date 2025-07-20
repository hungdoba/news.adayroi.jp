import Link from 'next/link';
import { ThemeSwitcher } from './ui/theme-switcher';
import Logo from './ui/logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';

const navLinks = [
  { href: 'https://jlpt.adayroi.jp', key: 'Jlpt', external: true },
  { href: 'https://chat.adayroi.jp', key: 'Chat', external: true },
  { href: 'https://trips.adayroi.jp', key: 'Trips', external: true },
  { href: 'https://adayroi.jp', key: 'Blog', external: true },
];

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center p-4 md:px-0">
        <Link className="flex text-xl" href="/">
          <Logo />
        </Link>
        {/* Desktop nav */}
        <ul className="hidden md:flex items-center space-x-2 md:space-x-4">
          {navLinks.map((link, idx) => (
            <React.Fragment key={link.key}>
              <li>
                <Link
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.key}
                </Link>
              </li>
              {idx < navLinks.length - 1 && (
                <li className="h-4 border-r border-gray-500"></li>
              )}
            </React.Fragment>
          ))}
          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 p-0"
              aria-description="Mobile navigation menu"
            >
              <SheetHeader className="sr-only">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Menu for navigating the site
                  </SheetDescription>
                </SheetHeader>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <ul className="flex flex-col gap-2 px-4 py-4">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={
                            link.external ? 'noopener noreferrer' : undefined
                          }
                          className="block py-2 text-lg"
                        >
                          {link.key}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
