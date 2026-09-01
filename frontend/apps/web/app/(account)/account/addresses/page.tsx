import type { Metadata } from 'next';
import { AddressesView } from '@/features/account/components/AddressesView';

export const metadata: Metadata = { title: 'My Addresses' };

export default function AddressesPage() {
  return <AddressesView />;
}
