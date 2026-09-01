'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { checkoutSchema, type CheckoutInput } from '@zavora/validation';
import { addressesApi, deliveryApi } from '@zavora/api';
import { useCartQuery } from '@/features/cart/hooks/useCart';
import { useCreateOrder } from '@/features/orders/hooks/useOrders';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@zavora/utils';
import { ROUTES } from '@zavora/config';

const STEPS = ['Address', 'Delivery', 'Review & Pay'] as const;

export function CheckoutView() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { data: cart } = useCartQuery();
  const { data: addresses } = useQuery({ queryKey: ['addresses'], queryFn: addressesApi.list });
  const { data: deliveryMethods } = useQuery({
    queryKey: ['delivery-methods'],
    queryFn: deliveryApi.methods,
  });
  const createOrder = useCreateOrder();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutInput>({ resolver: zodResolver(checkoutSchema) });

  const selectedAddressId = watch('addressId');
  const selectedDeliveryId = watch('deliveryMethodId');

  const onSubmit = (data: CheckoutInput) => {
    createOrder.mutate(data, {
      onSuccess: (order) => router.push(ROUTES.orderConfirmation(order.id)),
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i <= step ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm font-medium ${i === step ? 'text-slate-900' : 'text-slate-400'}`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <div className="h-px w-8 bg-slate-200" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Step 0: Address */}
          {step === 0 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Select Delivery Address</h2>
              {!addresses?.length && (
                <p className="text-sm text-slate-400">No saved addresses. Please add one.</p>
              )}
              <div className="flex flex-col gap-3">
                {addresses?.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                      Number(selectedAddressId) === addr.id
                        ? 'border-primary bg-orange-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={addr.id}
                      {...register('addressId', { valueAsNumber: true })}
                      className="mt-1 accent-primary"
                    />
                    <div className="text-sm">
                      <p className="font-medium">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-slate-500">
                        {addr.addressLine1}, {addr.city}, {addr.state}
                      </p>
                      <p className="text-slate-500">{addr.phone}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.addressId && (
                <p className="mt-2 text-xs text-red-500">{errors.addressId.message}</p>
              )}
              <Button
                type="button"
                className="mt-6"
                onClick={() => setStep(1)}
                disabled={!selectedAddressId}
              >
                Continue to Delivery
              </Button>
            </div>
          )}

          {/* Step 1: Delivery */}
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Select Delivery Method</h2>
              <div className="flex flex-col gap-3">
                {deliveryMethods?.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                      Number(selectedDeliveryId) === method.id
                        ? 'border-primary bg-orange-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      {...register('deliveryMethodId', { valueAsNumber: true })}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex flex-1 justify-between text-sm">
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-slate-500">{method.estimatedDays}</p>
                      </div>
                      <p className="font-semibold">
                        {parseFloat(method.price) === 0 ? 'Free' : formatPrice(method.price)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.deliveryMethodId && (
                <p className="mt-2 text-xs text-red-500">{errors.deliveryMethodId.message}</p>
              )}
              <div className="mt-6 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedDeliveryId}
                >
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Review & Pay */}
          {step === 2 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold">Review & Place Order</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
                <p className="font-medium text-slate-700">
                  Payment is processed securely by our payment provider.
                </p>
                <p className="mt-1 text-slate-400">
                  You will be redirected to complete payment after placing your order.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" loading={createOrder.isPending} size="lg">
                  Place Order
                </Button>
              </div>
              {createOrder.error && (
                <p className="mt-3 text-sm text-red-500">{createOrder.error.message}</p>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Cart summary */}
      {cart && (
        <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 text-sm">
          <h2 className="mb-4 font-semibold text-slate-900">
            Order Summary ({cart.itemCount} items)
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            {parseFloat(cart.discount) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(cart.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery</span>
              <span>
                {parseFloat(cart.deliveryFee) === 0 ? 'Free' : formatPrice(cart.deliveryFee)}
              </span>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 font-semibold">
              <span>Total</span>
              <span className="text-lg">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
