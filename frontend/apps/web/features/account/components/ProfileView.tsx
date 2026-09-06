'use client';

import { useAuthStore } from '@/store/auth';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { getInitials } from '@zavora/utils';

export function ProfileView() {
  const { user } = useAuthStore();
  const logout = useLogout();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-slate-900">My Profile</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
            {getInitials(user.firstName, user.lastName)}
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-500">{user.email}</p>
            {user.phone && <p className="text-sm text-slate-500">{user.phone}</p>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm">
          <div>
            <p className="text-slate-400">Role</p>
            <p className="mt-1 font-medium capitalize text-slate-800">{user.role}</p>
          </div>
          <div>
            <p className="text-slate-400">Account Status</p>
            <p className={`mt-1 font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Verified</p>
            <p className={`mt-1 font-medium ${user.isVerified ? 'text-green-600' : 'text-amber-500'}`}>
              {user.isVerified ? 'Yes' : 'Pending'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Button variant="danger" onClick={() => logout.mutate()} loading={logout.isPending}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
