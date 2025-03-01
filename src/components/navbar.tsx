import Link from 'next/link';
import { ThemeSwitcher } from './ui/theme-switcher';

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center p-4">
        <Link className="text-xl" href="/">
          Adayroi
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="https://chat.adayroi.jp">Chat</Link>
          </li>
          <li>
            <Link href="https://adayroi.jp">Main</Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
