export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Conversion rate relative to NGN
  label: string;
}

export type Category =
  | 'All'
  | 'Local Foodstuffs'
  | 'Export Bundles'
  | 'Grains & Flours'
  | 'Spices & Oils'
  | 'Dried Fish & Meat'
  | 'Beverages & Snacks';

export interface ProductWeightOption {
  label: string; // e.g., '1kg', '5kg', '10kg', '25kg'
  priceNgn: number;
  weightKg: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  priceNgn: number;
  weightKg: number;
  weightOptions?: ProductWeightOption[];
  imageUrl: string;
  inStock: boolean;
  isExportReady: boolean;
  nafdacApproved?: boolean;
  featured?: boolean;
  unit: string; // e.g., 'kg', 'liter', 'pack', 'bag', 'paint tub'
}

export interface CartItem {
  product: Product;
  selectedWeightOption?: ProductWeightOption;
  quantity: number;
}

export type PaymentMethod = 'bank_transfer' | 'card_payment';

export type OrderStatus =
  | 'pending_payment'
  | 'payment_verified'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string; // e.g., BIB-73821
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingType: 'local' | 'international';
  shippingCostNgn: number;
  subtotalNgn: number;
  totalNgn: number;
  currencyCode: CurrencyCode;
  totalInCurrency: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'verified' | 'failed';
  orderStatus: OrderStatus;
  bankReceiptUrl?: string;
  transferReference?: string;
}

export interface CompanyInfo {
  name: string;
  rcNumber: string;
  registrationDate: string;
  type: string;
  registeredAddress: string;
  headOfficeAddress: string;
  email: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  status: string;
  principalActivity: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode?: string;
  sortCode?: string;
}
