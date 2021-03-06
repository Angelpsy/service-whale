export enum StatusesLead {
  NEW = 'NEW',
  DISMISSED = 'DISMISSED',
  IN_PROGRESS = 'IN_PROGRESS',
  ESTIMATE_SCHEDULED = 'ESTIMATE_SCHEDULED',
  PENDING_ACCEPTANCE = 'PENDING_ACCEPTANCE',
  SERVICE_SCHEDULED = 'SERVICE_SCHEDULED',
  COMPLETED = 'COMPLETED',
  LOST = 'LOST',
}

export interface Price {
  amount: number;
  curr: string;
  symbol: string;
}

export interface CustomerInfo {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Lead {
  id: number;
  leadStatus: StatusesLead;
  statusComment: string;
  customerInfo: CustomerInfo;
  job: string;
  price: Price;
  /**
   * Timestamp
   */
  updatedDate: number;
  serviceAddress: string;
  serviceAddressRaw: string;
  billingAddress: string;
  billingAddressRaw: string;
}
