import Link from 'next/link';

export default function Contact() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Liên hệ</h1>

      <section className="mb-6">
        <h2 className="mb-3 text-xl font-semibold">
          Liên hệ trực tiếp với chúng tôi qua facebook dưới nhé.
        </h2>
        <Link
          href={'https://www.facebook.com/profile.php?id=61573451684498'}
          className="text-blue-500 hover:underline"
        >
          hungba.net - Tin tức người Việt tại Nhật Bản
        </Link>
      </section>
    </div>
  );
}
