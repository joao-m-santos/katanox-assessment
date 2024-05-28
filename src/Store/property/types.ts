export interface IPropertyData {
  id: string;
  name: string;
  domain: string;
  addressLine1: string;
  postcode: string;
  city: string;
  country: string;
  rooms: number;
  currency: string;
  timezone: string;
  starRating: number;
  description: string;
  phoneNumber?: string;
  email?: string;
  status: boolean;
  checkInTime: string;
  checkOutTime: string;
  isAvailableForPartnerships: boolean;
  images: Array<{
    id: string;
    url: string;
    width: number;
    height: number;
  }>;
}

export type PolicyType = 'noShowPolicies' | 'cancellationPolicies';

export interface IPropertyPolicy {
  id: string;
  name: string;
  description: string;
  amount: number;
  chargeType: string;
}

export interface IPropertyCancellationPolicy extends IPropertyPolicy {
  reference: string;
  days: number;
  hours: number;
}

export interface IPropertyObject {
  property: IPropertyData;
  policies: {
    noShowPolicies: Array<IPropertyPolicy>;
    cancellationPolicies: Array<IPropertyCancellationPolicy>;
  };
}

export interface PropertyState {
  properties: {
    data: Array<IPropertyObject> | null;
    isLoading: boolean;
  };
}

export interface SetPropertyActionPayload {
  propertyId: string;
  policyType: PolicyType;
  policyData: IPropertyPolicy | IPropertyCancellationPolicy;
}
