import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Zavora' };

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">About Zavora</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Zavora is a modern multi-vendor marketplace connecting buyers with verified sellers
          across Africa. We make it easy to discover, compare, and buy products from thousands
          of trusted stores — all in one place.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: '🏪', label: 'Verified Sellers', desc: 'Every seller is reviewed before listing products.' },
            { icon: '🔒', label: 'Secure Payments', desc: 'Your transactions are protected end-to-end.' },
            { icon: '🚚', label: 'Fast Delivery', desc: 'Multiple delivery options to suit your schedule.' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-6">
              <span className="text-3xl">{icon}</span>
              <p className="mt-3 font-semibold text-slate-900">{label}</p>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
