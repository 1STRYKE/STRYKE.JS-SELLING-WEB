import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ShieldCheck, 
  Zap, 
  Target, 
  Ghost, 
  Cpu, 
  UserPlus, 
  Heart, 
  Menu, 
  X, 
  ShoppingCart, 
  ChevronRight,
  ExternalLink,
  Shield,
  Activity,
  ArrowRight,
  Monitor,
  CheckCircle2,
  Lock,
  ZapOff,
  Code2,
  Settings2,
  Gamepad2,
  MousePointer2,
  Terminal,
  Layers,
  Rocket,
  PlusCircle,
  Search,
  Store,
  QrCode,
  CheckCircle,
  Send
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  tag: string;
  gradient: string;
  category: 'panels' | 'stealth' | 'security' | 'diy' | 'social' | 'developer';
}

const PRODUCTS: Product[] = [
  {
    id: 'ff-basic',
    name: 'FREE FIRE BASIC PANEL',
    description: 'Essential performance optimization. Get smoother FPS and lower latency in seconds.',
    price: '₹899',
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    tag: 'Essential',
    gradient: 'from-cyan-500/20 to-transparent',
    category: 'panels'
  },
  {
    id: 'ff-brutal',
    name: 'FREE FIRE BRUTAL',
    description: 'The ultimate power suite. Dominate any lobby with pure aggressive enhancements.',
    price: '₹2,199',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    tag: 'Popular',
    gradient: 'from-purple-500/20 to-transparent',
    category: 'panels'
  },
  {
    id: 'ff-aimkill',
    name: 'FIRE FIRE AIM KILL',
    description: 'Pixel-perfect accuracy. Advanced predictive logic ensures every shot counts.',
    price: '₹1,699',
    icon: <Target className="w-8 h-8 text-red-400" />,
    tag: 'Elite',
    gradient: 'from-red-500/20 to-transparent',
    category: 'panels'
  },
  {
    id: 'silent-aim',
    name: 'SILENT AIM',
    description: 'Invisible precision. Strike with accuracy while remaining completely undetected.',
    price: '₹1,299',
    icon: <Ghost className="w-8 h-8 text-blue-300" />,
    tag: 'Stealth',
    gradient: 'from-blue-500/20 to-transparent',
    category: 'stealth'
  },
  {
    id: 'hwid-spoofer',
    name: 'ULTRA HWID SPOOFER',
    description: 'Advanced hardware identification masker. Clean your PC fingerprints with one click.',
    price: '₹3,499',
    icon: <Layers className="w-8 h-8 text-emerald-400" />,
    tag: 'Secure',
    gradient: 'from-emerald-500/20 to-transparent',
    category: 'security'
  },
  {
    id: 'uid-bypass',
    name: 'UID BYPASS PRO',
    description: 'Advanced account layer protection. Manage multiple profiles with total anonymity.',
    price: '₹2,499',
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
    tag: 'Secure',
    gradient: 'from-green-500/20 to-transparent',
    category: 'security'
  },
  {
    id: 'guest-gen',
    name: 'GUEST GENERATOR',
    description: 'Instant sandbox account provisioning. Perfect for testing new strategies safely.',
    price: '₹399',
    icon: <UserPlus className="w-8 h-8 text-orange-400" />,
    tag: 'Utility',
    gradient: 'from-orange-500/20 to-transparent',
    category: 'security'
  },
  {
    id: 'macro-builder',
    name: 'MACRO BUILDER PRO',
    description: 'DIY Scripting engine. Build your own complex movement and recoil patterns.',
    price: '₹3,499',
    icon: <Code2 className="w-8 h-8 text-yellow-400" />,
    tag: 'DIY/PRO',
    gradient: 'from-yellow-500/20 to-transparent',
    category: 'diy'
  },
  {
    id: 'source-panel',
    name: 'PANEL SOURCE CODE',
    description: 'Complete C++/C# source code for our base panel. Highly customizable for developers.',
    price: '₹12,999',
    icon: <Terminal className="w-8 h-8 text-fuchsia-400" />,
    tag: 'Developer',
    gradient: 'from-fuchsia-500/20 to-transparent',
    category: 'developer'
  },
  {
    id: 'config-loader',
    name: 'CUSTOM CFG LOADER',
    description: 'Import and export custom game configurations for peak hardware utilization.',
    price: '₹1,499',
    icon: <Settings2 className="w-8 h-8 text-indigo-400" />,
    tag: 'Utility',
    gradient: 'from-indigo-500/20 to-transparent',
    category: 'diy'
  },
  {
    id: 'valorant-ext',
    name: 'VALORANT EXTERNAL',
    description: 'External visual assistance for competitive shooters with low system impact.',
    price: '₹4,999',
    icon: <MousePointer2 className="w-8 h-8 text-red-500" />,
    tag: 'Hardcore',
    gradient: 'from-red-600/20 to-transparent',
    category: 'stealth'
  },
  {
    id: 'like-bot',
    name: 'SOCIAL LIKE BOT',
    description: 'Reputation engine. Boost your profile presence and gain instant authority.',
    price: '₹999',
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    tag: 'Social',
    gradient: 'from-pink-500/20 to-transparent',
    category: 'social'
  }
];

