import type { Metadata } from 'next';
import { WishlistView } from '@/features/account/components/WishlistView';

export const metadata: Metadata = { title: 'My Wishlist' };

export default function WishlistPage() {
  return <WishlistView />;
}
