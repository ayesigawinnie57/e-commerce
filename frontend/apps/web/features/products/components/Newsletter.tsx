'use client';

import { useState, type FormEvent } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error');
      return;
    }
    setLoading(true);
    // TODO: wire to /api/newsletter/subscribe/
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStatus('success');
    setEmail('');
  }

  return (
    <section className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-12 text-center text-white sm:px-12">
      <h2 className="text-2xl font-extrabold sm:text-3xl">
        Get the Best Deals Delivered to You
      </h2>
      <p className="mt-2 text-orange-100">
        Subscribe to receive exclusive offers, new arrivals and special promotions.
      </p>

      {status === 'success' ? (
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold">
          ✓ You're subscribed! Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="Enter your email address"
              className="w-full rounded-xl border-2 border-transparent bg-white px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-300"
              required
            />
            {status === 'error' && (
              <p className="mt-1 text-left text-xs text-amber-200">Please enter a valid email address.</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-xl bg-slate-900 px-7 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60 transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Subscribing...
              </span>
            ) : 'Subscribe'}
          </button>
        </form>
      )}
    </section>
  );
}
