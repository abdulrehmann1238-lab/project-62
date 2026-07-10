import React, { useState, useEffect } from 'react';
import { 
  Shield, MapPin, Truck, AlertTriangle, Users, Box, Compass, 
  TrendingUp, RefreshCw, Layers, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { db, LiveSession, trainers } from '../data/mockData';

export const OperationsApp: React.FC = () => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
  
  // Simulated GPS Coordinates for SVG Map Animation
  const [vehicleCoords, setVehicleCoords] = useState([
    { id: 'v-1', name: 'Alexander (Audi e-tron #1)', x: 45, y: 35, type: 'active' },
    { id: 'v-2', name: 'Marcus (Audi e-tron #2)', x: 65, y: 55, type: 'transit' },
    { id: 'v-3', name: 'Seraphina (Lexus RX #3)', x: 25, y: 70, type: 'idle' }
  ]);

  // Sync state
  useEffect(() => {
    setSessions(db.getLiveSessions());
    setSelectedSession(db.getLiveSessions()[0]);
  }, []);

  // Animate GPS cars on the custom SVG map representation
  useEffect(() => {
    const timer = setInterval(() => {
      setVehicleCoords(prev => prev.map(veh => {
        if (veh.type === 'transit') {
          // Move car diagonally down/right, looping
          const nextX = veh.x > 90 ? 10 : veh.x + 0.8;
          const nextY = veh.y > 90 ? 10 : veh.y + 0.6;
          return { ...veh, x: nextX, y: nextY };
        } else if (veh.type === 'active') {
          // Subtle hover movement to look active
          return { 
            ...veh, 
            x: veh.x + (Math.random() - 0.5) * 0.4, 
            y: veh.y + (Math.random() - 0.5) * 0.4 
          };
        }
        return veh;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResolveSession = (id: string) => {
    const updated = sessions.map(s => s.id === id ? { ...s, status: 'Completed' as any } : s);
    setSessions(updated);
    if (selectedSession?.id === id) {
      setSelectedSession(prev => prev ? { ...prev, status: 'Completed' } : null);
    }
  };

  const activeCount = sessions.filter(s => s.status === 'In Progress').length;
  const transitCount = sessions.filter(s => s.status === 'En Route').length;

  return (
    <div className="p-6 bg-[#FAF8F5] min-h-[90vh] font-sans">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-champagne pb-5">
        <div>
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase block">Operations Center</span>
          <h2 className="font-serif text-3xl text-charcoal font-light">Ecosystem Command & Dispatch</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] tracking-wider font-medium text-charcoal/60 uppercase">Telemetry active</span>
        </div>
      </div>

      {/* Grid of operational KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="luxury-card bg-white p-5 rounded-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-charcoal/50 uppercase tracking-wider">Active Dispatches</span>
            <Users size={16} className="text-gold" />
          </div>
          <div className="font-serif text-2xl text-charcoal font-light mt-2">{activeCount} Sessions</div>
          <div className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
            <span>●</span> Live biomechanical telemetry active
          </div>
        </div>

        <div className="luxury-card bg-white p-5 rounded-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-charcoal/50 uppercase tracking-wider">Fleet Vehicles (e-tron)</span>
            <Truck size={16} className="text-gold" />
          </div>
          <div className="font-serif text-2xl text-charcoal font-light mt-2">{transitCount + 1} Dispatched</div>
          <div className="text-[10px] text-charcoal/50 mt-1">1 reserved reserve vehicle idle</div>
        </div>

        <div className="luxury-card bg-white p-5 rounded-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-charcoal/50 uppercase tracking-wider">Active Territories</span>
            <Compass size={16} className="text-gold" />
          </div>
          <div className="font-serif text-2xl text-charcoal font-light mt-2">4 Regions</div>
          <div className="text-[10px] text-charcoal/50 mt-1">NY, Hamptons, Aspen, Palm Beach</div>
        </div>

        <div className="luxury-card bg-white p-5 rounded-none">
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-charcoal/50 uppercase tracking-wider">Logged Anomalies</span>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div className="font-serif text-2xl text-charcoal font-light mt-2">0 Alerts</div>
          <div className="text-[10px] text-green-600 mt-1">All systems operating within bounds</div>
        </div>
      </div>

      {/* Main dashboard content grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Custom SVG Map Monitor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border border-champagne/40 p-4 shadow-sm relative overflow-hidden flex-1 min-h-[420px] flex flex-col">
            <div className="flex justify-between items-center mb-4 z-10">
              <h3 className="font-serif text-lg text-charcoal flex items-center gap-2">
                <Layers size={16} className="text-gold" /> Live Fleet coordinates
              </h3>
              <span className="text-[9px] bg-beige px-2 py-0.5 rounded font-mono">Manhattan grid representation</span>
            </div>

            {/* Custom Interactive SVG Street Map drawing */}
            <div className="relative bg-[#FAF8F5] border border-champagne/30 rounded flex-1 min-h-[350px]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-champagne/60 stroke-2">
                {/* Diagonal grid lines representing roads */}
                <line x1="10" y1="0" x2="10" y2="100" strokeWidth="0.5" stroke="currentColor" />
                <line x1="30" y1="0" x2="30" y2="100" strokeWidth="0.5" stroke="currentColor" />
                <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.5" stroke="currentColor" />
                <line x1="70" y1="0" x2="70" y2="100" strokeWidth="0.5" stroke="currentColor" />
                <line x1="90" y1="0" x2="90" y2="100" strokeWidth="0.5" stroke="currentColor" />

                <line x1="0" y1="20" x2="100" y2="20" strokeWidth="0.5" stroke="currentColor" />
                <line x1="0" y1="40" x2="100" y2="40" strokeWidth="0.5" stroke="currentColor" />
                <line x1="0" y1="60" x2="100" y2="60" strokeWidth="0.5" stroke="currentColor" />
                <line x1="0" y1="80" x2="100" y2="80" strokeWidth="0.5" stroke="currentColor" />

                {/* Central park stylized green area */}
                <rect x="31" y="21" width="38" height="38" fill="#E6DFD5" opacity="0.4" />
                <text x="50" y="40" fontSize="2" fill="#1F2421" opacity="0.3" textAnchor="middle" letterSpacing="0.2">CENTRAL PARK</text>

                {/* Draw custom paths for active dispatches */}
                {vehicleCoords.map((veh) => (
                  <g key={veh.id}>
                    {/* Pulsing indicator aura */}
                    <circle 
                      cx={veh.x} 
                      cy={veh.y} 
                      r={veh.type === 'transit' ? 2 : 3} 
                      fill={veh.type === 'idle' ? '#E6DFD5' : '#C5A880'} 
                      opacity="0.3" 
                      className="animate-ping" 
                    />
                    
                    {/* Vehicle Node */}
                    <circle 
                      cx={veh.x} 
                      cy={veh.y} 
                      r="1.5" 
                      fill={veh.type === 'active' ? '#1F2421' : '#C5A880'} 
                    />
                  </g>
                ))}
              </svg>

              {/* Map Floating Legend */}
              <div className="absolute bottom-3 left-3 bg-white/90 border border-champagne p-2.5 rounded text-[8px] flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                  <span className="font-medium text-charcoal/80 uppercase">Training Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-medium text-charcoal/80 uppercase">En Route dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone" />
                  <span className="font-medium text-charcoal/80 uppercase">Standby/Idle</span>
                </div>
              </div>

              {/* Live coordinates box overlays */}
              {vehicleCoords.map((veh) => (
                <div 
                  key={veh.id}
                  className="absolute text-[8px] bg-white border border-champagne/40 px-2 py-0.5 shadow-sm rounded pointer-events-none -translate-x-1/2 -translate-y-4"
                  style={{ left: `${veh.x}%`, top: `${veh.y}%` }}
                >
                  <span className="font-medium">{veh.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Dispatch Session Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border border-champagne/40 p-4 shadow-sm flex flex-col flex-1">
            <h3 className="font-serif text-lg text-charcoal mb-4 flex items-center justify-between">
              <span>Active Dispatches</span>
              <button 
                onClick={() => setSessions(db.getLiveSessions())}
                className="text-gold p-1 hover:rotate-180 transition-transform duration-500"
              >
                <RefreshCw size={14} />
              </button>
            </h3>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[300px] no-scrollbar">
              {sessions.map((sess) => (
                <button
                  key={sess.id}
                  onClick={() => setSelectedSession(sess)}
                  className={`w-full p-3 text-left border flex items-center justify-between transition-all ${
                    selectedSession?.id === sess.id 
                      ? 'border-gold bg-[#FAF8F5] shadow-sm' 
                      : 'border-champagne/40 hover:border-gold/30'
                  }`}
                >
                  <div>
                    <h5 className="font-serif text-[13px] font-medium text-charcoal">{sess.customerName.split(' ')[0]}</h5>
                    <p className="text-[10px] text-charcoal/50 mt-0.5">{sess.trainerName} • {sess.location}</p>
                  </div>
                  
                  <span className={`text-[9px] px-2 py-0.5 rounded border ${
                    sess.status === 'In Progress' ? 'bg-green-50 text-green-600 border-green-200' :
                    sess.status === 'En Route' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-stone/20 text-charcoal/40 border-transparent'
                  }`}>
                    {sess.status}
                  </span>
                </button>
              ))}
            </div>

            {selectedSession && (
              <div className="border-t border-champagne pt-4 mt-4 bg-beige/20 -mx-4 -mb-4 p-4">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Dispatch Details</span>
                <h4 className="font-serif text-[14px] text-charcoal font-semibold mt-1">{selectedSession.customerName}</h4>
                
                <div className="grid grid-cols-2 gap-3 mt-3 text-[11px] leading-relaxed">
                  <div>
                    <span className="text-charcoal/40 block">Director Assigned</span>
                    <span className="font-medium text-charcoal">{selectedSession.trainerName}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/40 block">Program Module</span>
                    <span className="font-medium text-charcoal">{selectedSession.type}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/40 block">Location Coordinates</span>
                    <span className="font-medium text-charcoal">{selectedSession.location}</span>
                  </div>
                  <div>
                    <span className="text-charcoal/40 block">Current Status</span>
                    <span className="font-medium text-charcoal">{selectedSession.status}</span>
                  </div>
                </div>

                {selectedSession.status !== 'Completed' && (
                  <button
                    onClick={() => handleResolveSession(selectedSession.id)}
                    className="w-full mt-4 py-2 bg-charcoal hover:bg-gold text-ivory text-[10px] tracking-widest uppercase font-medium flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={13} /> Complete Dispatch Logs
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom panels: complaints & inventory checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* Complaints ledger */}
        <div className="bg-white border border-champagne/40 p-4 shadow-sm">
          <h4 className="font-serif text-lg text-charcoal mb-4">Client Feedback & Anomalies Ledger</h4>
          <div className="flex flex-col gap-3">
            <div className="border-b border-champagne/30 pb-3 flex justify-between items-start">
              <div>
                <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-medium border border-red-100">Equipment defect</span>
                <p className="text-[12px] font-medium text-charcoal mt-1.5">WaterGrinder dynamic belt tension slip</p>
                <p className="text-[10px] text-charcoal/50 mt-0.5">Logged by Alexander Sterling • NYC Penthouse Suite</p>
              </div>
              <span className="text-[10px] text-gold font-medium">Under Review</span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-medium border border-green-100">Resolved</span>
                <p className="text-[12px] font-medium text-charcoal mt-1.5">Chef recipe salt threshold adjustment request</p>
                <p className="text-[10px] text-charcoal/50 mt-0.5">Julian Mercer kitchen coordinator • Soho Loft</p>
              </div>
              <span className="text-[10px] text-charcoal/40 font-medium">Closed</span>
            </div>
          </div>
        </div>

        {/* Equipment checks */}
        <div className="bg-white border border-champagne/40 p-4 shadow-sm">
          <h4 className="font-serif text-lg text-charcoal mb-4">Mechanical Inventory Status</h4>
          <div className="grid grid-cols-2 gap-4 text-[11px] leading-relaxed">
            <div className="p-3 bg-beige/30 border border-champagne/40 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal">Pent Dumbbell Sets</span>
                <p className="text-[9px] text-charcoal/40 mt-0.5">Premium oak weights</p>
              </div>
              <span className="text-[10px] text-green-600 font-medium">100% OK</span>
            </div>

            <div className="p-3 bg-beige/30 border border-champagne/40 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal">VO2 Bio-Sensors</span>
                <p className="text-[9px] text-charcoal/40 mt-0.5">Wireless diagnostic cups</p>
              </div>
              <span className="text-[10px] text-green-600 font-medium">100% OK</span>
            </div>

            <div className="p-3 bg-beige/30 border border-champagne/40 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal">Lactate Meters</span>
                <p className="text-[9px] text-charcoal/40 mt-0.5">Precision strips & readers</p>
              </div>
              <span className="text-[10px] text-amber-600 font-medium">Re-order (5 sets)</span>
            </div>

            <div className="p-3 bg-beige/30 border border-champagne/40 rounded flex items-center justify-between">
              <div>
                <span className="font-medium text-charcoal">Audi e-tron Fleet</span>
                <p className="text-[9px] text-charcoal/40 mt-0.5">3 dispatch SUVs</p>
              </div>
              <span className="text-[10px] text-green-600 font-medium">100% OK</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
