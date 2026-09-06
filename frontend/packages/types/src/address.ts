export interface Address {
  id: number;
  label?: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
}

export type CreateAddressPayload = Omit<Address, 'id'>;
