import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  ArrowRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Check,
  Play,
  Lock,
  CreditCard,
  Truck,
  Trash2,
  Edit2,
  ClipboardList,
  Package,
  Ruler
} from 'lucide-react';

// --- Configuration & Assets ---

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
`;

// --- Mock Data ---

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "The Mysore Heritage",
    subtitle: "Teak & Raw Silk",
    category: "Living",
    price: 85000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    description: "A dialogue between past and present. Hand-carved teak frame tailored with Mysore raw silk.",
    details: "Solid Teak Wood | 100% Raw Silk Upholstery | Hand-finished | 4-6 Weeks Delivery",
  },
  {
    id: 2,
    name: "Jaipur Low-Chair",
    subtitle: "Solid Oak",
    category: "Lounge",
    price: 24500,
    oldPrice: 28000,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    description: "Minimalist geometry meets artisanal warmth. The Jaipur Low-Chair offers a grounded seating experience.",
    details: "Solid Oak | Natural Matte Finish | Ergonomic Design | Immediate Dispatch",
  },
  {
    id: 3,
    name: "Varanasi Lantern",
    subtitle: "Hand-beaten Brass",
    category: "Lighting",
    price: 12999,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1513506003011-3b03c80175e8?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1540932296774-3ed6930b9568?auto=format&fit=crop&w=1200&q=80",
    description: "Casting shadows that tell stories. Solid brass, hand-beaten by master craftsmen in Uttar Pradesh.",
    details: "Pure Brass | Oxidized Finish | E27 Bulb Holder | 2 Meters Cord",
  },
  {
    id: 4,
    name: "The Udaipur Bed",
    subtitle: "Four Poster Sheesham",
    category: "Bedroom",
    price: 145000,
    oldPrice: 160000,
    image: "https://images.unsplash.com/photo-1505693416388-b0346ef4174b?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1522771753035-0a15ca6b85db?auto=format&fit=crop&w=1200&q=80",
    description: "Sleep in architectural splendor. A contemporary take on the traditional four-poster bed.",
    details: "Solid Sheesham Wood | King Size | Honey Finish | Assembly Included",
  },
  {
    id: 5,
    name: "Kochi Dining Console",
    subtitle: "Rosewood Finish",
    category: "Dining",
    price: 92000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
    description: "Gather around greatness. The Kochi console blends colonial aesthetics with modern utility.",
    details: "Rosewood Veneer | Brass Inlays | 6 Drawers | 3 Weeks Delivery",
  },
  {
    id: 6,
    name: "Bombay Velvet",
    subtitle: "Accent Chair",
    category: "Lounge",
    price: 38000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    imageHover: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    description: "Soft to the touch, bold to the eye. Deep emerald velvet meets brushed gold accents.",
    details: "Premium Velvet | Gold Plated Legs | High Density Foam | 1 Week Delivery",
  }
];

const INITIAL_ORDERS = [
  { id: 'VISA-9281', date: '2024-10-24', customer: 'Rahul M.', total: 109999, status: 'Processing', items: 2 },
  { id: 'VISA-4421', date: '2024-10-23', customer: 'Priya S.', total: 12999, status: 'Shipped', items: 1 }
];

const CATEGORIES = ["All", "Living", "Bedroom", "Dining", "Lighting", "Lounge"];

// --- Utility Functions ---

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// --- Components ---

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 border border-gray-800 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center -ml-4 -mt-4 mix-blend-difference"
    >
      <div className="w-1 h-1 bg-white rounded-full"></div>
    </div>
  );
};

// --- Subtle Curtain Loader ---
const CurtainLoader = ({ onComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Step 1: Show Logo (0s)
    // Step 2: Fade text (1.5s)
    // Step 3: Slide Curtain Up (2.5s)
    
    const t1 = setTimeout(() => setAnimationStep(1), 500);
    const t2 = setTimeout(() => setAnimationStep(2), 2000);
    const t3 = setTimeout(() => onComplete(), 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#f9f8f6] transition-transform duration-1000 ease-in-out ${
        animationStep === 2 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className={`text-center transition-opacity duration-700 ${animationStep === 2 ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className={`font-serif text-6xl md:text-8xl text-[#1a1a1a] overflow-hidden`}>
          <span className={`inline-block transition-transform duration-1000 ${animationStep >= 1 ? 'translate-y-0' : 'translate-y-full'}`}>
            VISA
          </span>
        </h1>
        <div className={`mt-4 h-[1px] bg-[#a88b63] w-0 mx-auto transition-all duration-1000 delay-500 ${animationStep >= 1 ? 'w-24' : 'w-0'}`}></div>
        <p className={`mt-4 text-xs uppercase tracking-[0.3em] text-gray-500 transition-opacity duration-1000 delay-700 ${animationStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          The Atelier Edit
        </p>
      </div>
    </div>
  );
};

const Navigation = ({ cartCount, onOpenCart, searchQuery, setSearchQuery, onLogoClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 md:py-4 border-b border-gray-100' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex justify-between items-center">

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 touch-manipulation active:scale-95 transition-transform"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-gray-800">
            <button onClick={() => document.getElementById('collection').scrollIntoView({behavior: 'smooth'})} className="hover:text-[#a88b63] transition-colors">Collections</button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'})} className="hover:text-[#a88b63] transition-colors">Journal</button>
          </div>

          <div onClick={onLogoClick} className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer touch-manipulation transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-gray-900">VISA</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#a88b63] mt-0.5 md:mt-1 font-medium">The India Edit</p>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 -mr-2 md:mr-0 touch-manipulation active:scale-95 transition-transform"
              aria-label="Search"
            >
              <Search size={20} className="hover:text-[#a88b63] transition-colors" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 -mr-2 touch-manipulation active:scale-95 transition-transform"
              aria-label="Cart"
            >
              <ShoppingBag size={20} className="hover:text-[#a88b63] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#a88b63] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="px-4 md:px-12 pb-4 pt-2 bg-white border-t border-gray-100 mt-3 md:mt-4 animate-fade-in">
            <div className="max-w-[1800px] mx-auto relative">
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border-b border-gray-300 py-3 px-1 outline-none focus:border-[#a88b63] text-base transition-colors"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 touch-manipulation"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-2xl animate-slide-in-left">
            <div className="p-8 space-y-8">
              <div>
                <h2 className="font-serif text-3xl mb-2">VISA</h2>
                <p className="text-xs text-[#a88b63] uppercase tracking-widest">The India Edit</p>
              </div>
              <nav className="space-y-6">
                <button
                  onClick={() => { document.getElementById('collection').scrollIntoView({behavior: 'smooth'}); setMobileMenuOpen(false); }}
                  className="block text-left w-full text-lg font-light hover:text-[#a88b63] transition-colors touch-manipulation py-2"
                >
                  Collections
                </button>
                <button
                  onClick={() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'}); setMobileMenuOpen(false); }}
                  className="block text-left w-full text-lg font-light hover:text-[#a88b63] transition-colors touch-manipulation py-2"
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="group relative cursor-pointer touch-manipulation" onClick={() => onClick(product)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0] rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-active:scale-95 md:group-hover:scale-105"
          loading="lazy"
        />
        <img
          src={product.imageHover}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 md:group-hover:opacity-100"
          loading="lazy"
        />

        {product.oldPrice && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1.5 text-[9px] md:text-[10px] uppercase tracking-widest font-medium shadow-sm">
                Privilege Price
            </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0 flex justify-between items-end bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-white text-[10px] md:text-xs uppercase tracking-widest border-b border-white pb-1">View Details</span>
        </div>
      </div>

      <div className="mt-4 md:mt-6 text-center px-2">
        <p className="text-[10px] md:text-xs text-[#a88b63] uppercase tracking-widest mb-1.5 md:mb-2">{product.category}</p>
        <h3 className="font-serif text-xl md:text-2xl text-gray-900 mb-1 group-hover:text-[#a88b63] transition-colors leading-tight">{product.name}</h3>
        <p className="font-sans text-xs md:text-sm text-gray-500 font-light">{product.subtitle}</p>
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-2">
            {product.oldPrice && (
                <span className="text-gray-400 line-through text-xs md:text-sm">{formatCurrency(product.oldPrice)}</span>
            )}
            <p className="font-medium text-sm md:text-base">{formatCurrency(product.price)}</p>
        </div>
      </div>
    </div>
  );
};

// --- Dimension Modal ---
const DimensionModal = ({ isOpen, onClose, onConfirm, product }) => {
    const [dims, setDims] = useState({ width: '', depth: '', height: '' });

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-end md:items-center justify-center p-0 md:p-4 animate-fade-in">
            <div className="bg-white p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-slide-up rounded-t-2xl md:rounded-lg max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 touch-manipulation active:scale-95 transition-transform"><X size={20}/></button>

                <div className="text-center mb-6 md:mb-8 pt-2">
                    <Ruler size={28} md:size={32} className="mx-auto mb-3 md:mb-4 text-[#a88b63]" />
                    <h3 className="font-serif text-xl md:text-2xl mb-2">Bespoke Fit</h3>
                    <p className="text-xs md:text-sm text-gray-500 px-2">Please specify your preferred dimensions for the {product.name}.</p>
                </div>

                <div className="space-y-4 mb-6 md:mb-8">
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Width (cm)</label>
                            <input 
                                type="text" 
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#a88b63]"
                                value={dims.width}
                                onChange={e => setDims({...dims, width: e.target.value})}
                                placeholder="Std"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Depth (cm)</label>
                            <input 
                                type="text" 
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#a88b63]"
                                value={dims.depth}
                                onChange={e => setDims({...dims, depth: e.target.value})}
                                placeholder="Std"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Height (cm)</label>
                            <input 
                                type="text" 
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#a88b63]"
                                value={dims.height}
                                onChange={e => setDims({...dims, height: e.target.value})}
                                placeholder="Std"
                            />
                        </div>
                    </div>
                    <div>
                         <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Special Instructions</label>
                         <input 
                            type="text"
                            className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#a88b63]"
                            placeholder="E.g. Floor clearance, door width..."
                        />
                    </div>
                </div>

                <button
                    onClick={() => onConfirm(dims)}
                    className="w-full bg-[#1a1a1a] text-white py-4 md:py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#a88b63] transition-colors touch-manipulation active:scale-[0.98]"
                >
                    Confirm & Add to Cart
                </button>
                <button onClick={() => onConfirm({ width: 'Standard', depth: 'Standard', height: 'Standard' })} className="w-full mt-3 py-3 text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 touch-manipulation">Skip (Use Standard Size)</button>
            </div>
        </div>
    );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQty, removeItem, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 md:p-8 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-serif text-xl md:text-2xl">Your Selection</h2>
            <button onClick={onClose} className="p-2 -mr-2 touch-manipulation active:scale-95 hover:rotate-90 transition-transform duration-300"><X size={24} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="font-serif text-xl text-gray-900">Your bag is empty</p>
                <button onClick={onClose} className="text-xs uppercase tracking-widest border-b border-gray-400 text-gray-900 pb-1 hover:border-black transition-colors">
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 md:gap-6 animate-fade-in">
                  <div className="w-20 h-28 md:w-24 md:h-32 bg-gray-100 flex-shrink-0 overflow-hidden rounded-sm">
                    <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-base md:text-lg">{item.name}</h3>
                        <button onClick={() => removeItem(item.uniqueId)} className="p-1.5 -mt-1 -mr-1 touch-manipulation active:scale-95 text-gray-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.category}</p>
                      {item.dimensions && (
                          <p className="text-[10px] text-[#a88b63] mt-1">
                             Dims: {item.dimensions.width || 'Std'} x {item.dimensions.depth || 'Std'} x {item.dimensions.height || 'Std'}
                          </p>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button onClick={() => updateQty(item.uniqueId, -1)} className="p-2.5 md:p-2 hover:bg-gray-50 touch-manipulation active:bg-gray-100 transition-colors"><Minus size={14} /></button>
                        <span className="w-10 md:w-8 text-center text-sm md:text-xs font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.uniqueId, 1)} className="p-2.5 md:p-2 hover:bg-gray-50 touch-manipulation active:bg-gray-100 transition-colors"><Plus size={14} /></button>
                      </div>
                      <p className="font-medium text-sm md:text-base">{formatCurrency(item.price * item.qty)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 md:p-8 border-t border-gray-100 bg-[#f9f8f6] safe-bottom">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between mb-4 md:mb-6 text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-700 text-xs font-bold uppercase">Complimentary</span>
              </div>
              <div className="flex justify-between mb-6 md:mb-8 text-lg md:text-xl font-serif">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-[#1a1a1a] text-white py-4 md:py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#a88b63] transition-colors duration-300 touch-manipulation active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ProductDetailView = ({ product, onClose, onInitiateAdd }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-fade-in">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[70] p-2.5 md:p-3 rounded-full bg-white/95 backdrop-blur shadow-lg hover:rotate-90 transition-transform duration-300 touch-manipulation active:scale-95"
      >
        <X size={20} className="md:w-6 md:h-6" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="bg-[#f0f0f0] h-[45vh] md:h-[50vh] lg:h-screen relative overflow-hidden sticky top-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="eager" />
        </div>

        <div className="p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-[#f9f8f6] min-h-[55vh]">
          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <span className="text-[#a88b63] text-[10px] md:text-xs uppercase tracking-[0.2em]">{product.category}</span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mt-3 md:mt-4 mb-4 md:mb-6 text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
               <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl font-light">{formatCurrency(product.price)}</span>
                    {product.oldPrice && <span className="text-base md:text-lg text-gray-400 line-through">{formatCurrency(product.oldPrice)}</span>}
               </div>
               <div className="hidden md:block h-px w-12 bg-gray-300"></div>
               <div className="flex text-[#a88b63] text-xs">★★★★★</div>
            </div>

            <p className="text-gray-600 leading-relaxed font-light mb-6 md:mb-8 text-sm md:text-lg">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-200 py-4 md:py-6 mb-6 md:mb-8">
              <h4 className="text-[10px] md:text-xs uppercase tracking-widest mb-3 md:mb-4 font-medium">Specifications</h4>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{product.details || "Premium materials sourced globally."}</p>
            </div>

            <button
              onClick={() => { onInitiateAdd(product); }}
              className="w-full bg-[#1a1a1a] text-white py-4 md:py-5 text-xs uppercase tracking-[0.25em] hover:bg-[#a88b63] transition-colors duration-300 touch-manipulation active:scale-[0.98] sticky bottom-0 md:static"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutModal = ({ isOpen, onClose, cart, onComplete }) => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvv: ''
  });

  if (!isOpen) return null;

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step === 1) setStep(2);
      else if (step === 2) {
        setStep(3);
        setTimeout(() => {
            onComplete({
                id: `VISA-${Math.floor(Math.random() * 10000)}`,
                date: new Date().toISOString().split('T')[0],
                customer: formData.name || 'Guest',
                total: total,
                status: 'New',
                items: cart.length
            });
            onClose();
            setStep(1); 
        }, 3000);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl min-h-[600px] shadow-2xl flex flex-col animate-scale-in">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-serif text-2xl">Checkout</h2>
          {step < 3 && <button onClick={onClose}><X size={24} /></button>}
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
            {step === 3 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <Check size={40} />
                    </div>
                    <h3 className="font-serif text-3xl">Order Confirmed</h3>
                    <p className="text-gray-500 max-w-xs">Thank you for choosing VISA. Your timeless piece is being prepared for its journey.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-12 h-full">
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-xs uppercase tracking-widest border-b pb-2 mb-6">
                            {step === 1 ? 'Shipping Details' : 'Payment Information'}
                        </h3>
                        
                        {step === 1 && (
                            <>
                                <input required placeholder="Full Name" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                <input required type="email" placeholder="Email Address" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                <input required placeholder="Address Line 1" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="City" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                                    <input required placeholder="ZIP Code" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="bg-gray-50 p-4 rounded mb-4 flex items-center gap-4">
                                    <CreditCard size={20} className="text-gray-400"/>
                                    <span className="text-sm text-gray-500">Secure Encrypted Transaction</span>
                                </div>
                                <input required placeholder="Card Number" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.card} onChange={e => setFormData({...formData, card: e.target.value})} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="MM / YY" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
                                    <input required placeholder="CVV" type="password" className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#a88b63] transition-colors" value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} />
                                </div>
                            </>
                        )}
                    </form>

                    <div className="bg-[#f9f8f6] p-8 flex flex-col h-full">
                        <h3 className="text-xs uppercase tracking-widest mb-6">Order Summary</h3>
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.qty}x {item.name}</span>
                                    <span>{formatCurrency(item.price * item.qty)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                             <div className="flex justify-between text-sm text-gray-500">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-serif mt-4">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {step < 3 && (
            <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-white">
                {step === 2 ? (
                    <button type="button" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest hover:text-[#a88b63]">Back</button>
                ) : <div></div>}
                
                <button 
                    form="checkout-form"
                    disabled={loading}
                    className="bg-[#1a1a1a] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#a88b63] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? 'Processing...' : (step === 1 ? 'Continue to Payment' : 'Pay & Order')}
                    {!loading && <ArrowRight size={14} />}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = ({ products, orders, onAddProduct, onEditProduct, onDeleteProduct, onClose }) => {
  const [tab, setTab] = useState('inventory'); // inventory, orders
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({
      name: '', category: 'Living', price: '', oldPrice: '', description: '', image: ''
  });

  const handleEditClick = (product) => {
      setEditingId(product.id);
      setProductForm({
          name: product.name,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice || '',
          description: product.description,
          image: product.image
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
          ...productForm,
          id: editingId || Date.now(),
          price: Number(productForm.price),
          oldPrice: productForm.oldPrice ? Number(productForm.oldPrice) : null,
          subtitle: "Collection Piece",
          imageHover: productForm.image 
      };

      if (editingId) {
          onEditProduct(payload);
          setEditingId(null);
      } else {
          onAddProduct(payload);
      }
      setProductForm({ name: '', category: 'Living', price: '', oldPrice: '', description: '', image: '' });
  };

  return (
      <div className="fixed inset-0 bg-[#f9f8f6] z-[90] overflow-y-auto animate-fade-in p-8 lg:p-16">
          <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <h1 className="font-serif text-4xl mb-2">Atelier Management</h1>
                      <p className="text-gray-500 font-light">System Control</p>
                  </div>
                  <button onClick={onClose} className="text-xs uppercase tracking-widest border-b border-black pb-1">Exit Dashboard</button>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-200 mb-8">
                  <button onClick={() => setTab('inventory')} className={`pb-4 text-xs uppercase tracking-widest ${tab === 'inventory' ? 'border-b border-[#a88b63] text-[#a88b63]' : 'text-gray-400'}`}>Inventory</button>
                  <button onClick={() => setTab('orders')} className={`pb-4 text-xs uppercase tracking-widest ${tab === 'orders' ? 'border-b border-[#a88b63] text-[#a88b63]' : 'text-gray-400'}`}>Orders ({orders.length})</button>
              </div>

              {tab === 'inventory' && (
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="bg-white p-8 shadow-sm h-fit">
                        <h3 className="text-xs uppercase tracking-widest mb-6 border-b pb-2">{editingId ? 'Edit Item' : 'Add New Piece'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input required placeholder="Product Name" className="w-full border-b border-gray-200 py-2 outline-none text-sm" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="number" placeholder="Price (INR)" className="w-full border-b border-gray-200 py-2 outline-none text-sm" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                                <input type="number" placeholder="Old Price (Discount)" className="w-full border-b border-gray-200 py-2 outline-none text-sm" value={productForm.oldPrice} onChange={e => setProductForm({...productForm, oldPrice: e.target.value})} />
                            </div>
                            <select className="w-full border-b border-gray-200 py-2 outline-none text-sm bg-transparent" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}>
                                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input required placeholder="Image URL" className="w-full border-b border-gray-200 py-2 outline-none text-sm" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} />
                            <textarea required placeholder="Description" className="w-full border-b border-gray-200 py-2 outline-none text-sm h-20" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} />
                            
                            <div className="flex gap-2">
                                <button className="flex-1 bg-[#1a1a1a] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#a88b63] transition-colors">
                                    {editingId ? 'Update' : 'Publish'}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={() => { setEditingId(null); setProductForm({name:'',category:'Living',price:'',oldPrice:'',description:'',image:''}) }} className="px-4 border border-gray-200 hover:bg-gray-50">Cancel</button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 shadow-sm">
                            <h3 className="text-xs uppercase tracking-widest mb-6 border-b pb-2">Current Inventory ({products.length})</h3>
                            <div className="space-y-4">
                                {products.map(p => (
                                    <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <img src={p.image} alt="" className="w-16 h-16 object-cover" />
                                        <div className="flex-1">
                                            <h4 className="font-serif text-lg">{p.name}</h4>
                                            <div className="flex gap-2 text-xs text-gray-500 uppercase">
                                                <span>{p.category}</span>
                                                <span>•</span>
                                                <span className={p.oldPrice ? "text-red-500" : ""}>{formatCurrency(p.price)}</span>
                                                {p.oldPrice && <span className="line-through opacity-50">{formatCurrency(p.oldPrice)}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditClick(p)} className="text-gray-300 hover:text-[#a88b63] transition-colors"><Edit2 size={18} /></button>
                                            <button onClick={() => onDeleteProduct(p.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
              )}

              {tab === 'orders' && (
                  <div className="bg-white p-8 shadow-sm">
                       <h3 className="text-xs uppercase tracking-widest mb-6 border-b pb-2">Recent Orders</h3>
                       <table className="w-full text-sm text-left">
                           <thead className="text-xs uppercase text-gray-400 border-b">
                               <tr>
                                   <th className="pb-3 font-medium">Order ID</th>
                                   <th className="pb-3 font-medium">Date</th>
                                   <th className="pb-3 font-medium">Customer</th>
                                   <th className="pb-3 font-medium">Items</th>
                                   <th className="pb-3 font-medium">Total</th>
                                   <th className="pb-3 font-medium">Status</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                               {orders.map(order => (
                                   <tr key={order.id} className="hover:bg-gray-50">
                                       <td className="py-4 font-medium">{order.id}</td>
                                       <td className="py-4 text-gray-500">{order.date}</td>
                                       <td className="py-4">{order.customer}</td>
                                       <td className="py-4">{order.items}</td>
                                       <td className="py-4 font-medium">{formatCurrency(order.total)}</td>
                                       <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] uppercase tracking-wider rounded-full">{order.status}</span></td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                  </div>
              )}
          </div>
      </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Dimension Modal State
  const [dimModalOpen, setDimModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Logic
  const initiateAddToCart = (product) => {
      setPendingProduct(product);
      setDimModalOpen(true);
      if (selectedProduct) setSelectedProduct(null); // Close detail view if open
  };

  const finalizeAddToCart = (dimensions) => {
    const product = pendingProduct;
    setCart(prev => {
      // Create a unique ID based on dimensions to allow duplicate items with different sizes
      const uniqueId = `${product.id}-${dimensions.width || 'std'}-${dimensions.depth || 'std'}`;
      const exists = prev.find(i => i.uniqueId === uniqueId);
      
      if (exists) return prev.map(i => i.uniqueId === uniqueId ? { ...i, qty: i.qty + 1 } : i);
      
      return [...prev, { 
          ...product, 
          uniqueId, 
          qty: 1,
          dimensions: dimensions 
      }];
    });
    setDimModalOpen(false);
    setPendingProduct(null);
    setIsCartOpen(true);
  };

  const updateQty = (uniqueId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        const n = item.qty + delta;
        return n > 0 ? { ...item, qty: n } : item;
      }
      return item;
    }));
  };

  const removeItem = (uniqueId) => {
    setCart(prev => prev.filter(i => i.uniqueId !== uniqueId));
  };

  const handleOrderComplete = (newOrder) => {
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
  };

  // Admin Logic
  const handleAdminLogin = () => {
      if (adminPassword === 'admin123') {
          setShowAdmin(true);
          setShowAdminLogin(false);
          setAdminPassword('');
      } else {
          alert("Incorrect Access Key");
      }
  };

  const handleEditProduct = (updatedProduct) => {
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  // Loading Screen
  if (isLoading) {
    return (
        <>
            <style>{FONTS}</style>
            <CurtainLoader onComplete={() => setIsLoading(false)} />
        </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans selection:bg-[#a88b63] selection:text-white">
      <style>{FONTS}</style>
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .animate-slide-up { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.3s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes scaleIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }

        /* Mobile-optimized scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #a88b63; }

        /* Safe area for notched devices */
        .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }

        /* Touch optimization */
        * { -webkit-tap-highlight-color: transparent; }
        button { -webkit-touch-callout: none; }

        /* Smooth scroll on mobile */
        html { -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }

        /* Prevent zoom on input focus (iOS) */
        input, select, textarea { font-size: 16px; }
      `}</style>
      
      <CustomCursor />
      
      {/* Modals & Overlays */}
      <DimensionModal 
        isOpen={dimModalOpen} 
        onClose={() => setDimModalOpen(false)} 
        onConfirm={finalizeAddToCart} 
        product={pendingProduct} 
      />

      <ProductDetailView 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onInitiateAdd={initiateAddToCart} 
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onComplete={handleOrderComplete}
      />

      {/* Admin Login Modal */}
      {showAdminLogin && (
          <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white p-6 md:p-8 w-full max-w-md shadow-2xl rounded-lg">
                  <div className="flex justify-between mb-6">
                    <h3 className="font-serif text-xl md:text-2xl">Staff Access</h3>
                    <button onClick={() => setShowAdminLogin(false)} className="p-2 -mr-2 touch-manipulation active:scale-95"><X size={20}/></button>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Passkey (try 'admin123')"
                    className="w-full border-b border-gray-300 py-3 outline-none mb-6 text-base"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                  <button onClick={handleAdminLogin} className="w-full bg-[#1a1a1a] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#a88b63] transition-colors touch-manipulation active:scale-[0.98]">
                      Unlock Dashboard
                  </button>
              </div>
          </div>
      )}

      {/* Admin Dashboard */}
      {showAdmin && (
          <AdminDashboard 
            products={products}
            orders={orders}
            onAddProduct={(p) => setProducts([...products, p])}
            onEditProduct={handleEditProduct}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
            onClose={() => setShowAdmin(false)}
          />
      )}
      
      <Navigation 
        cartCount={cart.reduce((a, b) => a + b.qty, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoClick={() => { setActiveCategory("All"); setSearchQuery(""); window.scrollTo(0,0); }}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQty={updateQty} 
        removeItem={removeItem}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover object-center filter brightness-[0.85] scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
            alt="Hero"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-6">
          <RevealOnScroll>
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 md:mb-6 font-medium">Est. 1998 • Lucknow</p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 md:mb-8 leading-none">
              Timeless <br/> <span className="italic text-[#a88b63]">Elegance</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={400}>
            <button
                onClick={() => document.getElementById('collection').scrollIntoView({behavior: 'smooth'})}
                className="border-2 md:border border-white/40 hover:bg-white hover:text-black hover:border-white px-8 md:px-12 py-3.5 md:py-4 text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] transition-all duration-500 backdrop-blur-sm touch-manipulation active:scale-95 font-medium"
            >
              Explore Collection
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-16 md:py-24 px-4 md:px-12 max-w-[1800px] mx-auto" id="collection">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <RevealOnScroll>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900">The Edit</h2>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] md:text-xs uppercase tracking-widest w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 border-b transition-all duration-300 touch-manipulation ${activeCategory === cat ? 'border-[#a88b63] text-[#a88b63]' : 'border-transparent text-gray-400 active:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {filteredProducts.length === 0 ? (
            <div className="text-center py-24 opacity-50">
                <p className="font-serif text-2xl">No pieces found matching your criteria.</p>
                <button onClick={() => {setSearchQuery(''); setActiveCategory('All')}} className="mt-4 border-b border-black text-xs uppercase tracking-widest">Clear Filters</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
            {filteredProducts.map((product, idx) => (
                <RevealOnScroll key={product.id} delay={idx * 100}>
                <ProductCard product={product} onClick={setSelectedProduct} />
                </RevealOnScroll>
            ))}
            </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 md:pt-24 pb-8 md:pb-12 safe-bottom">
        <div className="max-w-[1800px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-24 border-b border-gray-800 pb-12 md:pb-24">
            <div className="md:col-span-4">
              <h2 className="font-serif text-3xl md:text-4xl mb-4 md:mb-8">VISA</h2>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm md:text-base">
                Elevating spaces with timeless Indian craftsmanship.
                Based in Lucknow, shipping elegance worldwide.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-[#a88b63] mb-4 md:mb-8">Shop</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors inline-block py-1">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors inline-block py-1">The Atelier</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-[#a88b63] mb-4 md:mb-8">Contact</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-light">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-[#a88b63]" />
                  <span className="leading-relaxed">Ashiyana, Bijnore Road<br/>Lucknow 226002</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-[#a88b63]" />
                  <a href="mailto:sumitkathpalai41@gmail.com" className="hover:text-white transition-colors break-all">sumitkathpalai41@gmail.com</a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-[#a88b63] mb-4 md:mb-8">Newsletter</h4>
              <div className="flex border-b border-gray-700 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm" />
                <button className="text-gray-400 hover:text-white uppercase text-[10px] md:text-xs tracking-widest touch-manipulation whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest">
            <p className="text-center md:text-left">© 2024 VISA Furniture India.</p>
            <button onClick={() => setShowAdminLogin(true)} className="flex items-center gap-2 hover:text-white transition-colors touch-manipulation py-2">
                <Lock size={10} /> Staff Access
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
