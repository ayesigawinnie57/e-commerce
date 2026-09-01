import Link from 'next/link';
import { APP_NAME, ROUTES } from '@zavora/config';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  'Customer Service': [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Delivery Information', href: '/help#delivery' },
    { label: 'Returns & Refunds', href: '/help#returns' },
  ],
  'About Zavora': [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Sell on Zavora', href: ROUTES.sellerRegister },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  'My Account': [
    { label: 'My Orders', href: ROUTES.orders },
    { label: 'Wishlist', href: ROUTES.wishlist },
    { label: 'Profile', href: ROUTES.profile },
    { label: 'Addresses', href: ROUTES.addresses },
  ],
};

const paymentMethods = ['Visa', 'Mastercard', 'Verve', 'Bank Transfer', 'USSD'];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <p className="text-2xl font-extrabold text-orange-500">{APP_NAME}</p>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              Your trusted African marketplace. Shop quality products from verified sellers at great prices.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <ul className="mt-3 space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-slate-500 hover:text-orange-500 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-10 border-t border-slate-100 pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-orange-500">Terms</Link>
            <Link href="/privacy" className="hover:text-orange-500">Privacy</Link>
            <Link href="/sitemap" className="hover:text-orange-500">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
