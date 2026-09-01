import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div className="container-page py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mb-10 text-slate-500">We&apos;re here to help. Reach out through any of the channels below.</p>
      <div className="grid gap-6 sm:grid-cols-3 max-w-3xl">
        {[
          { icon: '📧', label: 'Email', value: 'support@zavora.com' },
          { icon: '💬', label: 'Live Chat', value: 'Available 9am – 6pm WAT' },
          { icon: '📞', label: 'Phone', value: '+234 800 000 0000' },
        ].map(({ icon, label, value }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <span className="text-4xl">{icon}</span>
            <p className="mt-3 font-semibold text-slate-900">{label}</p>
            <p className="mt-1 text-sm text-slate-500">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
