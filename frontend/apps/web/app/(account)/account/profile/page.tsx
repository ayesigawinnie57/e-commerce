import type { Metadata } from 'next';
import { ProfileView } from '@/features/account/components/ProfileView';

export const metadata: Metadata = { title: 'My Profile' };

export default function ProfilePage() {
  return <ProfileView />;
}
