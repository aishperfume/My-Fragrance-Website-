import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types/product';
import { asset } from '../data/products';

interface ToastState {
  visible: boolean;
  message: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  subtotalPKR: number;
  promoCode: string;
  setPromoCode: (c: string) => void;
  appliedDiscount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  toast: ToastState;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'khawaja_cart_items_v3';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      try {
        localStorage.removeItem('khawaja_cart_items_v1');
        localStorage.removeItem('khawaja_cart_items_v2');
      } catch {
        // ignore
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'cyan-nori-50ml',
        productId: 'cyan-nori',
        name: 'Cyan Nori',
        size: '50ml',
        price: 27500,
        quantity: 1,
        image: asset('/images/perfume-cyan-nori.jpg')
      }
    ];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '' });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...newItem, quantity }];
    });
    showToast(`${newItem.name} (${newItem.size.toUpperCase()}) — ADDED TO BAG`);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'RADICAL10' || clean === 'ABEL10') {
      setAppliedDiscount(0.1);
      return { success: true, message: '10% Botanical Discount Applied' };
    }
    if (clean === 'DISCOVERY50') {
      setAppliedDiscount(0.2);
      return { success: true, message: 'PKR 5,000 Sample Credit Applied (20% Off)' };
    }
    return { success: false, message: 'Invalid or Expired Code' };
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        subtotalPKR: subtotal,
        promoCode,
        setPromoCode,
        appliedDiscount,
        applyPromo,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
