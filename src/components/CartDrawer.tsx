import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useNavigation } from '../context/NavigationContext';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeFromCart,
    updateQuantity,
    totalCount,
    subtotal,
    promoCode,
    setPromoCode,
    appliedDiscount,
    applyPromo,
    clearCart,
    showToast,
  } = useCart();

  const { formatPrice, getProduct } = useProducts();
  const { navigateTo } = useNavigation();
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const FREE_SHIPPING_MIN = 15000;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));
  const remainingForFree = Math.max(0, FREE_SHIPPING_MIN - subtotal);

  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode) return;
    const res = applyPromo(promoCode);
    setPromoMessage({ text: res.message, error: !res.success });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      closeCart();
      showToast('ORDER DISPATCHED — CHECK YOUR EMAIL FOR DISPATCH DOSSIER');
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-[80] flex justify-end transition-all duration-300 ease-out ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md bg-surface h-full flex flex-col justify-between z-10 border-l border-[#c4c7c7] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-[#c4c7c7] flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="font-headline-sm uppercase text-primary tracking-wider text-base">
              Curated Bag
            </span>
            <span className="font-mono-spec text-xs bg-primary text-on-primary px-2 py-0.5">
              {totalCount} ITEMS
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close Bag"
            className="w-8 h-8 flex items-center justify-center text-primary hover:text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="px-6 py-3 bg-surface-container border-b border-[#c4c7c7]">
          <div className="flex items-center justify-between font-mono-label text-[11px] uppercase tracking-wider text-on-surface-variant mb-1.5">
            <span>
              {remainingForFree === 0
                ? '✦ COMPLIMENTARY CLINICAL SHIPPING UNLOCKED'
                : `ADD ${formatPrice(remainingForFree)} FOR FREE SHIPPING`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-[#dbdad7] overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items Container */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <span className="material-symbols-outlined text-4xl text-outline">shopping_bag</span>
              <p className="font-headline-sm uppercase text-primary text-base">Your Bag Is Empty</p>
              <p className="font-body-sm text-on-surface-variant max-w-xs">
                Explore our 100% natural, biotechnological olfactory formulations.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigateTo('shop');
                }}
                className="mt-4 px-6 py-3 bg-primary text-on-primary font-button-text uppercase tracking-widest text-xs hover:bg-[#333333] transition-colors"
              >
                DISCOVER FRAGRANCES
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-[#efeeeb] last:border-0 items-start"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 bg-surface-container-lowest flex items-center justify-center p-2 border border-[#e2e0d8] flex-shrink-0">
                  <img
                    src={getProduct(item.productId)?.images.main || item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between h-24">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-headline-sm uppercase text-sm tracking-wide text-primary">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-outline hover:text-error transition-colors"
                        title="Remove Item"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider block mt-0.5">
                      {item.size.toUpperCase()} FLACON
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#c4c7c7] bg-surface-container-lowest">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container font-mono-spec text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono-spec text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface-container font-mono-spec text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Unit Price */}
                    <span className="font-mono-spec text-sm font-semibold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#c4c7c7] bg-surface-container-low space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO (e.g. RADICAL10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-surface-container-lowest border border-[#c4c7c7] font-mono-label text-xs uppercase placeholder:text-outline focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-surface-container-high border border-[#c4c7c7] font-button-text text-xs uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
              >
                APPLY
              </button>
            </form>

            {promoMessage && (
              <p
                className={`font-mono-label text-[10px] uppercase tracking-wider ${
                  promoMessage.error ? 'text-error' : 'text-secondary font-bold'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 pt-2 border-t border-[#c4c7c7] font-mono-label text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>SUBTOTAL</span>
                <span className="font-mono-spec">{formatPrice(subtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-secondary">
                  <span>BOTANICAL DISCOUNT ({(appliedDiscount * 100).toFixed(0)}%)</span>
                  <span className="font-mono-spec">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-on-surface-variant">
                <span>ESTIMATED SHIPPING</span>
                <span className="font-mono-spec">
                  {remainingForFree === 0 ? 'FREE' : formatPrice(500)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-[#c4c7c7]">
                <span className="font-headline-sm uppercase tracking-wider">TOTAL</span>
                <span className="font-mono-spec text-base">
                  {formatPrice(finalTotal + (remainingForFree === 0 ? 0 : 500))}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-primary text-on-primary font-button-text uppercase tracking-widest text-xs hover:bg-[#333333] transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isCheckingOut ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                  <span>PREPARING DISPATCH...</span>
                </>
              ) : (
                <>
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>

            <p className="text-center font-mono-label text-[9px] text-outline uppercase tracking-wider">
              INCLUDES COMPLIMENTARY 2ML VIAL FOR SKIN TESTING · ZERO RISK RETURN
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
