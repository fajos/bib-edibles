import { CompanyInfo, BankDetails, Product, Currency } from '../types';

export const COMPANY_INFO: CompanyInfo = {
  name: "BIB EDIBLES 'N' MART LIMITED",
  rcNumber: "7324268",
  registrationDate: "Jan 31, 2024",
  type: "PRIVATE COMPANY LIMITED BY SHARES",
  registeredAddress: "NO.18, JEDO ESTATE, ILE-IFE STREET, LUGBE, ABUJA, FCT, NIGERIA",
  headOfficeAddress: "Shop 11/12 Inya Halima Plaza, Jedo Road, Lugbe Airport Road, Abuja",
  email: "SIMONSUNDAY378@GMAIL.COM",
  phone1: "07019884524",
  phone2: "07038735185",
  whatsapp: "+2347019884524",
  status: "ACTIVE",
  principalActivity: "DEALS IN ALL KINDS OF SALES, SUPPLY, RETAIL AND EXPORTATION OF FOODSTUFFS, BEVERAGES, AND RELATED ITEMS"
};

export const BANK_DETAILS: BankDetails = {
  bankName: "Zenith Bank PLC",
  accountName: "BIB EDIBLES 'N' MART LIMITED",
  accountNumber: "1228945032",
  swiftCode: "ZEIBNGLA",
  sortCode: "057150013"
};

