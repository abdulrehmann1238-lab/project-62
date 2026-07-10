import React, { useState, useEffect } from 'react';
import { 
  Home, Calendar, LineChart, ChefHat, User, Bell, MapPin, 
  Clock, Play, Shield, Dumbbell, Award, Plus, ChevronRight, 
  MessageSquare, Compass, Send, CheckCircle, Pause, RefreshCw 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { db, trainers, Customer } from '../data/mockData';

interface CustomerAppProps {
  onTriggerBooking: () => void;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({ onTriggerBooking }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'metrics' | 'nutrition' | 'calendar' | 'chat'>('home');
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'concierge', text: string, time: string }>>([
    { sender: 'concierge', text: 'Good morning Victoria. Alexander is en route to Tribeca Penthouse for your 08:00 AM HIIT session. ETA is 8 minutes.', time: '07:42 AM' },
    { sender: 'user', text: 'Perfect, thank you! Please remind him to bring the heavy resistance bands.', time: '07:44 AM' },
    { sender: 'concierge', text: 'Confirmed. Alexander has added the equipment to his checklist.', time: '07:45 AM' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Live GPS tracking state
  const [eta, setEta] = useState(8);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Sync with Mock Database on load
  useEffect(() => {
    const clients = db.getCustomers();
    setCustomer(clients[0]); // default Victoria
  }, []);

  // Live countdown ETA simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : 8));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Live workout timer simulator
  useEffect(() => {
    let timer: any;
    if (isSessionActive) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSessionActive]);

  if (!customer) return <div className="p-8 text-center text-gold">Synchronizing Client Profile...</div>;

  const currentTrainer = trainers.find(t => t.id === customer.trainerId) || trainers[0];

  const handleSendMessage = () => {
    if (!newMsg.trim()) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: newMsg, time: timeString }]);
    setNewMsg('');

    // Concierge automatic premium response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: 'concierge',
        text: 'Of course. Your concierge wellness assistant is executing this request. Is there anything else you require for your session today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  // Recharts custom layout variables
  const chartData = customer.metrics.dates.map((date, idx) => ({
    date,
    weight: customer.metrics.weight[idx],
    bodyFat: customer.metrics.bodyFat[idx],
    muscle: customer.metrics.muscleMass[idx]
  }));

  const handlePauseToggle = () => {
    const updated = { ...customer, status: customer.status === 'Active' ? 'Paused' : 'Active' as any };
    db.saveCustomer(updated);
    setCustomer(updated);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center py-6 min-h-[90vh] bg-stone/20">
      
      {/* Golden iPhone device mockup wrapper */}
      <div className="w-[375px] h-[780px] rounded-[50px] border-[8px] border-[#C5A880] bg-white shadow-2xl relative overflow-hidden flex flex-col font-sans">
        
        {/* Notch / Speaker grid */}
        <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-6 z-30 select-none">
          <span className="text-[11px] font-semibold text-charcoal">9:41</span>
          <div className="w-24 h-4 bg-charcoal rounded-b-xl absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="flex items-center gap-1.5 text-charcoal">
            <span className="text-[10px] font-semibold">5G</span>
            <div className="w-4 h-2.5 border border-charcoal rounded-sm p-0.5 flex items-center">
              <div className="h-full w-full bg-charcoal" />
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="pt-8 pb-3 px-4 border-b border-champagne/40 flex justify-between items-center bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold flex items-center justify-center font-serif text-gold font-bold">
              A
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-gold font-medium">Aurelia App</h4>
              <p className="text-[13px] text-charcoal font-medium font-serif">{customer.name.split(' ')[0]}</p>
            </div>
          </div>
          <div className="relative">
            <button className="p-1 text-charcoal/60 hover:text-gold relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-gold rounded-full" />
            </button>
          </div>
        </div>

        {/* Screen Scrollable Body Area */}
        <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-20 no-scrollbar">
          
          {activeTab === 'home' && (
            <div className="p-4 flex flex-col gap-4">
              
              {/* Membership Status banner */}
              <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-l-gold">
                <div>
                  <span className="text-[9px] tracking-widest text-gold uppercase block">Subscription tier</span>
                  <div className="text-[13px] font-serif font-medium text-charcoal">{customer.plan}</div>
                  <span className="text-[10px] text-charcoal/50">Status: <span className={customer.status === 'Active' ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>{customer.status}</span></span>
                </div>
                <button 
                  onClick={handlePauseToggle}
                  className={`px-3 py-1.5 rounded-lg text-[9px] tracking-widest uppercase font-medium flex items-center gap-1 transition-all ${
                    customer.status === 'Active' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'
                  }`}
                >
                  {customer.status === 'Active' ? <Pause size={10} /> : <RefreshCw size={10} />}
                  {customer.status === 'Active' ? 'Pause' : 'Resume'}
                </button>
              </div>

              {/* LIVE EN ROUTE TRACKER WIDGET */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block mb-2">Live Session ETA</span>
                
                {isSessionActive ? (
                  <div className="bg-charcoal text-ivory p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gold uppercase tracking-widest">Active Workout</div>
                      <div className="text-xl font-serif">{formatTime(sessionTime)}</div>
                    </div>
                    <button 
                      onClick={() => setIsSessionActive(false)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-[10px] tracking-widest uppercase font-semibold"
                    >
                      End
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold relative">
                      <MapPin size={20} className="animate-bounce" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-[12px] font-medium text-charcoal">Alexander Sterling en route</div>
                      <div className="text-[10px] text-charcoal/50 flex items-center gap-1">
                        <Clock size={11} /> ETA: {eta} mins • Tribeca Penthouse
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsSessionActive(true);
                        setSessionTime(0);
                      }}
                      className="p-2 bg-gold text-ivory rounded-lg hover:bg-gold/80 flex items-center justify-center"
                    >
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                )}

                {/* Simulated progress slider bar */}
                <div className="w-full bg-champagne/40 h-1.5 rounded-full overflow-hidden mt-3.5">
                  <div 
                    className="bg-gold h-full transition-all duration-1000" 
                    style={{ width: `${((10 - eta) / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* UPCOMING SESSIONS LIST */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] tracking-widest text-charcoal/50 uppercase font-medium">Scheduled Routines</h4>
                  <button 
                    onClick={onTriggerBooking}
                    className="text-[10px] text-gold font-medium flex items-center gap-0.5 hover:text-charcoal"
                  >
                    <Plus size={12} /> Book New
                  </button>
                </div>

                {customer.upcomingSessions.map((sess) => (
                  <div key={sess.id} className="bg-white border border-champagne/40 p-3.5 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-serif text-charcoal font-medium">{sess.type}</div>
                      <div className="text-[10px] text-charcoal/40 mt-0.5 flex items-center gap-1.5">
                        <span>{sess.date} @ {sess.time}</span>
                        <span>•</span>
                        <span className="truncate max-w-[120px]">{sess.location}</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-charcoal/30" />
                  </div>
                ))}
              </div>

              {/* ACTIVE TRAINING DIRECTOR */}
              <div>
                <h4 className="text-[11px] tracking-widest text-charcoal/50 uppercase font-medium mb-2">Primary Director</h4>
                <div className="bg-white border border-champagne/40 p-4 rounded-xl flex items-center gap-3">
                  <img src={currentTrainer.image} alt={currentTrainer.name} className="w-12 h-12 rounded-full object-cover border border-champagne" />
                  <div className="flex-1">
                    <h5 className="text-[13px] font-medium font-serif text-charcoal">{currentTrainer.name}</h5>
                    <p className="text-[10px] text-gold uppercase tracking-wider">{currentTrainer.role.split('&')[0]}</p>
                    <p className="text-[9px] text-charcoal/50 mt-0.5">⭐ {currentTrainer.rating.toFixed(1)} director rating</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="p-2 bg-beige/50 border border-gold/10 hover:bg-gold/10 rounded-full text-gold transition-colors"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>

              {/* ACHIEVEMENTS CAROUSEL */}
              <div>
                <h4 className="text-[11px] tracking-widest text-charcoal/50 uppercase font-medium mb-2">Goals & Triumphs</h4>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  <div className="bg-white border border-champagne/40 p-3 rounded-xl shrink-0 w-36 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-gold/10 text-gold mb-2">
                      <Award size={18} />
                    </div>
                    <div className="text-[11px] font-medium text-charcoal">Metabolic Ascent</div>
                    <div className="text-[9px] text-charcoal/40 mt-0.5">VO2 Max +4 ml/kg</div>
                  </div>

                  <div className="bg-white border border-champagne/40 p-3 rounded-xl shrink-0 w-36 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-gold/10 text-gold mb-2">
                      <Dumbbell size={18} />
                    </div>
                    <div className="text-[11px] font-medium text-charcoal">Hypertrophy Core</div>
                    <div className="text-[9px] text-charcoal/40 mt-0.5">+1.2 kg Muscle Mass</div>
                  </div>

                  <div className="bg-white border border-champagne/40 p-3 rounded-xl shrink-0 w-36 flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-gold/10 text-gold mb-2">
                      <Shield size={18} />
                    </div>
                    <div className="text-[11px] font-medium text-charcoal">Consistency</div>
                    <div className="text-[9px] text-charcoal/40 mt-0.5">14 sessions active</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="p-4 flex flex-col gap-4">
              <h3 className="font-serif text-lg text-charcoal mb-1">Body Composition Trends</h3>
              <p className="text-[11px] text-charcoal/60 leading-relaxed">
                Biweekly scanning checks from your Aurelia director. Calibrated using bio-impedance telemetry.
              </p>

              {/* Weight chart */}
              <div className="bg-white border border-champagne/40 p-3 rounded-xl shadow-sm">
                <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-widest block mb-2">Weight History (kg)</span>
                <div className="h-44 w-full text-[10px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C5A880" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#C5A880" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4EFE6" />
                      <XAxis dataKey="date" stroke="#1F2421" opacity={0.5} />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#1F2421" opacity={0.5} />
                      <Tooltip />
                      <Area type="monotone" dataKey="weight" stroke="#C5A880" strokeWidth={1.5} fillOpacity={1} fill="url(#colorWeight)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Body fat chart */}
              <div className="bg-white border border-champagne/40 p-3 rounded-xl shadow-sm">
                <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-widest block mb-2">Body Fat (%)</span>
                <div className="h-44 w-full text-[10px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1F2421" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1F2421" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4EFE6" />
                      <XAxis dataKey="date" stroke="#1F2421" opacity={0.5} />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#1F2421" opacity={0.5} />
                      <Tooltip />
                      <Area type="monotone" dataKey="bodyFat" stroke="#1F2421" strokeWidth={1.5} fillOpacity={1} fill="url(#colorFat)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Measurement Logs grid */}
              <div className="bg-white border border-champagne/40 rounded-xl overflow-hidden mt-2">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#FAF8F5] border-b border-champagne/60 text-charcoal/50 uppercase font-medium">
                    <tr>
                      <th className="p-3">Metric</th>
                      <th className="p-3 text-right">Initial</th>
                      <th className="p-3 text-right">Current</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-champagne/30 text-charcoal/80">
                    <tr>
                      <td className="p-3 font-medium">Muscle Mass</td>
                      <td className="p-3 text-right">46.8 kg</td>
                      <td className="p-3 text-right text-gold font-medium">47.9 kg</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Hydration Ratio</td>
                      <td className="p-3 text-right">54.2%</td>
                      <td className="p-3 text-right text-gold font-medium">56.8%</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Visceral Fat Rating</td>
                      <td className="p-3 text-right">6</td>
                      <td className="p-3 text-right text-gold font-medium">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-charcoal">Gastronomic Meal Plan</h3>
                <ChefHat className="text-gold" size={20} />
              </div>
              <p className="text-[11px] text-charcoal/60 leading-relaxed">
                Curated organic culinary guides generated by Aurelia nutritionists, synced directly for private kitchen prep.
              </p>

              {customer.mealPlan.map((meal, idx) => (
                <div key={idx} className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-center border-b border-champagne/30 pb-2">
                    <span className="text-[10px] tracking-widest text-gold uppercase font-medium">{meal.meal}</span>
                    <span className="text-[9px] bg-beige text-charcoal px-2 py-0.5 font-medium">{meal.calories} kcal</span>
                  </div>
                  <h5 className="font-serif text-[14px] font-medium text-charcoal leading-snug">{meal.recipe}</h5>
                  <div className="text-[10px] text-charcoal/50 mt-1 font-mono tracking-wide">{meal.macros}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-serif text-lg text-charcoal">Residency Bookings</h3>
              <p className="text-[11px] text-charcoal/60 leading-relaxed mb-2">
                Calendar of reserved biomechanical diagnostics and conditioning.
              </p>

              {/* Minimal calendar mockup */}
              <div className="bg-white border border-[#C5A880]/15 p-4 rounded-xl shadow-sm mb-4">
                <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-charcoal/40 font-medium mb-3">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-medium text-charcoal">
                  <span className="text-charcoal/30">5</span><span className="text-charcoal/30">6</span><span className="text-charcoal/30">7</span>
                  <span className="text-charcoal/30">8</span><span className="text-charcoal/30">9</span><span className="text-charcoal/30">10</span>
                  <span className="bg-gold text-ivory rounded-full p-1 flex items-center justify-center font-bold">11</span>
                  <span>12</span><span className="border border-gold text-gold rounded-full p-1 flex items-center justify-center">13</span><span>14</span>
                  <span>15</span><span>16</span><span>17</span><span>18</span>
                  <span>19</span><span>20</span><span>21</span><span>22</span>
                  <span>23</span><span>24</span><span>25</span><span>26</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-widest text-charcoal/50 uppercase font-medium block">Detailed Schedule</span>
                <div className="bg-white border border-champagne/40 p-3.5 rounded-xl flex items-center justify-between border-l-4 border-l-gold">
                  <div>
                    <div className="text-[12px] font-medium">VO2 Peak Lactate Assessment</div>
                    <div className="text-[10px] text-charcoal/40 mt-0.5">July 11 @ 08:00 AM • Alexander Sterling</div>
                  </div>
                  <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-medium border border-green-200">Confirmed</span>
                </div>

                <div className="bg-white border border-champagne/40 p-3.5 rounded-xl flex items-center justify-between border-l-4 border-l-gold/40">
                  <div>
                    <div className="text-[12px] font-medium">Somatic Stretch Calibration</div>
                    <div className="text-[10px] text-charcoal/40 mt-0.5">July 13 @ 08:30 AM • Seraphina Laurent</div>
                  </div>
                  <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-medium border border-green-200">Confirmed</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-[600px] bg-white relative">
              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar pb-16">
                {chatMessages.map((msg, i) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div key={i} className={`flex flex-col max-w-[80%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>
                      <div className={`p-3 text-[12px] leading-relaxed rounded-2xl ${
                        isUser 
                          ? 'bg-charcoal text-ivory rounded-tr-none' 
                          : 'bg-[#FAF8F5] border border-champagne/40 text-charcoal rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-charcoal/40 mt-1 pl-1 pr-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input box */}
              <div className="absolute bottom-2 inset-x-2 bg-[#FAF8F5] border border-champagne/50 p-1 flex rounded-xl items-center shadow-sm">
                <input 
                  type="text" 
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Aurelia Concierge..." 
                  className="flex-1 bg-transparent px-3 text-[12px] focus:outline-none placeholder-charcoal/30 h-9"
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-gold text-ivory rounded-lg hover:bg-gold/80 transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic App Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-champagne/40 flex items-center justify-around z-20">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <Home size={18} />
            <span className="text-[9px] font-medium">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'metrics' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <LineChart size={18} />
            <span className="text-[9px] font-medium">Metrics</span>
          </button>

          <button 
            onClick={() => setActiveTab('nutrition')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'nutrition' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <ChefHat size={18} />
            <span className="text-[9px] font-medium">Nutrition</span>
          </button>

          <button 
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'calendar' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <Calendar size={18} />
            <span className="text-[9px] font-medium">Reserves</span>
          </button>

          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'chat' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <MessageSquare size={18} />
            <span className="text-[9px] font-medium">Chat</span>
          </button>
        </div>

        {/* iPhone bottom pill bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-charcoal/20 rounded-full z-30" />
      </div>

    </div>
  );
};