const STATS = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Daily Sales', value: '1.2K+' },
  { label: 'Trust Rating', value: '4.9/5' },
];

type ViewState = 'home' | 'store';

// --- Purchase Popup Component ---
const PurchasePopup = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    socialHandle: '',
    transactionId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock discord webhook integration
    // To implement: Replace the comment below with your actual webhook URL
    const DISCORD_WEBHOOK_URL = ''; 

    const payload = {
      embeds: [{
        title: "🚀 New Order Received!",
        color: 5814783, // Cyan
        fields: [
          { name: "Product", value: product.name, inline: true },
          { name: "Price", value: product.price, inline: true },
          { name: "Email", value: formData.email, inline: false },
          { name: "Social (Discord/IG)", value: formData.socialHandle, inline: true },
          { name: "Transaction ID", value: formData.transactionId, inline: true },
        ],
        timestamp: new Date().toISOString()
      }]
    };

    try {
      if (DISCORD_WEBHOOK_URL) {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        console.log('Discord Webhook payload (No URL set):', payload);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to send order info:", err);
      // Still show success to user for demo, usually you'd show an error
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="glass max-w-md w-full p-12 rounded-[50px] text-center border-cyan-500/30">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-cyan-400 w-10 h-10 animate-bounce" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">ORDER PLACED!</h2>
          <p className="text-slate-400 mb-10 leading-relaxed font-medium">
            Your item will be delivered at your email as soon as possible after confirming and verifying your payment.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-3xl hover:scale-105 transition-all uppercase tracking-widest text-sm"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-[60px] relative border-white/10 no-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <X size={32} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Payment Side */}
          <div className="flex-1 p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                <QrCode size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">SCAN TO PAY</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Instant Activation</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[40px] mb-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] group">
              {/* Replace the URL below with your actual payment QR code image URL */}
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=STRYKE_PAYMENT_ID" 
                alt="Payment QR" 
                className="w-full aspect-square object-contain rounded-[32px] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Amount to Pay</span>
              <span className="text-3xl font-black text-white">{product.price}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-center italic">
              After payment, fill the form with your Transaction ID to complete your order.
            </p>
          </div>

          {/* Form Side */}
          <div className="flex-1 p-12 lg:p-16">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">ORDER DETAILS</h3>
            <p className="text-slate-500 text-sm font-medium mb-10">We need these to deliver your digital assets.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-4">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="Where should we send the files?"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-8 py-5 glass rounded-3xl text-white outline-none focus:border-cyan-500 transition-all font-bold placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-4">Discord or Instagram</label>
                <input 
                  required
                  type="text" 
                  placeholder="Username (e.g. user#1234)"
                  value={formData.socialHandle}
                  onChange={e => setFormData({...formData, socialHandle: e.target.value})}
                  className="w-full px-8 py-5 glass rounded-3xl text-white outline-none focus:border-cyan-500 transition-all font-bold placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-4">Transaction ID / Ref Number</label>
                <input 
                  required
                  type="text" 
                  placeholder="Paste payment reference here"
                  value={formData.transactionId}
                  onChange={e => setFormData({...formData, transactionId: e.target.value})}
                  className="w-full px-8 py-5 glass rounded-3xl text-white outline-none focus:border-cyan-500 transition-all font-bold placeholder:text-slate-600 border border-cyan-500/20"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="mt-4 w-full py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-[28px] text-lg transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(6,182,212,0.3)]"
              >
                {loading ? 'PROCESSING...' : 'COMPLETE ORDER'}
                {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Components ---

const Navbar = ({ currentView, setView }: { currentView: ViewState, setView: (v: ViewState) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (v: ViewState) => {
    setView(v);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4 glass-dark shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-11 h-11 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-[10deg] transition-all duration-500 border border-white/20">
              <Shield className="text-white w-6 h-6" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-['Poppins'] uppercase">
            STRYKE<span className="text-cyan-400">.JS</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          <button onClick={() => navigateTo('home')} className={`text-sm font-bold transition-all hover:tracking-widest duration-300 ${currentView === 'home' ? 'text-cyan-400 tracking-widest' : 'text-slate-400 hover:text-white'}`}>HOME</button>
          <button onClick={() => navigateTo('store')} className={`text-sm font-bold transition-all hover:tracking-widest duration-300 ${currentView === 'store' ? 'text-cyan-400 tracking-widest' : 'text-slate-400 hover:text-white'}`}>STORE</button>
          <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-all hover:tracking-widest duration-300">FEATURES</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-all hover:tracking-widest duration-300">COMMUNITY</a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigateTo('store')} className="text-sm font-bold text-white/70 hover:text-white transition-colors px-2 uppercase tracking-widest">EXPLORE CATALOG</button>
          <button 
            onClick={() => navigateTo('store')}
            className="group relative px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            BUY NOW
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
          </button>
        </div>

        <button className="lg:hidden w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-dark border-t border-white/5 py-10 px-6 flex flex-col gap-8 lg:hidden animate-in slide-in-from-top fade-in duration-300">
          <button onClick={() => navigateTo('home')} className="text-2xl font-bold text-left text-white">HOME</button>
          <button onClick={() => navigateTo('store')} className="text-2xl font-bold text-left text-white">STORE</button>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white">FEATURES</a>
          <div className="h-px bg-white/5 w-full my-2" />
          <button onClick={() => navigateTo('store')} className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-3xl shadow-xl text-lg uppercase tracking-widest">
            EXPLORE STORE
          </button>
        </div>
      )}
    </nav>
  );
};

