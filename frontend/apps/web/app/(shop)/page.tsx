import type { Metadata } from 'next';
import { HomePageClient } from '@/features/products/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Zavora — Everything You Need, In One Place',
  description: 'Shop quality products from trusted sellers at great prices. Fast delivery, secure payments.',
};

export default function HomePage() {
  return <HomePageClient />;
}
