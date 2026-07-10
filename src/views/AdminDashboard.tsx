import React, { useState, useEffect } from 'react';
import { 
  Users, CreditCard, Star, Activity, Search, ShieldCheck, 
  MapPin, Sliders, Calendar, FileText, ArrowRight, UserPlus, RefreshCw 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { db, trainers, Customer } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'payments' | 'trainers' | 'settings'>('overview');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sync state
  const syncData = () => {
    setCustomers(db.getCustomers());
    setBookings(db.getBookings());
  };

  useEffect(() => {
    syncData();
  }, []);

  const handleRefund = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Refunded', amount: 0 } : b);
    setBookings(updated);
    // Update simulated localstorage
    localStorage.setItem('aurelia_bookings', JSON.stringify(updated));
  };

  // Filter CRM Customers
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Recharts financial simulation data
  const revenueData = [
    { month: 'Jan', revenue: 140000 },
    { month: 'Feb', revenue: 165000 },
    { month: 'Mar', revenue: 190000 },
    { month: 'Apr', revenue: 215000 },
    { month: 'May', revenue: 230000 },
    { month: 'Jun', revenue: 255000 }
  ];

  return (
    <div className="flex min-h-[90vh] bg-[#FAF8F5] border-t border-champagne/40 font-sans">
      
      {/* Left Sidebar (Tesla/Stripe style) */}
      <aside className="w-64 border-r border-champagne/60 bg-white p-6 flex flex-col gap-6 select-none">
        <div className="px-2">
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase block font-medium">Administration</span>
          <h3 className="font-serif text-xl text-charcoal tracking-wide mt-1">Aurelia Ops</h3>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {[
            { id: 'overview', label: 'Ecosystem Analytics', icon: Activity },
            { id: 'crm', label: 'Client CRM Directory', icon: Users },
            { id: 'payments', label: 'Stripe Subscriptions', icon: CreditCard },
            { id: 'trainers', label: 'Director Rosters', icon: Star },
            { id: 'settings', label: 'Security & Roles', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[12px] font-medium transition-all ${
                  isActive 
                    ? 'bg-charcoal text-white font-semibold' 
                    : 'text-charcoal/70 hover:bg-champagne/20 hover:text-charcoal'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-gold' : 'text-charcoal/50'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 bg-beige/30 border border-champagne/40 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[10px] text-charcoal/50">Current Role</div>
            <div className="text-[11px] font-bold text-charcoal">Global Administrator</div>
          </div>
          <ShieldCheck size={16} className="text-gold" />
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
        
        {/* Top Header Controls */}
        <div className="flex justify-between items-center border-b border-champagne/40 pb-5">
          <div>
            <h1 className="font-serif text-2xl text-charcoal font-medium">
              {activeTab === 'overview' && 'Ecosystem Analytics Hub'}
              {activeTab === 'crm' && 'Client CRM Directory'}
              {activeTab === 'payments' && 'Stripe Subscriptions Ledger'}
              {activeTab === 'trainers' && 'Director Rosters'}
              {activeTab === 'settings' && 'System Configuration'}
            </h1>
            <p className="text-[11px] text-charcoal/50 mt-1">Real-time status updates across physical and digital terminals.</p>
          </div>

          <button 
            onClick={syncData}
            className="flex items-center gap-1.5 px-3 py-2 border border-champagne/60 text-charcoal hover:border-gold hover:text-gold transition-colors text-[10px] tracking-widest uppercase font-medium bg-white"
          >
            <RefreshCw size={12} /> Sync Databases
          </button>
        </div>

        {/* WORKSPACE PANELS */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* KPI top metrics row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-champagne/40 p-5 rounded-none shadow-sm">
                <span className="text-[9px] text-charcoal/50 uppercase tracking-widest block">Monthly Recurring Yield</span>
                <span className="font-serif text-2xl text-gold font-light block mt-2">$240,000.00</span>
                <span className="text-[10px] text-green-600 font-semibold mt-1 block">↑ +14.2% MoM</span>
              </div>

              <div className="bg-white border border-champagne/40 p-5 rounded-none shadow-sm">
                <span className="text-[9px] text-charcoal/50 uppercase tracking-widest block">Active Client Contracts</span>
                <span className="font-serif text-2xl text-charcoal font-light block mt-2">48 Members</span>
                <span className="text-[10px] text-charcoal/40 block mt-1">98% Retention Rate</span>
              </div>

              <div className="bg-white border border-champagne/40 p-5 rounded-none shadow-sm">
                <span className="text-[9px] text-charcoal/50 uppercase tracking-widest block">Averaged Director Rating</span>
                <span className="font-serif text-2xl text-charcoal font-light block mt-2">4.95 / 5.0</span>
                <span className="text-[10px] text-gold font-semibold block mt-1">★ Elite Tier Service</span>
              </div>

              <div className="bg-white border border-champagne/40 p-5 rounded-none shadow-sm">
                <span className="text-[9px] text-charcoal/50 uppercase tracking-widest block">Active Telemetry Sessions</span>
                <span className="font-serif text-2xl text-charcoal font-light block mt-2">2 Ongoing</span>
                <span className="text-[10px] text-green-600 font-semibold block mt-1">● Fleet SUVs Dispatched</span>
              </div>
            </div>

            {/* Financial chart */}
            <div className="bg-white border border-champagne/40 p-6 shadow-sm">
              <h3 className="font-serif text-lg text-charcoal mb-4">Financial Growth Trajectory (USD)</h3>
              <div className="h-64 w-full text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4EFE6" />
                    <XAxis dataKey="month" stroke="#1F2421" opacity={0.5} />
                    <YAxis stroke="#1F2421" opacity={0.5} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#C5A880" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Search filter row */}
            <div className="flex justify-between items-center gap-4 bg-white border border-champagne/40 p-4 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={16} />
                <input 
                  type="text"
                  placeholder="Filter client records (e.g. Vance, Bespoke)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-champagne/40 rounded-lg pl-10 pr-4 py-2 text-[12px] focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* CRM Table */}
            <div className="bg-white border border-champagne/40 shadow-sm rounded-none overflow-hidden">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#FAF8F5] border-b border-champagne/60 text-charcoal/50 uppercase font-medium">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Secure Email</th>
                    <th className="p-4">Contract Plan</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Weight Trend</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/30 text-charcoal/80">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-beige/10">
                      <td className="p-4 font-medium text-charcoal">{cust.name}</td>
                      <td className="p-4 text-charcoal/60">{cust.email}</td>
                      <td className="p-4 text-gold font-medium">{cust.plan}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          cust.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-charcoal/60">
                        {cust.metrics.weight[0]} kg → {cust.metrics.weight[cust.metrics.weight.length - 1]} kg
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedCustomer(cust)}
                          className="text-[10px] tracking-wider text-gold font-medium hover:text-charcoal uppercase flex items-center gap-1 ml-auto"
                        >
                          CRM Logs <ArrowRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected customer details drawer */}
            {selectedCustomer && (
              <div className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm flex justify-end">
                <div className="w-full max-w-lg bg-white h-full shadow-2xl p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <div className="flex justify-between items-start border-b border-champagne pb-4 mb-6">
                      <div>
                        <span className="text-[9px] tracking-widest text-gold uppercase block">CRM Profile details</span>
                        <h3 className="font-serif text-2xl text-charcoal mt-1">{selectedCustomer.name}</h3>
                      </div>
                      <button onClick={() => setSelectedCustomer(null)} className="text-charcoal hover:text-gold font-medium text-[11px] uppercase tracking-widest">
                        Close
                      </button>
                    </div>

                    <div className="flex flex-col gap-6 text-[12px] leading-relaxed">
                      <div>
                        <span className="text-charcoal/40 block font-semibold uppercase tracking-wider text-[9px]">Contract Details</span>
                        <div className="text-[14px] font-medium text-charcoal mt-0.5">{selectedCustomer.plan}</div>
                        <span className="text-charcoal/50">Status: <span className="font-semibold text-green-600">{selectedCustomer.status}</span></span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-charcoal/40 block font-semibold uppercase tracking-wider text-[9px]">Registered Email</span>
                          <span className="font-medium text-charcoal">{selectedCustomer.email}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/40 block font-semibold uppercase tracking-wider text-[9px]">Primary Coach</span>
                          <span className="font-medium text-charcoal">
                            {trainers.find(t => t.id === selectedCustomer.trainerId)?.name || 'Matching Director'}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-champagne pt-4">
                        <span className="text-charcoal/40 block font-semibold uppercase tracking-wider text-[9px] mb-2">Biomarker Log (Weight)</span>
                        <div className="flex gap-2 flex-wrap">
                          {selectedCustomer.metrics.weight.map((w, idx) => (
                            <div key={idx} className="bg-beige/40 border border-champagne p-2 text-center rounded">
                              <span className="text-[9px] text-charcoal/40 block">{selectedCustomer.metrics.dates[idx]}</span>
                              <span className="font-medium text-charcoal">{w} kg</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-champagne pt-4">
                        <span className="text-charcoal/40 block font-semibold uppercase tracking-wider text-[9px] mb-2">Audit Communication History</span>
                        <div className="flex flex-col gap-2 relative pl-4 border-l border-champagne">
                          <div>
                            <span className="text-[9px] text-gold font-semibold">Jul 11, 07:45 AM — Concierge Dispatch</span>
                            <p className="text-[11px] text-charcoal/70 mt-0.5">Alexander Sterling verified packing equipment list.</p>
                          </div>
                          <div>
                            <span className="text-[9px] text-charcoal/40 font-semibold">Jul 10, 08:30 PM — Subscription Billing</span>
                            <p className="text-[11px] text-charcoal/70 mt-0.5">Periodic Stripe renewal transaction successfully processed.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const updated = customers.map(c => c.id === selectedCustomer.id 
                        ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' as any } 
                        : c
                      );
                      setCustomers(updated);
                      // Update DB
                      const target = updated.find(c => c.id === selectedCustomer.id);
                      if (target) db.saveCustomer(target);
                      setSelectedCustomer(null);
                    }}
                    className={`w-full py-3.5 mt-6 font-medium text-[10px] tracking-widest uppercase transition-colors ${
                      selectedCustomer.status === 'Active' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedCustomer.status === 'Active' ? 'Pause Client Membership' : 'Activate Client Membership'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Stripe payments transactions */}
            <div className="bg-white border border-champagne/40 shadow-sm rounded-none overflow-hidden">
              <div className="p-4 border-b border-champagne/40 bg-[#FAF8F5]">
                <h3 className="font-serif text-lg text-charcoal">Transactions Registry (Stripe Sandbox)</h3>
              </div>
              
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#FAF8F5] border-b border-champagne/60 text-charcoal/50 uppercase font-medium">
                  <tr>
                    <th className="p-4">Transaction Code</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Product Tier</th>
                    <th className="p-4">Billing Status</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/30 text-charcoal/80">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="p-4 font-mono text-charcoal/60">{b.id}</td>
                      <td className="p-4 font-medium">{b.customerName}</td>
                      <td className="p-4 text-charcoal/60">{b.date}</td>
                      <td className="p-4 text-gold font-medium">{b.package}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          b.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-charcoal">${b.amount.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        {b.status === 'Confirmed' && b.amount > 0 ? (
                          <button
                            onClick={() => handleRefund(b.id)}
                            className="px-2.5 py-1 text-[9px] tracking-wider uppercase font-semibold text-red-600 border border-red-200 hover:bg-red-50 rounded"
                          >
                            Stripe Refund
                          </button>
                        ) : (
                          <span className="text-[10px] text-charcoal/40 font-medium">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'trainers' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Directors roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainers.map((t) => (
                <div key={t.id} className="bg-white border border-champagne/40 p-5 flex gap-4 shadow-sm">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-champagne" />
                  
                  <div className="flex-1">
                    <span className="text-[9px] tracking-widest text-gold uppercase font-medium">{t.role}</span>
                    <h4 className="font-serif text-lg text-charcoal">{t.name}</h4>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {t.specialties.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="text-[9px] bg-[#FAF8F5] border border-champagne text-charcoal/70 px-2 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 border-t border-champagne/40 pt-3 text-[11px]">
                      <div>
                        <span className="text-charcoal/40 block">Contracts Dispatched</span>
                        <span className="font-medium">{t.sessionsCount} Sessions</span>
                      </div>
                      <div>
                        <span className="text-charcoal/40 block">Biometric Rating</span>
                        <span className="font-medium text-gold">⭐ {t.rating.toFixed(1)} / 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white border border-champagne/40 p-6 shadow-sm flex flex-col gap-6 animate-fade-in">
            <h3 className="font-serif text-lg text-charcoal border-b border-champagne pb-3">Developer Security & Role Permissions</h3>
            
            <div className="flex flex-col gap-4 text-[12px] leading-relaxed">
              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-champagne/40">
                <div>
                  <span className="font-medium text-charcoal">Stripe API Terminal mode</span>
                  <p className="text-[10px] text-charcoal/40 mt-0.5">Enables simulated checkout ledger synchronizations.</p>
                </div>
                <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 border border-green-200 uppercase font-semibold">Simulated Sandbox</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-champagne/40">
                <div>
                  <span className="font-medium text-charcoal">Clinical Telemetry Dispatch</span>
                  <p className="text-[10px] text-charcoal/40 mt-0.5">Sync active trainer coordinates automatically on check-in.</p>
                </div>
                <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 border border-green-200 uppercase font-semibold">Activated</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-champagne/40">
                <div>
                  <span className="font-medium text-charcoal">Role Permissions Mapping</span>
                  <p className="text-[10px] text-charcoal/40 mt-0.5">Define access tiers for regional dispatch operators.</p>
                </div>
                <button className="text-[10px] tracking-wider text-gold hover:text-charcoal uppercase font-semibold">Configure Roles</button>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
