'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressesApi } from '@zavora/api';
import { addressSchema, type AddressInput } from '@zavora/validation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui';
import { Plus, Trash2 } from 'lucide-react';

export function AddressesView() {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressesApi.list,
  });

  const createAddress = useMutation({
    mutationFn: (data: AddressInput) => addressesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setShowForm(false);
      reset();
    },
  });

  const deleteAddress = useMutation({
    mutationFn: (id: number) => addressesApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">My Addresses</h1>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit((d) => createAddress.mutate(d))}
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="mb-4 font-semibold text-slate-900">New Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" error={errors.firstName?.message} {...register('firstName')} />
            <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
            <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
            <Input label="Address" error={errors.addressLine1?.message} {...register('addressLine1')} className="col-span-2" />
            <Input label="City" error={errors.city?.message} {...register('city')} />
            <Input label="State" error={errors.state?.message} {...register('state')} />
            <Input label="Country" error={errors.country?.message} {...register('country')} />
            <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode')} />
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" loading={createAddress.isPending}>Save Address</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {isLoading && <p className="text-sm text-slate-400">Loading…</p>}

      {!isLoading && !addresses?.length && (
        <div className="flex flex-col items-center py-12 text-slate-400">
          <span className="text-4xl">📍</span>
          <p className="mt-3 text-sm">No saved addresses yet.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {addresses?.map((addr) => (
          <div key={addr.id} className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <p className="font-medium text-slate-800">{addr.firstName} {addr.lastName}</p>
                {addr.isDefault && <Badge variant="info">Default</Badge>}
              </div>
              <p className="mt-1 text-slate-500">{addr.addressLine1}</p>
              <p className="text-slate-500">{addr.city}, {addr.state}, {addr.country}</p>
              <p className="text-slate-500">{addr.phone}</p>
            </div>
            <button
              onClick={() => deleteAddress.mutate(addr.id)}
              className="rounded-lg p-1.5 text-red-400 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
