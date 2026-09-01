import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Help Center' };

const FAQS = [
  { q: 'How do I track my order?', a: 'Go to Account → Orders and click on your order to see real-time tracking.' },
  { q: 'What payment methods are accepted?', a: 'We accept card payments, bank transfers, and mobile money through our secure payment partners.' },
  { q: 'How do I return an item?', a: 'Contact the seller directly through the order page within 7 days of delivery.' },
  { q: 'How long does delivery take?', a: 'Delivery times vary by seller and location. Estimated delivery is shown at checkout.' },
  { q: 'Is my payment information secure?', a: 'Yes. All payments are processed by certified payment providers. We never store your card details.' },
];

export default function HelpPage() {
  return (
    <div className="container-page py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Help Center</h1>
      <p className="mb-10 text-slate-500">Find answers to common questions below.</p>
      <div className="flex max-w-2xl flex-col gap-4">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="font-semibold text-slate-900">{q}</p>
            <p className="mt-2 text-sm text-slate-500">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
