'use client';

import Link from 'next/link';
import { ROUTES } from '@zavora/config';
import { SectionHeader } from '@/components/ui/SectionHeader';

const CATEGORIES = [
  {
    label: 'Health & Beauty',
    href: ROUTES.healthBeauty,
    image: 'https://address-restaurant2.odoo.com/web/image/2113-67ed1a66/pppp.webp',
  },
  {
    label: 'Fashion',
    href: ROUTES.fashion,
    image: 'https://address-restaurant2.odoo.com/web/image/2121-09657faa/Fashion.webp',
  },
  {
    label: 'Phones & Tablets',
    href: ROUTES.phonesTablets,
    image: 'https://address-restaurant2.odoo.com/web/image/2131-4951a7e3/phone%20%26%20tablets.webp',
  },
  {
    label: 'Electronics',
    href: ROUTES.electronics,
    image: 'https://address-restaurant2.odoo.com/web/image/2133-adfefa14/eletronics.webp',
  },
  {
    label: 'Home Appliances',
    href: ROUTES.homeAppliances,
    image: 'https://address-restaurant2.odoo.com/web/image/2117-c7221b29/appl.webp',
  },
  {
    label: 'Computing',
    href: ROUTES.computing,
    image: 'https://address-restaurant2.odoo.com/web/image/2137-0ad028ba/Computing.webp',
  },
  {
    label: 'Baby Products',
    href: ROUTES.babyProducts,
    image: 'https://address-restaurant2.odoo.com/web/image/2139-17f3d2c5/babies.webp',
  },
];

export function CategorySection() {
  return (
    <section>
      <SectionHeader title="Shop by Category" viewAllHref="/categories" />
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-7">
        {CATEGORIES.map(({ label, href, image }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center gap-2 text-center"
          >
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 transition-all group-hover:border-orange-400 group-hover:shadow-md sm:h-20 sm:w-20">
              <img
                src={image}
                alt={label}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-slate-700 group-hover:text-orange-500 transition-colors line-clamp-2">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