export const DEFAULT_CURRENCIES: Record<string, Currency> = {
  NGN: { code: 'NGN', symbol: '₦', rate: 1, label: 'Nigerian Naira' },
  USD: { code: 'USD', symbol: '$', rate: 0.00067, label: 'US Dollar ($1 = ₦1,500)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.00052, label: 'British Pound (£1 = ₦1,920)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.00061, label: 'Euro (€1 = ₦1,640)' }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Premium Handpicked Egusi (Melon Seeds)",
    category: "Grains & Flours",
    description: "Sieved, stone-free, unadulterated Nigerian melon seed (Egusi) processed under hygienic conditions. Vacuum-packed for long shelf life and international shipping.",
    priceNgn: 14500,
    weightKg: 2,
    weightOptions: [
      { label: "1kg Pack", priceNgn: 7500, weightKg: 1 },
      { label: "2kg Export Pack", priceNgn: 14500, weightKg: 2 },
      { label: "5kg Family Tub", priceNgn: 35000, weightKg: 5 },
      { label: "10kg Bag", priceNgn: 68000, weightKg: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: true,
    unit: "kg"
  },
  {
    id: "p2",
    name: "Pure Red Palm Oil (Unadulterated Nsukka Grade)",
    category: "Spices & Oils",
    description: "100% pure organic red palm oil extracted from fresh oil palm fruit. Free from artificial colors or chemicals. Leak-proof sealed containers certified for international air freight.",
    priceNgn: 12000,
    weightKg: 4,
    weightOptions: [
      { label: "1 Liter Bottle", priceNgn: 3500, weightKg: 1 },
      { label: "4 Liter Keg", priceNgn: 12000, weightKg: 4 },
      { label: "10 Liter Jerrycan", priceNgn: 28000, weightKg: 10 },
      { label: "25 Liter Export Drum", priceNgn: 68000, weightKg: 25 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: true,
    unit: "liter"
  },
  {
    id: "p3",
    name: "Dehydrated Oron Crayfish (Ground & Whole)",
    category: "Dried Fish & Meat",
    description: "Original Akwa Ibom Oron Crayfish. Sweet, aromatic, thoroughly washed and oven-dried to eliminate sand and dirt. Perfect for soups and stews.",
    priceNgn: 9500,
    weightKg: 1,
    weightOptions: [
      { label: "500g Bag", priceNgn: 5000, weightKg: 0.5 },
      { label: "1kg Export Pack", priceNgn: 9500, weightKg: 1 },
      { label: "3kg Paint Bucket", priceNgn: 27000, weightKg: 3 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: true,
    unit: "kg"
  },
  {
    id: "p4",
    name: "Ijebu Garri (Crispy Yellow & White)",
    category: "Grains & Flours",
    description: "Authentic sour, crunchy Ijebu Garri. Well-sieved with low starch content. Excellent for soaking with ice water or making smooth Eba.",
    priceNgn: 8500,
    weightKg: 5,
    weightOptions: [
      { label: "2kg Bag", priceNgn: 3800, weightKg: 2 },
      { label: "5kg Export Bag", priceNgn: 8500, weightKg: 5 },
      { label: "10kg Bag", priceNgn: 16500, weightKg: 10 },
      { label: "25kg Sack", priceNgn: 40000, weightKg: 25 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: false,
    unit: "bag"
  },
  {
    id: "p5",
    name: "Smoked Mangrove Catfish & Stockfish Bits",
    category: "Dried Fish & Meat",
    description: "Hygenically smoked river catfish and imported Icelandic stockfish cuts. Deboned, moisture-drained, and vacuum-sealed for zero odor during flight transport.",
    priceNgn: 18500,
    weightKg: 1.5,
    weightOptions: [
      { label: "1kg Smoked Catfish", priceNgn: 12500, weightKg: 1 },
      { label: "1.5kg Combined Fish Box", priceNgn: 18500, weightKg: 1.5 },
      { label: "3kg Export Deluxe Pack", priceNgn: 35000, weightKg: 3 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: true,
    unit: "pack"
  },
  {
    id: "p6",
    name: "Ultimate Diaspora Kitchen Export Bundle (15kg)",
    category: "Export Bundles",
    description: "Complete starter crate for Nigerians abroad: 3kg Egusi, 3kg Ogbono, 2L Palm Oil, 2kg Crayfish, 3kg Yam Flour (Elubo), 2kg Suya Pepper & Dried Vegetables (Ugu/Uziza). All export certified.",
    priceNgn: 125000,
    weightKg: 15,
    weightOptions: [
      { label: "15kg Diaspora Starter Crate", priceNgn: 125000, weightKg: 15 },
      { label: "30kg Mega Family Export Box", priceNgn: 235000, weightKg: 30 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: true,
    unit: "crate"
  },
  {
    id: "p7",
    name: "Pounded Yam Flour (Iyan Flakes)",
    category: "Grains & Flours",
    description: "100% pure yam flour milled from selected white yams. Guaranteed lump-free, stretchy, and smooth pounded yam in 5 minutes.",
    priceNgn: 11000,
    weightKg: 4,
    weightOptions: [
      { label: "2kg Bag", priceNgn: 5800, weightKg: 2 },
      { label: "4kg Export Pack", priceNgn: 11000, weightKg: 4 },
      { label: "10kg Bag", priceNgn: 26000, weightKg: 10 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: false,
    unit: "kg"
  },
  {
    id: "p8",
    name: "Aromatic Kano Suya Pepper & Yaji Mix",
    category: "Spices & Oils",
    description: "Authentic Northern Nigerian Yaji spice mix made from ground kuli-kuli, ginger, garlic, chili, and secret suya herbs. Sealed shaker jar.",
    priceNgn: 4500,
    weightKg: 0.5,
    weightOptions: [
      { label: "250g Jar", priceNgn: 2500, weightKg: 0.25 },
      { label: "500g Jar", priceNgn: 4500, weightKg: 0.5 },
      { label: "1kg Export Tub", priceNgn: 8500, weightKg: 1 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: false,
    unit: "jar"
  },
  {
    id: "p9",
    name: "Sun-Dried Ugu, Bitter Leaf & Uziza Combo",
    category: "Local Foodstuffs",
    description: "Oven-dehydrated indigenous leaves carefully washed and preserved. Retains full color, flavor, and nutritional value. Ready for soup instantly.",
    priceNgn: 6500,
    weightKg: 0.5,
    weightOptions: [
      { label: "3-Leaf Combo Pack (300g)", priceNgn: 4000, weightKg: 0.3 },
      { label: "5-Leaf Export Pack (600g)", priceNgn: 6500, weightKg: 0.6 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: false,
    unit: "pack"
  },
  {
    id: "p10",
    name: "Organic Hibiscus Flowers (Zobo Leaves)",
    category: "Beverages & Snacks",
    description: "Deep red, clean Nigerian dried hibiscus petals. Rich in vitamin C and antioxidants. Great for Zobo drink and herbal tea infusion.",
    priceNgn: 5500,
    weightKg: 1,
    weightOptions: [
      { label: "500g Bag", priceNgn: 3000, weightKg: 0.5 },
      { label: "1kg Export Bag", priceNgn: 5500, weightKg: 1 },
      { label: "5kg Bulk Sack", priceNgn: 24000, weightKg: 5 }
    ],
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    isExportReady: true,
    nafdacApproved: true,
    featured: false,
    unit: "kg"
  }
];

export const ESTIMATED_SHIPPING_RATES = {
  local: {
    abuja: { name: "Abuja City Delivery (Same/Next Day)", feeNgn: 2500 },
    lagos: { name: "Lagos & Western States Express", feeNgn: 5000 },
    portHarcourt: { name: "Port Harcourt & Eastern States", feeNgn: 5500 },
    otherStates: { name: "Other Nigerian States Courier", feeNgn: 6500 }
  },
  international: {
    uk: { name: "United Kingdom Air Freight (3-5 Days)", baseFeeNgn: 35000, perKgNgn: 4500 },
    usaCanada: { name: "USA & Canada Cargo Express (4-7 Days)", baseFeeNgn: 45000, perKgNgn: 5500 },
    europe: { name: "EU Countries Cargo (4-6 Days)", baseFeeNgn: 40000, perKgNgn: 5000 },
    restOfWorld: { name: "Rest of World International Express", baseFeeNgn: 55000, perKgNgn: 6500 }
  }
};
