import { Truck, ShieldCheck, BadgeCheck, RotateCcw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Get your products delivered quickly across Africa.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Safe and secure payment options you can trust.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Sellers',
    desc: 'Shop from trusted, verified marketplace sellers.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: 'Simple and convenient returns within 7 days.',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: "We're here when you need us, 24/7.",
  },
];

export function TrustSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="mb-6 text-center text-xl font-bold text-slate-900 sm:text-2xl">
        Why Shop With Zavora?
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800">{title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
