import Link from 'next/link';

export default function SellerRegisterPage() {
  return (
    <div className="container-page py-16 text-center">
      <div className="mx-auto max-w-lg">
        <div className="text-6xl">🏪</div>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Sell on Zavora</h1>
        <p className="mt-3 text-slate-500">
          Reach millions of customers across Africa. Set up your store in minutes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/register" className="rounded-xl bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600 transition-colors">
            Create Seller Account
          </Link>
          <Link href="/about" className="rounded-xl border border-slate-300 px-8 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
