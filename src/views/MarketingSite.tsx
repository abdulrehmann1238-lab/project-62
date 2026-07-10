import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Check, User, MapPin, CreditCard, ChevronRight, 
  Menu, X, ArrowRight, ShieldCheck, Dumbbell, Activity, 
  Sparkles, Coffee, Briefcase, Award, Star, Compass, ChevronDown 
} from 'lucide-react';
import { trainers, packages, db, Trainer, Package } from '../data/mockData';
import confetti from 'canvas-confetti';

interface MarketingSiteProps {
  onOpenApp: (panel: 'customer' | 'admin') => void;
  bookingTrigger: number;
}

export const MarketingSite: React.FC<MarketingSiteProps> = ({ onOpenApp, bookingTrigger }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'pricing' | 'blog' | 'faq'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Before/After Slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto Booking Trigger (when user clicks in app to book)
  useEffect(() => {
    if (bookingTrigger > 0) {
      setIsBookingOpen(true);
    }
  }, [bookingTrigger]);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Stat Counters Animation simulation
  const [stats, setStats] = useState({ sessions: 0, rate: 0, retention: 0, trainersCount: 0 });
  useEffect(() => {
    if (activeTab === 'home') {
      const duration = 2000;
      const steps = 50;
      const stepTime = duration / steps;
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setStats({
          sessions: Math.floor((15420 / steps) * count),
          rate: Math.min(98 + (count * 0.04), 99.8),
          retention: Math.min(90 + (count * 0.16), 98),
          trainersCount: Math.min(Math.floor((18 / steps) * count), 16)
        });
        if (count >= steps) {
          clearInterval(interval);
          setStats({ sessions: 15420, rate: 99.8, retention: 98, trainersCount: 16 });
        }
      }, stepTime);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Booking Flow State Wizard
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    assessmentType: 'Biomechanical & Longevity Diagnostics',
    trainerName: '',
    locationType: 'Private Estate / Home Gym',
    customLocation: '',
    date: '',
    time: '08:00 AM',
    packageId: 'pkg-2',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleBookingSubmit = () => {
    // Save to simulated storage
    const selectedPkg = packages.find(p => p.id === bookingForm.packageId) || packages[1];
    db.addBooking({
      id: `b-${Date.now()}`,
      customerName: bookingForm.customerName || 'Bespoke Client',
      email: bookingForm.email,
      trainerName: bookingForm.trainerName || trainers[0].name,
      date: bookingForm.date || 'Tomorrow',
      time: bookingForm.time,
      location: bookingForm.customLocation || bookingForm.locationType,
      status: 'Confirmed',
      package: selectedPkg.name,
      amount: selectedPkg.price
    });

    // Trigger luxury Confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A880', '#FAF8F5', '#1F2421']
    });

    setBookingStep(7);
  };

  const selectedTrainer = trainers.find(t => t.name === bookingForm.trainerName);
  const selectedPackage = packages.find(p => p.id === bookingForm.packageId);

  // Marketing pages list
  const services = [
    { title: "Personal Training", desc: "One-on-one metabolic architecture, hypertrophy, and structural kinetics with elite performance specialists.", icon: Dumbbell },
    { title: "Longevity & Bio-Hacking", desc: "Scientific physiological calibration, metabolic monitoring, and anti-aging cell maintenance strategies.", icon: Activity },
    { title: "Estate Wellness Management", desc: "We design, source, staff, and run complete high-performance fitness retreats inside your private residences.", icon: Compass },
    { title: "Corporate Suite Wellness", desc: "Bespoke fitness and restorative coaching tailored directly for executives and boardrooms.", icon: Briefcase },
    { title: "Fascial Stretch & Recovery", desc: "Deep orthopedic stretch therapies and nervous system resetting to eliminate inflammation.", icon: Sparkles },
    { title: "Executive Nutritional Coaching", desc: "Metabolic rate profiling matched with customized organic catering recipes and nutritional monitoring.", icon: Coffee },
    { title: "Athlete Performance Training", desc: "Biomechanical force-production conditioning for competitive, high-yield sport profiles.", icon: Award },
    { title: "Family Wellness Programs", desc: "Unified movement architectures structured to inspire multi-generational health habits.", icon: User },
    { title: "Weight Optimization", desc: "Strategic body re-compositioning blending resistance loading and metabolic pacing.", icon: ShieldCheck },
    { title: "Postural & Restorative Movement", desc: "Spinal alignment correction and deep functional kinesiology to restore full movement range.", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F2421] selection:bg-[#C5A880]/20 font-sans relative pb-16">
      
      {/* Premium Luxury Header Nav */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#C5A880]/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="font-serif text-2xl tracking-[0.3em] font-light text-charcoal">AURELIA</span>
            <span className="text-[9px] tracking-[0.5em] text-gold uppercase mt-1 pl-1">wellness</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {['home', 'about', 'services', 'pricing', 'blog', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                  activeTab === tab ? 'text-gold' : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 border border-gold/40 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold hover:text-ivory transition-all duration-500 rounded-none bg-transparent text-charcoal"
            >
              Book Assessment
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden text-charcoal p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-24 bg-white border-b border-champagne z-30 p-6 flex flex-col gap-6 md:hidden shadow-lg"
          >
            {['home', 'about', 'services', 'pricing', 'blog', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  setMobileMenuOpen(false);
                }}
                className="text-[13px] tracking-[0.2em] uppercase text-left font-medium text-charcoal border-b border-champagne/40 pb-2"
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsBookingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 bg-charcoal text-ivory text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-gold transition-colors duration-500"
            >
              Book Assessment
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Container */}
      <main className="max-w-7xl mx-auto px-6 pt-6">
        
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center py-16 border-b border-champagne/40">
              
              {/* Layered Luxury Editorial Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-12">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-[1px] bg-gold" />
                    <span className="text-[10px] tracking-[0.5em] text-gold uppercase font-medium">Bespoke Wellness Ecosystem</span>
                  </div>
                  
                  <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-charcoal mb-8 tracking-wide font-light">
                    Performance Without <br />
                    <span className="italic font-normal text-gold">Compromise</span>
                  </h1>
                  
                  <p className="text-[14px] leading-relaxed text-charcoal/70 mb-10 max-w-lg tracking-wide">
                    Private bespoke training and biomechanical recovery ecosystem delivered at your private estate, luxury hotels, or elite partner wellness suites worldwide.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setIsBookingOpen(true)}
                      className="px-8 py-4 bg-charcoal text-ivory text-[11px] tracking-[0.2em] uppercase hover:bg-gold hover:text-ivory transition-all duration-500 shadow-md flex items-center gap-2 group"
                    >
                      Book Assessment
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('about')}
                      className="px-8 py-4 border border-charcoal/20 text-charcoal text-[11px] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-500"
                    >
                      Explore Experience
                    </button>
                  </div>
                </div>

                {/* Right side Parallax Luxury Image Stack */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <div className="relative w-full max-w-[420px] aspect-[4/5] overflow-hidden shadow-2xl border border-champagne">
                    <img 
                      src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                      alt="Luxury Wellness"
                      className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                  </div>

                  {/* Overlapping floating card */}
                  <div className="absolute -bottom-6 -left-6 glass-panel p-6 shadow-xl w-64 border-l-4 border-l-gold">
                    <span className="text-[10px] tracking-[0.2em] text-gold uppercase block mb-1">Aurelia Elite</span>
                    <h3 className="font-serif text-[15px] font-medium text-charcoal mb-1">Estate Residence Programs</h3>
                    <p className="text-[11px] text-charcoal/60 leading-relaxed">Dedicated training equipment architecture & onsite specialists.</p>
                  </div>
                </div>
              </div>

              {/* Scroll down indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal/40">
                <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
                <ChevronDown size={14} className="animate-bounce" />
              </div>
            </section>

            {/* LUXURY PROMISE */}
            <section className="py-24 border-b border-champagne/40">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">Our Promise</span>
                <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">The New Standard of Personal Vitality</h2>
                <div className="w-12 h-[1px] bg-gold/50 mx-auto mt-6" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-serif text-[18px] text-charcoal">Absolute Discretion</h3>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed">
                    Designed for ultra-high-net-worth clients, CEOs, and athletes who require extreme privacy, personalized service, and flexible scheduling.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Activity size={20} />
                  </div>
                  <h3 className="font-serif text-[18px] text-charcoal">Biomechanical Precision</h3>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed">
                    No guessing. We employ advanced metabolic tracking, lactate threshold testing, and kinetic movement scans to outline your exact progress.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-serif text-[18px] text-charcoal">Ecosystem Integration</h3>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed">
                    Your physical trainer, nutrition strategist, and recovery specialist coordinate daily, creating a singular, flawless health workflow.
                  </p>
                </div>
              </div>
            </section>

            {/* SERVICES ACCORDION GRID */}
            <section className="py-24 border-b border-champagne/40">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                <div>
                  <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">Our Core Modules</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light">Custom Tailored Wellness Specialties</h2>
                </div>
                <button 
                  onClick={() => setActiveTab('services')}
                  className="text-[11px] tracking-[0.2em] text-gold uppercase font-medium hover:text-charcoal transition-colors duration-300 mt-4 md:mt-0 flex items-center gap-1.5"
                >
                  View All Services <ChevronRight size={14} />
                </button>
              </div>

              {/* Flex list of services */}
              <div className="flex flex-col border-t border-champagne/40">
                {services.slice(0, 5).map((service, index) => {
                  const Icon = service.icon;
                  const isExpanded = expandedService === index;

                  return (
                    <div 
                      key={index}
                      className="border-b border-champagne/40 py-6 transition-all duration-300"
                    >
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : index)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-6">
                          <span className="font-serif text-charcoal/40 text-lg">0{index + 1}</span>
                          <div className="flex items-center gap-3">
                            <Icon size={18} className="text-gold/80" />
                            <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-champagne flex items-center justify-center text-charcoal/60 transition-transform duration-500 ${
                          isExpanded ? 'rotate-180 bg-gold text-ivory border-gold' : 'group-hover:border-gold group-hover:text-gold'
                        }`}>
                          <ChevronDown size={16} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-12 pt-4 pb-2 text-[13px] text-charcoal/70 max-w-xl leading-relaxed">
                              {service.desc}
                              <button 
                                onClick={() => {
                                  setBookingForm(prev => ({ ...prev, assessmentType: service.title }));
                                  setIsBookingOpen(true);
                                }}
                                className="mt-4 text-[10px] tracking-[0.2em] text-gold uppercase font-medium flex items-center gap-1 hover:text-charcoal transition-colors duration-300"
                              >
                                Request Program <ArrowRight size={10} />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TRAINER SHOWCASE */}
            <section className="py-24 border-b border-champagne/40">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">Architects of Vitality</span>
                <h2 className="font-serif text-3xl text-charcoal font-light">Meet Our Elite Directors</h2>
                <p className="text-[12px] text-charcoal/60 mt-3 leading-relaxed">Chosen for their academic clinical rigor, certified athleticism, and commitment to five-star client care.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="luxury-card rounded-none group overflow-hidden relative">
                    <div className="aspect-[3/4] overflow-hidden relative border-b border-champagne/40">
                      <img 
                        src={trainer.image} 
                        alt={trainer.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 px-2.5 py-1 text-[10px] font-medium text-charcoal flex items-center gap-1 shadow-sm border border-champagne">
                        <Star size={11} fill="#C5A880" className="text-gold" />
                        <span>{trainer.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <span className="text-[9px] tracking-[0.2em] text-gold uppercase font-medium block mb-1">
                        {trainer.role}
                      </span>
                      <h4 className="font-serif text-lg text-charcoal mb-2">{trainer.name}</h4>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {trainer.certifications.slice(0, 2).map((cert, i) => (
                          <span key={i} className="text-[9px] bg-champagne/40 text-charcoal/70 px-2 py-0.5 border border-champagne/20">
                            {cert}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-charcoal/60 leading-relaxed mb-5 line-clamp-2">
                        {trainer.bio}
                      </p>

                      <button
                        onClick={() => {
                          setBookingForm(prev => ({ ...prev, trainerName: trainer.name }));
                          setIsBookingOpen(true);
                        }}
                        className="w-full py-2.5 border border-charcoal/10 hover:border-gold hover:bg-gold hover:text-ivory text-[10px] tracking-[0.15em] uppercase transition-all duration-500 font-medium"
                      >
                        Request Training
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE BEFORE/AFTER SLIDER */}
            <section className="py-24 border-b border-champagne/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
                  <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">Verifiable Results</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-6">Visual & Kinetic Transformation</h2>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed mb-6">
                    Our clients experience significant postural alignment correction, reduction in body fat, and cardiovascular volume expansion. Drag the slider to review the metabolic composition change of a private client over a 12-week program.
                  </p>
                  
                  {/* Performance stats mini box */}
                  <div className="grid grid-cols-2 gap-4 w-full border-t border-champagne/40 pt-6 mt-2">
                    <div>
                      <span className="text-[10px] tracking-wider text-charcoal/50 block mb-1">Body Composition</span>
                      <span className="font-serif text-xl text-gold font-light">-8.4% Body Fat</span>
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider text-charcoal/50 block mb-1">Postural Alignment</span>
                      <span className="font-serif text-xl text-gold font-light">+15% Mobility</span>
                    </div>
                  </div>
                </div>

                {/* The Interactive Slider Component */}
                <div className="lg:col-span-7 flex justify-center">
                  <div 
                    ref={sliderRef}
                    className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden select-none border border-champagne cursor-ew-resize shadow-lg"
                    onMouseMove={(e) => isDragging && handleSliderMove(e.clientX)}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onTouchMove={handleTouchMove}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                  >
                    {/* Before Image (Background) */}
                    <img 
                      src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000" 
                      alt="Before Transformation"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-4 left-4 bg-charcoal/70 backdrop-blur-sm text-ivory text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-medium z-15 border border-white/10">
                      Baseline Profile
                    </div>

                    {/* After Image (Foreground layered, clipped based on sliderPosition) */}
                    <div 
                      className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
                      style={{ clipPath: `inset(0px ${100 - sliderPosition}% 0px 0px)` }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000" 
                        alt="After Transformation"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ width: sliderRef.current?.offsetWidth || '100%', maxWidth: 'none' }}
                      />
                      <div className="absolute bottom-4 right-4 bg-gold/90 text-ivory text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-medium z-15">
                        Week 12 Calibration
                      </div>
                    </div>

                    {/* Custom vertical bar handle */}
                    <div 
                      className="absolute inset-y-0 w-0.5 bg-gold pointer-events-none z-20"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold border border-white flex items-center justify-center shadow-lg">
                        <span className="text-ivory font-serif text-[10px] font-bold select-none">&lt;&gt;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NUMERICAL STATISTICS */}
            <section className="py-20 border-b border-champagne/40 bg-beige/30 -mx-6 px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-7xl mx-auto">
                <div>
                  <h3 className="font-serif text-4xl md:text-5xl text-gold font-light mb-2">
                    {stats.sessions.toLocaleString()}+
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">Sessions Completed</p>
                </div>
                <div>
                  <h3 className="font-serif text-4xl md:text-5xl text-gold font-light mb-2">
                    {stats.rate.toFixed(1)}%
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">Transformation success</p>
                </div>
                <div>
                  <h3 className="font-serif text-4xl md:text-5xl text-gold font-light mb-2">
                    {stats.retention}%
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">Yearly Client Retention</p>
                </div>
                <div>
                  <h3 className="font-serif text-4xl md:text-5xl text-gold font-light mb-2">
                    {stats.trainersCount}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">Elite Coaching Directors</p>
                </div>
              </div>
            </section>

            {/* ESTATE WELLNESS CONCIERGE */}
            <section className="py-24 border-b border-champagne/40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="aspect-[4/3] overflow-hidden border border-champagne relative">
                  <img 
                    src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800" 
                    alt="Luxury Estate Pool Gym"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-charcoal/10" />
                </div>

                <div className="flex flex-col items-start pl-0 lg:pl-8">
                  <span className="text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">Residential Architecture</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light mb-6">Private Estate Wellness Integration</h2>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed mb-6">
                    Aurelia handles the full execution flow of residential gyms. From blueprint space layout consulting, high-end equipment sourcing (NOHrD, Pent Fitness, custom oakwood weights), to staffing full-time dedicated recovery specialists.
                  </p>
                  
                  <ul className="flex flex-col gap-3 mb-8">
                    <li className="flex items-center gap-2 text-[12px] text-charcoal/80">
                      <Check size={14} className="text-gold" /> Customized high-end equipment aesthetic integration
                    </li>
                    <li className="flex items-center gap-2 text-[12px] text-charcoal/80">
                      <Check size={14} className="text-gold" /> Rotation of dedicated on-site trainers and therapists
                    </li>
                    <li className="flex items-center gap-2 text-[12px] text-charcoal/80">
                      <Check size={14} className="text-gold" /> Multi-property synched calendar profiles
                    </li>
                  </ul>

                  <button 
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, locationType: 'Private Estate / Home Gym' }));
                      setIsBookingOpen(true);
                    }}
                    className="px-6 py-3 bg-charcoal text-ivory text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'about' && (
          <section className="py-16 max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl text-charcoal font-light mb-8 text-center">Our Heritage & Methodology</h2>
            <p className="text-[14px] leading-relaxed text-charcoal/80 mb-6 text-center italic font-serif">
              "We believe that true fitness is not a display of brute force, but an art of physical architecture."
            </p>
            <div className="aspect-[16/9] overflow-hidden mb-12 border border-champagne">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200" 
                alt="Aman style resort workout space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[13px] text-charcoal/70 leading-relaxed">
              <div>
                <h4 className="font-serif text-lg text-charcoal mb-3">Bespoke Science</h4>
                <p className="mb-4">
                  Aurelia Wellness was founded by orthopedic physiotherapists and elite athletic directors. We noticed the market lacked a performance company that prioritized scientific calibration with the discretion and aesthetic expected by premium clients.
                </p>
                <p>
                  Every trainer under the Aurelia emblem has completed rigorous internal certification modules covering lactate threshold testing, functional biomechanical patterns, and five-star luxury service standards.
                </p>
              </div>
              <div>
                <h4 className="font-serif text-lg text-charcoal mb-3">Multi-Location Support</h4>
                <p className="mb-4">
                  Our clientele travels frequently. To solve scheduling disruption, an Aurelia membership works globally. If you travel from a Manhattan townhouse to a Hamptons estate, or fly to Aspen for skiing, your training files, nutrition requirements, and local trainer assignments shift with you.
                </p>
                <p>
                  We coordinate with your private chefs, medical doctors, and travel coordinators to ensure perfect continuity.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'services' && (
          <section className="py-16">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="font-serif text-4xl text-charcoal font-light mb-4">Our Service Portfolio</h2>
              <p className="text-[12px] text-charcoal/60 uppercase tracking-widest">Scientific, Integrated, Discrete</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="glass-panel p-8 flex flex-col items-start gap-4">
                    <div className="p-3 bg-champagne/40 border border-gold/10 text-gold">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal">{service.title}</h3>
                    <p className="text-[13px] text-charcoal/70 leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <button 
                      onClick={() => {
                        setBookingForm(prev => ({ ...prev, assessmentType: service.title }));
                        setIsBookingOpen(true);
                      }}
                      className="text-[10px] tracking-[0.2em] text-gold hover:text-charcoal transition-colors duration-300 uppercase font-medium flex items-center gap-1.5"
                    >
                      Book Program Assessment <ArrowRight size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'pricing' && (
          <section className="py-16">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="font-serif text-4xl text-charcoal font-light mb-4">Bespoke Resourcing</h2>
              <p className="text-[12px] text-charcoal/60 uppercase tracking-widest">Rates built around clinical dedication</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {packages.map((pkg) => (
                <div key={pkg.id} className="luxury-card rounded-none p-8 flex flex-col justify-between h-full bg-white relative">
                  <div>
                    <h3 className="font-serif text-lg text-charcoal mb-2">{pkg.name}</h3>
                    <p className="text-[11px] text-charcoal/60 mb-6 leading-relaxed h-12 overflow-hidden">{pkg.description}</p>
                    
                    <div className="mb-6 flex items-baseline">
                      <span className="font-serif text-3xl font-light text-gold">${pkg.price.toLocaleString()}</span>
                      <span className="text-[11px] text-charcoal/50 ml-1">/ {pkg.period === 'one-time' ? 'eval' : pkg.period}</span>
                    </div>

                    <div className="w-full h-[1px] bg-champagne mb-6" />

                    <ul className="flex flex-col gap-3.5 mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[11px] text-charcoal/80 leading-relaxed">
                          <Check size={12} className="text-gold mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, packageId: pkg.id }));
                      setIsBookingOpen(true);
                    }}
                    className="w-full py-3 bg-charcoal text-ivory text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500 font-medium"
                  >
                    Select Program
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'blog' && (
          <section className="py-16">
            <h2 className="font-serif text-4xl text-charcoal font-light mb-12 text-center">Aurelia Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'The Circadian Cycle and Muscle Hypertrophy', category: 'Biokinetics', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=500' },
                { title: 'Metabolic Threshold Calibration in CEO Workloads', category: 'Physiology', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500' },
                { title: 'Designing the Ultimate Residential Recovery Suite', category: 'Architecture', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=500' }
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden mb-4 border border-champagne">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span className="text-[10px] tracking-widest text-gold uppercase font-medium">{post.category}</span>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-300 mt-2 mb-1">{post.title}</h3>
                  <span className="text-[11px] text-charcoal/50">Read Article — 5 Min Read</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'faq' && (
          <section className="py-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-charcoal font-light mb-12 text-center">Frequently Answered Queries</h2>
            <div className="flex flex-col gap-6">
              {[
                { q: 'Can I request sessions while traveling internationally?', a: 'Yes. Our premium Ecosystem memberships coordinate global training. We schedule and dispatch local certified Aurelia trainers, or set up live video telemetry tracking systems for your travels.' },
                { q: 'What biometrics do you measure?', a: 'We measure VO2 max, localized muscle oxygen levels, blood lactate curves, HRV (Heart Rate Variability), body water ratio, and detailed postural kinematics scan profiles.' },
                { q: 'Do you work in tandem with medical professionals?', a: 'Frequently. We routinely design specific functional routines under the direction of our client’s orthopedic surgeons, physical therapists, and personal physicians.' },
                { q: 'How does your nutrition service coordinate with home chefs?', a: 'Our diagnostic team creates dietary requirement sheets. We then coordinate weekly with your private culinary staff, sending exact ingredients, weight details, and cooking instructions.' }
              ].map((faq, i) => (
                <div key={i} className="glass-panel p-6">
                  <h4 className="font-serif text-lg text-charcoal mb-2">{faq.q}</h4>
                  <p className="text-[13px] text-charcoal/70 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-charcoal text-ivory/80 pt-20 pb-12 mt-20 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl tracking-[0.3em] font-light text-white">AURELIA</span>
            </div>
            <p className="text-[11px] text-ivory/50 leading-relaxed">
              Bespoke luxury wellness, personal training and physical recovery. Delivered worldwide.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium cursor-pointer">Instagram</span>
              <span className="text-[10px] text-gold uppercase tracking-[0.2em] font-medium cursor-pointer">LinkedIn</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-gold text-[13px] tracking-widest uppercase mb-4">Locations</h4>
            <ul className="flex flex-col gap-2.5 text-[11px] text-ivory/60">
              <li>Manhattan Penthouse Studio</li>
              <li>The Hamptons Residence Suite</li>
              <li>Aspen Snow Lodge Club</li>
              <li>Palm Beach Concierge Dispatch</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold text-[13px] tracking-widest uppercase mb-4">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-[11px] text-ivory/60">
              <li className="cursor-pointer hover:text-gold" onClick={() => setActiveTab('about')}>About Philosophy</li>
              <li className="cursor-pointer hover:text-gold" onClick={() => setActiveTab('services')}>Our Modules</li>
              <li className="cursor-pointer hover:text-gold" onClick={() => setActiveTab('pricing')}>Resourcing & Rates</li>
              <li className="cursor-pointer hover:text-gold" onClick={() => setIsBookingOpen(true)}>Book Diagnostics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold text-[13px] tracking-widest uppercase mb-4">Newsletter</h4>
            <p className="text-[11px] text-ivory/50 mb-4">Receive scientific literature summaries and retreat announcements.</p>
            <div className="flex h-10 w-full">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-white/5 border border-white/10 px-3 text-[10px] tracking-widest uppercase focus:outline-none focus:border-gold w-full text-white"
              />
              <button className="bg-gold px-4 text-charcoal hover:bg-gold/80 transition-colors flex items-center justify-center">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-ivory/40">
          <span>&copy; {new Date().getFullYear()} AURELIA WELLNESS ECOSYSTEM. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-gold">PRIVACY POLICY</span>
            <span className="cursor-pointer hover:text-gold">TERMS OF SERVICE</span>
            <span className="cursor-pointer hover:text-gold">DISCLAIMER</span>
          </div>
        </div>
      </footer>

      {/* BOOKING WIZARD MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-none border border-gold/20 shadow-2xl w-full max-w-2xl overflow-hidden font-sans relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setIsBookingOpen(false);
                  setBookingStep(1);
                }}
                className="absolute top-4 right-4 text-charcoal hover:text-gold p-1"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {/* Steps Header indicator */}
                <div className="flex items-center justify-between border-b border-champagne pb-4 mb-6">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-gold uppercase block">Assessment Booking</span>
                    <h3 className="font-serif text-lg text-charcoal">Step {bookingStep} of 7: {
                      bookingStep === 1 ? 'Choose Assessment' :
                      bookingStep === 2 ? 'Select Director' :
                      bookingStep === 3 ? 'Target Location' :
                      bookingStep === 4 ? 'Reserve Date & Time' :
                      bookingStep === 5 ? 'Select Membership tier' :
                      bookingStep === 6 ? 'Secure payment' :
                      'Reservation Confirmed'
                    }</h3>
                  </div>
                  {bookingStep < 7 && (
                    <div className="text-[12px] font-serif font-light text-gold/80">
                      {Math.floor((bookingStep / 6) * 100)}% Complete
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <div className="min-h-[260px] flex flex-col justify-center">
                  
                  {bookingStep === 1 && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Select Diagnostic Profile</label>
                      {[
                        'Biomechanical & Longevity Diagnostics',
                        'Executive Metabolic Architecture Scan',
                        'Somatic Recovery & Stretch Analysis',
                        'General Fitness Profiling'
                      ].map((type) => (
                        <button
                          key={type}
                          onClick={() => setBookingForm(prev => ({ ...prev, assessmentType: type }))}
                          className={`w-full p-4 text-left border flex items-center justify-between ${
                            bookingForm.assessmentType === type 
                              ? 'border-gold bg-[#FAF8F5] text-charcoal font-medium' 
                              : 'border-champagne hover:border-gold/40 text-charcoal/70'
                          }`}
                        >
                          <span className="text-[13px]">{type}</span>
                          {bookingForm.assessmentType === type && <Check size={16} className="text-gold" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Assign Performance Director</label>
                      <button
                        onClick={() => setBookingForm(prev => ({ ...prev, trainerName: 'No Preference' }))}
                        className={`w-full p-3.5 text-left border flex items-center justify-between ${
                          bookingForm.trainerName === 'No Preference' || bookingForm.trainerName === ''
                            ? 'border-gold bg-[#FAF8F5] text-charcoal' 
                            : 'border-champagne hover:border-gold/40 text-charcoal/70'
                        }`}
                      >
                        <div>
                          <div className="text-[13px] font-medium">Coordinate Best Matching Director</div>
                          <div className="text-[10px] text-charcoal/40">Our directors will match your assessment profile.</div>
                        </div>
                        {(bookingForm.trainerName === 'No Preference' || bookingForm.trainerName === '') && <Check size={16} className="text-gold" />}
                      </button>
                      
                      {trainers.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setBookingForm(prev => ({ ...prev, trainerName: t.name }))}
                          className={`w-full p-3.5 text-left border flex items-center justify-between ${
                            bookingForm.trainerName === t.name 
                              ? 'border-gold bg-[#FAF8F5] text-charcoal' 
                              : 'border-champagne hover:border-gold/40 text-charcoal/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-champagne" />
                            <div>
                              <div className="text-[13px] font-medium">{t.name}</div>
                              <div className="text-[9px] text-gold uppercase tracking-wider">{t.role}</div>
                            </div>
                          </div>
                          {bookingForm.trainerName === t.name && <Check size={16} className="text-gold" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Workout Location Preference</label>
                      {[
                        'Private Estate / Home Gym',
                        'Aurelia Tribeca Penthouse Gym',
                        'Partner Luxury Hotel Suite',
                        'Outdoor Estate grounds'
                      ].map((loc) => (
                        <button
                          key={loc}
                          onClick={() => setBookingForm(prev => ({ ...prev, locationType: loc }))}
                          className={`w-full p-4 text-left border flex items-center justify-between ${
                            bookingForm.locationType === loc 
                              ? 'border-gold bg-[#FAF8F5] text-charcoal' 
                              : 'border-champagne hover:border-gold/40 text-charcoal/70'
                          }`}
                        >
                          <span className="text-[13px]">{loc}</span>
                          {bookingForm.locationType === loc && <Check size={16} className="text-gold" />}
                        </button>
                      ))}
                      <div className="mt-2">
                        <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Custom Address (Optional)</label>
                        <input 
                          type="text"
                          placeholder="e.g. 154 Meadow Lane, Southampton NY"
                          value={bookingForm.customLocation}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, customLocation: e.target.value }))}
                          className="w-full border border-champagne p-3 text-[12px] focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  )}

                  {bookingStep === 4 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Pick a Date</label>
                        <input 
                          type="date"
                          value={bookingForm.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full border border-champagne p-3 text-[13px] focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Preferred Time Window</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['07:00 AM', '08:30 AM', '10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM'].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setBookingForm(prev => ({ ...prev, time: t }))}
                              className={`p-2.5 text-center text-[12px] border ${
                                bookingForm.time === t ? 'border-gold bg-[#FAF8F5] text-charcoal font-medium' : 'border-champagne hover:border-gold/30 text-charcoal/60'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 5 && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] tracking-widest text-charcoal/50 uppercase block mb-1">Select Membership Intent</label>
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setBookingForm(prev => ({ ...prev, packageId: pkg.id }))}
                          className={`w-full p-3.5 text-left border flex items-center justify-between ${
                            bookingForm.packageId === pkg.id 
                              ? 'border-gold bg-[#FAF8F5] text-charcoal' 
                              : 'border-champagne hover:border-gold/40 text-charcoal/70'
                          }`}
                        >
                          <div>
                            <div className="text-[13px] font-medium">{pkg.name}</div>
                            <div className="text-[10px] text-charcoal/40">{pkg.description}</div>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <span className="font-serif text-sm text-gold">${pkg.price.toLocaleString()}</span>
                            <span className="text-[8px] text-charcoal/40 uppercase">{pkg.period === 'one-time' ? 'once' : `per ${pkg.period}`}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {bookingStep === 6 && (
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Client Full Name</label>
                        <input 
                          type="text"
                          required
                          placeholder="Victoria Vance-Montgomery"
                          value={bookingForm.customerName}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, customerName: e.target.value }))}
                          className="w-full border border-champagne p-3 text-[12px] focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Secure Email Address</label>
                          <input 
                            type="email"
                            required
                            placeholder="client@montgomery.com"
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full border border-champagne p-3 text-[12px] focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Private Telephone</label>
                          <input 
                            type="tel"
                            placeholder="+1 (555) 890-4820"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full border border-champagne p-3 text-[12px] focus:outline-none focus:border-gold"
                          />
                        </div>
                      </div>
                      <div className="border border-champagne bg-beige/20 p-4 mt-2">
                        <span className="text-[9px] tracking-widest text-gold uppercase font-medium block mb-2 flex items-center gap-1">
                          <CreditCard size={11} /> Secure Sandbox Payment
                        </span>
                        
                        <div className="flex flex-col gap-2">
                          <input 
                            type="text"
                            placeholder="CARD NUMBER (4111 2222 3333 4444)"
                            value={bookingForm.cardNumber}
                            onChange={(e) => setBookingForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                            className="w-full bg-white border border-champagne p-2.5 text-[11px] tracking-widest focus:outline-none focus:border-gold"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="text"
                              placeholder="EXP (MM/YY)"
                              value={bookingForm.cardExpiry}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, cardExpiry: e.target.value }))}
                              className="bg-white border border-champagne p-2.5 text-[11px] tracking-widest focus:outline-none focus:border-gold text-center"
                            />
                            <input 
                              type="text"
                              placeholder="CVC"
                              value={bookingForm.cardCvc}
                              onChange={(e) => setBookingForm(prev => ({ ...prev, cardCvc: e.target.value }))}
                              className="bg-white border border-champagne p-2.5 text-[11px] tracking-widest focus:outline-none focus:border-gold text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 7 && (
                    <div className="text-center py-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold mb-6 animate-pulse">
                        <Check size={28} />
                      </div>
                      
                      <h4 className="font-serif text-2xl text-charcoal mb-3">Assessment Scheduled</h4>
                      <p className="text-[12px] text-charcoal/70 leading-relaxed max-w-sm mb-6">
                        Thank you, <span className="font-medium">{bookingForm.customerName}</span>. Your concierge assessment has been registered. An Aurelia Director will contact you within 2 hours to coordinate arrival protocols.
                      </p>

                      <div className="w-full bg-beige/30 p-4 border border-champagne/40 text-left text-[11px] leading-relaxed max-w-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-charcoal/50">Program:</span>
                          <span className="font-medium text-charcoal">{bookingForm.assessmentType}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-charcoal/50">Director:</span>
                          <span className="font-medium text-charcoal">{bookingForm.trainerName || 'Assigned Matching Director'}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-charcoal/50">Location:</span>
                          <span className="font-medium text-charcoal truncate max-w-[200px]">{bookingForm.customLocation || bookingForm.locationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal/50">Tier Intended:</span>
                          <span className="font-medium text-gold">{selectedPackage?.name} (${selectedPackage?.price.toLocaleString()})</span>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button
                          onClick={() => {
                            setIsBookingOpen(false);
                            setBookingStep(1);
                            onOpenApp('customer');
                          }}
                          className="px-6 py-3 bg-charcoal text-ivory text-[10px] tracking-[0.2em] uppercase hover:bg-gold transition-colors duration-500 font-medium"
                        >
                          Open Companion App
                        </button>
                        <button
                          onClick={() => {
                            setIsBookingOpen(false);
                            setBookingStep(1);
                            onOpenApp('admin');
                          }}
                          className="px-6 py-3 border border-charcoal/20 text-charcoal text-[10px] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-500 font-medium"
                        >
                          View Admin Portal
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Back / Next buttons */}
                {bookingStep < 7 && (
                  <div className="flex items-center justify-between border-t border-champagne pt-6 mt-8">
                    <button
                      type="button"
                      disabled={bookingStep === 1}
                      onClick={() => setBookingStep(prev => prev - 1)}
                      className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors ${
                        bookingStep === 1 ? 'text-charcoal/20 cursor-not-allowed' : 'text-charcoal hover:text-gold'
                      }`}
                    >
                      Back
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        if (bookingStep === 6) {
                          handleBookingSubmit();
                        } else {
                          setBookingStep(prev => prev + 1);
                        }
                      }}
                      className="px-6 py-3 bg-charcoal text-ivory hover:bg-gold hover:text-white transition-all duration-500 text-[10px] tracking-[0.2em] uppercase font-medium flex items-center gap-1.5"
                    >
                      {bookingStep === 6 ? 'Secure Checkout' : 'Next Step'}
                      <ChevronRight size={12} />
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
