import Link from 'next/link';
import { ThemeSwitcher } from './ui/theme-switcher';
import Logo from './ui/logo';

const Navbar = () => {
  return (
    <nav className="border-b-2 border-gray-700">
      <div className="w-full flex justify-between items-center py-4 ">
        <Link className="flex text-xl" href="/">
          <Logo />
        </Link>
        <ul className="flex items-center space-x-2 md:space-x-4">
          <li>
            <Link href="https://jlpt.adayroi.jp">JLPT</Link>
          </li>

          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://trips.adayroi.jp">Trips</Link>
          </li>

          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://chat.adayroi.jp">Chat</Link>
          </li>

          <li className="h-4 border-r border-gray-500"></li>
          <li>
            <Link href="https://adayroi.jp">Home</Link>
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