const ProductCard: React.FC<{ product: Product, onPurchase: (p: Product) => void }> = ({ product, onPurchase }) => {
  return (
    <div className="glass group rounded-[40px] p-1.5 transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="relative bg-slate-900/40 rounded-[36px] p-8 h-full flex flex-col border border-white/5 overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="p-5 bg-white/5 rounded-3xl group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 border border-white/5 group-hover:border-cyan-500/30">
            {product.icon}
          </div>
          <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-500">
            {product.tag}
          </span>
        </div>
        
        <h3 className="text-2xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors font-['Poppins'] tracking-tight leading-tight relative z-10">
          {product.name}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow relative z-10 font-medium group-hover:text-slate-300 transition-colors">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5 relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Permanent Access</span>
            <span className="text-3xl font-black text-white group-hover:scale-110 transition-transform origin-left duration-500">{product.price}</span>
          </div>
          <button 
            onClick={() => onPurchase(product)}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all duration-500 hover:rotate-12 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <ShoppingCart size={24} />
          </button>
        </div>

        <button 
          onClick={() => onPurchase(product)}
          className="mt-6 w-full py-5 rounded-[24px] bg-white/5 text-white font-black text-sm border border-white/10 hover:bg-cyan-500 hover:text-slate-950 hover:border-transparent transition-all duration-500 flex items-center justify-center gap-3 group/btn relative z-10 overflow-hidden"
        >
          <span className="relative z-10 uppercase">Purchase Now</span>
          <ChevronRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const StorePage = ({ onPurchase }: { onPurchase: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'ALL', icon: <Gamepad2 size={16}/> },
    { id: 'panels', name: 'PANELS', icon: <Cpu size={16}/> },
    { id: 'stealth', name: 'STEALTH', icon: <Ghost size={16}/> },
    { id: 'security', name: 'SECURITY', icon: <ShieldCheck size={16}/> },
    { id: 'diy', name: 'DIY OPS', icon: <Settings2 size={16}/> },
    { id: 'developer', name: 'DEV HUB', icon: <Terminal size={16}/> },
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-40 pb-48 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6">
              <Store className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">OFFICIAL MARKETPLACE</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 font-['Poppins'] tracking-tighter leading-none uppercase">
              STRYKE<span className="text-cyan-400">.STORE</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl">
              Professional-grade digital tools and high-performance assets for the elite gaming community.
            </p>
          </div>
          
          <div className="w-full lg:w-96 relative">
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
               <Search className="text-slate-500" size={20} />
             </div>
             <input 
               type="text" 
               placeholder="Search STRYKE catalog..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-16 pr-8 py-5 glass rounded-[24px] text-white outline-none focus:border-cyan-500/50 transition-all font-bold"
             />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs tracking-[0.2em] transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-105' 
                  : 'glass text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onPurchase={onPurchase} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-40 flex flex-col items-center justify-center opacity-50">
               <ZapOff size={80} className="mb-8 text-slate-600" />
               <h3 className="text-2xl font-black text-white uppercase tracking-widest">No matching items found</h3>
               <p className="text-slate-500 font-bold">Try changing your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden">
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-10 border-cyan-500/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
          <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">PREMIUM DIGITAL MARKETPLACE</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.9] tracking-tighter text-white font-['Poppins'] animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          DOMINATE THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-500 neon-text drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            NEW ERA
          </span>
        </h1>
        
        <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400 font-medium leading-relaxed">
          The ultimate destination for professional gamers. Access cutting-edge optimization tools, secure bypasses, and elite performance enhancers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-600">
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto px-12 py-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-[28px] text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.3)] flex items-center justify-center gap-4 group uppercase"
          >
            Explore Store <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
          <button className="w-full sm:w-auto px-12 py-6 glass hover:bg-white/10 text-white font-black rounded-[28px] text-lg transition-all flex items-center justify-center gap-4 border-white/10 uppercase">
            Join Discord <ExternalLink size={24} className="text-indigo-400" />
          </button>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-800">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl font-black text-white mb-2 uppercase">{stat.value}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const featureList = [
    { icon: <Lock />, title: 'Advanced Cryptography', desc: 'Every product uses military-grade encryption to bypass detection systems.' },
    { icon: <Activity />, title: 'Real-time Updates', desc: 'Automatic background updates ensure your tools always work with the latest patches.' },
    { icon: <Shield />, title: 'Safe & Secure', desc: 'Multi-layered account protection protocols designed by cybersecurity experts.' },
    { icon: <ZapOff />, title: 'Zero Latency', desc: 'Optimized code execution that adds zero overhead to your gaming performance.' }
  ];

  return (
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Poppins'] tracking-tight">WHY CHOOSE <span className="text-cyan-400">STRYKE.JS?</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">We provide the most stable, secure, and advanced gaming tools in the market with 24/7 technical support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureList.map((f, i) => (
            <div key={i} className="glass p-10 rounded-[40px] hover:border-cyan-500/50 transition-all duration-500 group">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const App = () => {
  const [view, setView] = useState<ViewState>('home');
  const [purchaseProduct, setPurchaseProduct] = useState<Product | null>(null);

  const navigateTo = (v: ViewState) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePurchase = (product: Product) => {
    setPurchaseProduct(product);
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500 selection:text-slate-950 bg-[#020617] scroll-smooth">
      <Navbar currentView={view} setView={setView} />
      
      <main>
        {view === 'home' ? (
          <>
            <Hero onExplore={() => {
              setView('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            
            <section id="products" className="max-w-7xl mx-auto px-6 py-32 relative">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px w-12 bg-cyan-500" />
                    <span className="text-cyan-400 font-black text-sm tracking-[0.4em] uppercase">Premium Inventory</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black mb-8 text-white font-['Poppins'] tracking-tighter leading-tight uppercase">
                    ELITE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">DIGITAL ASSETS</span>
                  </h2>
                  <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    Our tools are hand-crafted for enthusiasts who demand nothing but absolute perfection.
                  </p>
                </div>
                <div className="hidden lg:flex gap-4">
                  <button onClick={() => { setView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-10 py-5 glass rounded-3xl flex items-center justify-center text-white hover:text-cyan-400 transition-all hover:scale-105 border-cyan-500/30 gap-3 font-black tracking-widest text-xs uppercase">
                    Launch Store <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} onPurchase={handlePurchase} />
                ))}
                
                <div className="lg:col-span-2 xl:col-span-1 rounded-[40px] bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-900 p-1.5 shadow-2xl hover:scale-[1.02] transition-all duration-700 group cursor-pointer" onClick={() => { setView('store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <div className="bg-slate-950/20 backdrop-blur-sm rounded-[36px] p-10 h-full flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                    <div>
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <Monitor className="text-white" size={28} />
                      </div>
                      <h3 className="text-4xl font-black text-white mb-6 leading-[1.1] tracking-tight uppercase">WANT A PRIVATE BUILD?</h3>
                      <p className="text-white/80 mb-10 font-bold text-lg">Work with our top developers to create a tool specific to your requirements.</p>
                    </div>
                    <button className="w-full py-6 bg-white text-indigo-950 font-black rounded-3xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all text-lg uppercase">
                      Talk to Dev
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <Features />
          </>
        ) : (
          <StorePage onPurchase={handlePurchase} />
        )}

        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="glass p-12 md:p-24 rounded-[60px] relative overflow-hidden border-cyan-500/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Poppins'] uppercase">STAY <span className="text-cyan-400">UPDATED.</span></h2>
                <p className="text-slate-400 text-lg">Get the latest patch notes, security alerts, and exclusive discounts delivered straight to your inbox.</p>
              </div>
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-white outline-none focus:border-cyan-500 transition-colors w-full lg:w-80 font-bold"
                />
                <button className="px-10 py-5 bg-cyan-500 text-slate-950 font-black rounded-3xl whitespace-nowrap shadow-xl hover:scale-105 active:scale-95 transition-all uppercase">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 glass-dark mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">
                STRYKE<span className="text-cyan-400">.JS</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              The world's premier provider of high-end digital enhancements for the competitive gaming scene. Founded in 2021.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <p className="text-white/40 font-black tracking-[0.2em] uppercase text-[10px]">Development Partner</p>
              <p className="text-cyan-400 font-black tracking-[0.15em] uppercase text-xs">
                Made by STRYKE and auvra.studioo
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-2">Marketplace</h5>
            <button onClick={() => navigateTo('store')} className="text-left text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Digital Panels</button>
            <button onClick={() => navigateTo('store')} className="text-left text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Secure Bypasses</button>
            <button onClick={() => navigateTo('store')} className="text-left text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Developer Hub</button>
            <button onClick={() => navigateTo('store')} className="text-left text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Gift Cards</button>
          </div>

          <div className="flex flex-col gap-6">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-2">Company</h5>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Our Vision</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Legal Terms</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Privacy Shield</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Refund Policy</a>
          </div>

          <div className="flex flex-col gap-6">
            <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-2">Support</h5>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Help Center</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">Live Chat</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">API Docs</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm font-bold transition-colors uppercase">System Status</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-black tracking-widest text-center md:text-left uppercase">
            © {new Date().getFullYear()} STRYKE GLOBAL LTD. NOT AFFILIATED WITH GARENA, ACTIVISION, OR EPIC GAMES.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 rounded-full border border-green-500/10">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-green-500 font-black tracking-widest uppercase">GATEWAY ACTIVE</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
               <span className="text-[10px] font-black tracking-widest uppercase">SSL SECURE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Purchase Modal Overlay */}
      {purchaseProduct && (
        <PurchasePopup 
          product={purchaseProduct} 
          onClose={() => setPurchaseProduct(null)} 
        />
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);