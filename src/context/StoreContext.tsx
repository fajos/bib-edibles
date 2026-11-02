import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Category,
  CurrencyCode,
  Currency,
  OrderStatus,
  ProductWeightOption
} from '../types';
import {
  INITIAL_PRODUCTS,
  DEFAULT_CURRENCIES,
  COMPANY_INFO,
  BANK_DETAILS
} from '../data/initialData';

export type ModalType =
  | 'none'
  | 'cart'
  | 'checkout'
  | 'order_confirmation'
  | 'order_tracking'
  | 'product_detail'
  | 'admin'
  | 'pricing_proposal'
  | 'about_us';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, selectedOption?: ProductWeightOption, qty?: number) => void;
  removeFromCart: (productId: string, optionLabel?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, optionLabel?: string) => void;
  clearCart: () => void;

  currencies: Record<CurrencyCode, Currency>;
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceNgn: number) => string;
  convertPrice: (priceNgn: number) => { amount: number; symbol: string; code: string };

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (c: Category) => void;

  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, orderStatus: OrderStatus, paymentStatus?: 'pending' | 'verified' | 'failed') => void;
  uploadBankReceipt: (orderId: string, receiptUrl: string, refText: string) => void;

  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;

  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (p: Product | null) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (o: Order | null) => void;

  updateExchangeRates: (newRates: Partial<Record<CurrencyCode, number>>) => void;
  totalCartWeightKg: number;
  totalCartNgn: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bib_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bib_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Currencies state
  const [currencies, setCurrencies] = useState<Record<CurrencyCode, Currency>>(() => {
    const saved = localStorage.getItem('bib_currencies');
    return saved ? JSON.parse(saved) : DEFAULT_CURRENCIES;
  });

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('NGN');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bib_orders');
    if (saved) return JSON.parse(saved);
    // Initial sample order for demonstration
    return [
      {
        id: "BIB-73821",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        items: [
          { product: INITIAL_PRODUCTS[0], selectedWeightOption: INITIAL_PRODUCTS[0].weightOptions?.[1], quantity: 1 },
          { product: INITIAL_PRODUCTS[1], selectedWeightOption: INITIAL_PRODUCTS[1].weightOptions?.[1], quantity: 1 }
        ],
        shippingAddress: {
          fullName: "Dr. Chioma Okonkwo",
          email: "chioma.okonkwo@example.com",
          phone: "+44 7700 900077",
          address: "42 Greenwich High Road",
          city: "London",
          state: "Greater London",
          country: "United Kingdom",
          postalCode: "SE10 8JL",
          deliveryNotes: "Please handle red palm oil keg with extra care."
        },
        shippingType: "international",
        shippingCostNgn: 39500,
        subtotalNgn: 26500,
        totalNgn: 66000,
        currencyCode: "GBP",
        totalInCurrency: 34.38,
        paymentMethod: "bank_transfer",
        paymentStatus: "pending",
        orderStatus: "pending_payment",
        transferReference: "REF-2024-88492"
      }
    ];
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('bib_admin_auth') === 'true';
  });

  // Modals
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('bib_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bib_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bib_currencies', JSON.stringify(currencies));
  }, [currencies]);

  useEffect(() => {
    localStorage.setItem('bib_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bib_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Cart operations
  const addToCart = (product: Product, selectedOption?: ProductWeightOption, qty: number = 1) => {
    setCart(prevCart => {
      const optionLabel = selectedOption ? selectedOption.label : 'default';
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id &&
          (item.selectedWeightOption?.label ?? 'default') === optionLabel
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { product, selectedWeightOption: selectedOption, quantity: qty }];
      }
    });
    setActiveModal('cart');
  };

  const removeFromCart = (productId: string, optionLabel?: string) => {
    setCart(prev => prev.filter(item => {
      if (item.product.id !== productId) return true;
      const label = item.selectedWeightOption?.label ?? 'default';
      return label !== (optionLabel ?? 'default');
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number, optionLabel?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, optionLabel);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const label = item.selectedWeightOption?.label ?? 'default';
        if (label === (optionLabel ?? 'default')) {
          return { ...item, quantity };
        }
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Price formatting and conversion
  const setCurrency = (code: CurrencyCode) => {
    setCurrentCurrency(code);
  };

  const convertPrice = (priceNgn: number) => {
    const curr = currencies[currentCurrency] || DEFAULT_CURRENCIES.NGN;
    const amount = priceNgn * curr.rate;
    return {
      amount,
      symbol: curr.symbol,
      code: curr.code
    };
  };

  const formatPrice = (priceNgn: number): string => {
    const { amount, symbol, code } = convertPrice(priceNgn);
    if (code === 'NGN') {
      return `${symbol}${Math.round(amount).toLocaleString('en-NG')}`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  // Weight and Total calculations
  const totalCartWeightKg = cart.reduce((sum, item) => {
    const weight = item.selectedWeightOption?.weightKg ?? item.product.weightKg;
    return sum + (weight * item.quantity);
  }, 0);

  const totalCartNgn = cart.reduce((sum, item) => {
    const price = item.selectedWeightOption?.priceNgn ?? item.product.priceNgn;
    return sum + (price * item.quantity);
  }, 0);

  // Orders handlers
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setLastCreatedOrder(order);
    clearCart();
    setActiveModal('order_confirmation');
  };

  const updateOrderStatus = (
    orderId: string,
    orderStatus: OrderStatus,
    paymentStatus?: 'pending' | 'verified' | 'failed'
  ) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          orderStatus,
          paymentStatus: paymentStatus ?? ord.paymentStatus
        };
      }
      return ord;
    }));
  };

  const uploadBankReceipt = (orderId: string, receiptUrl: string, refText: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          bankReceiptUrl: receiptUrl,
          transferReference: refText,
          paymentStatus: 'pending',
          orderStatus: 'pending_payment'
        };
      }
      return ord;
    }));
  };

  // Admin handlers
  const loginAdmin = (pass: string) => {
    if (pass === 'admin123' || pass === 'bib2024') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const updateExchangeRates = (newRates: Partial<Record<CurrencyCode, number>>) => {
    setCurrencies(prev => {
      const updated = { ...prev };
      (Object.keys(newRates) as CurrencyCode[]).forEach(code => {
        if (updated[code] && newRates[code]) {
          updated[code] = {
            ...updated[code],
            rate: newRates[code]!
          };
        }
      });
      return updated;
    });
  };

  return (
    <StoreContext.Provider value={{
      products,
      setProducts,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      currencies,
      currentCurrency,
      setCurrency,
      formatPrice,
      convertPrice,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      orders,
      addOrder,
      updateOrderStatus,
      uploadBankReceipt,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      activeModal,
      setActiveModal,
      selectedProductForModal,
      setSelectedProductForModal,
      lastCreatedOrder,
      setLastCreatedOrder,
      updateExchangeRates,
      totalCartWeightKg,
      totalCartNgn
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
