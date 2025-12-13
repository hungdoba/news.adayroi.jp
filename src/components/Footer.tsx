import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-4 md:mx-0">
      <div className="mx-auto w-full py-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Hungba
            </span>
          </Link>
          <ul className="flex items-center space-x-4 text-sm">
            <li>
              <Link href="about-us">Giới thiệu</Link>
            </li>
            <li className="h-4 border-r border-gray-500"></li>
            <li>
              <Link href="terms"> Chính sách bảo mật</Link>
            </li>
            <li className="h-4 border-r border-gray-500"></li>
            <li>
              <Link href="contact">Liên hệ</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{' '}
          <Link href="/" className="hover:underline">
            hungba.net
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
