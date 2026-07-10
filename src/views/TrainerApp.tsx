import React, { useState } from 'react';
import { 
  Calendar, CheckSquare, DollarSign, AlertOctagon, User, 
  MapPin, Clock, Camera, FileText, Check, AlertCircle, Sparkles, LogIn, LogOut 
} from 'lucide-react';
import { db, trainers } from '../data/mockData';

export const TrainerApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'client' | 'earnings' | 'incidents'>('schedule');
  const [trainer, setTrainer] = useState(trainers[0]); // Default: Alexander Sterling
  
  // Checking in/out mock state
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Equipment Checklist
  const [equipment, setEquipment] = useState([
    { id: 'eq-1', name: 'Oakwood Dumbbell Premium Set', checked: true },
    { id: 'eq-2', name: 'Lactate Threshold Blood Test Kits', checked: true },
    { id: 'eq-3', name: 'Heavy Resistance Loops & Handles', checked: false },
    { id: 'eq-4', name: 'Aurelia Micro-nutrient Recovery Drinks', checked: false }
  ]);

  // Client notes upload simulator
  const [clientNotes, setClientNotes] = useState('Completed aerobic build. Lactate stable at 1.8 mmol/L during target aerobic pacing.');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  // Incident form simulator
  const [incidentForm, setIncidentForm] = useState({ type: 'Damage Report', desc: '', status: '' });

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckInTime(now);
    setIsCheckedIn(true);
    
    // Auto update live session db for CRM sync
    const liveSess = db.getLiveSessions();
    if (liveSess[0]) {
      liveSess[0].status = 'In Progress';
      db.updateLiveSession(liveSess[0]);
    }
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckOutTime(now);
    setIsCheckedIn(false);
    
    // Auto update live session db for CRM sync
    const liveSess = db.getLiveSessions();
    if (liveSess[0]) {
      liveSess[0].status = 'Completed';
      db.updateLiveSession(liveSess[0]);
    }
  };

  const handleEquipmentToggle = (id: string) => {
    setEquipment(prev => prev.map(eq => eq.id === id ? { ...eq, checked: !eq.checked } : eq));
  };

  const handleNoteSave = () => {
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const handlePhotoSimulate = () => {
    setUploadedPhoto('https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=300');
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncidentForm(prev => ({ ...prev, status: 'Logged' }));
    setTimeout(() => {
      setIncidentForm({ type: 'Damage Report', desc: '', status: '' });
    }, 3000);
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
            <img src={trainer.image} alt={trainer.name} className="w-8 h-8 rounded-full object-cover border border-gold/40" />
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gold font-medium">Director Panel</h4>
              <p className="text-[13px] text-charcoal font-medium font-serif">{trainer.name}</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 text-green-600 px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-semibold">
            On Duty
          </div>
        </div>

        {/* Screen Scrollable Body Area */}
        <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-20 no-scrollbar">
          
          {activeTab === 'schedule' && (
            <div className="p-4 flex flex-col gap-4">
              
              {/* Active Client Navigation / Checkin card */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Current Destination</span>
                    <h4 className="font-serif text-[15px] font-medium text-charcoal mt-0.5">Victoria Vance-Montgomery</h4>
                  </div>
                  <span className="text-[10px] font-medium text-charcoal/50">08:00 AM Session</span>
                </div>

                <div className="text-[11px] text-charcoal/70 flex items-center gap-1.5 mb-4">
                  <MapPin size={13} className="text-gold" />
                  <span>Tribeca Penthouse (340 Greenwich St)</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCheckIn}
                    disabled={isCheckedIn}
                    className={`py-2.5 rounded-lg text-[10px] tracking-widest uppercase font-medium flex items-center justify-center gap-1.5 border transition-all ${
                      isCheckedIn 
                        ? 'bg-stone/20 text-charcoal/40 border-transparent cursor-not-allowed' 
                        : 'bg-charcoal text-ivory border-transparent hover:bg-gold'
                    }`}
                  >
                    <LogIn size={11} /> Check In {checkInTime && `(${checkInTime})`}
                  </button>

                  <button
                    onClick={handleCheckOut}
                    disabled={!isCheckedIn}
                    className={`py-2.5 rounded-lg text-[10px] tracking-widest uppercase font-medium flex items-center justify-center gap-1.5 border transition-all ${
                      !isCheckedIn
                        ? 'bg-stone/20 text-charcoal/40 border-transparent cursor-not-allowed'
                        : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
                    }`}
                  >
                    <LogOut size={11} /> Check Out {checkOutTime && `(${checkOutTime})`}
                  </button>
                </div>
              </div>

              {/* Equipment packing checklist */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block mb-3">Required Gear Checklist</span>
                <div className="flex flex-col gap-2.5">
                  {equipment.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => handleEquipmentToggle(eq.id)}
                      className="flex items-center gap-3 text-left w-full"
                    >
                      <div className={`w-4 h-4 border flex items-center justify-center rounded ${
                        eq.checked ? 'bg-gold border-gold text-white' : 'border-champagne bg-white'
                      }`}>
                        {eq.checked && <Check size={10} />}
                      </div>
                      <span className={`text-[12px] ${eq.checked ? 'line-through text-charcoal/40' : 'text-charcoal'}`}>{eq.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Today's Schedule timeline */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-widest text-charcoal/50 uppercase font-medium block">Today's Timeline</span>
                <div className="relative border-l border-champagne pl-4 ml-2 flex flex-col gap-4">
                  <div className="relative">
                    <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-gold" />
                    <span className="text-[9px] text-gold font-medium">08:00 AM — Active</span>
                    <h5 className="text-[12px] font-medium text-charcoal">HIIT Conditioning</h5>
                    <p className="text-[10px] text-charcoal/50">Victoria V. • Tribeca Penthouse</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-champagne" />
                    <span className="text-[9px] text-charcoal/40 font-medium">11:00 AM — Upcoming</span>
                    <h5 className="text-[12px] font-medium text-charcoal">Biomechanical Assessment</h5>
                    <p className="text-[10px] text-charcoal/50">Boardroom Setup • Mercer Executive Partners</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[21px] w-2.5 h-2.5 rounded-full bg-champagne" />
                    <span className="text-[9px] text-charcoal/40 font-medium">04:30 PM — Upcoming</span>
                    <h5 className="text-[12px] font-medium text-charcoal">Restorative Somatic Flow</h5>
                    <p className="text-[10px] text-charcoal/50">Julian Mercer • Soho Loft Gym</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'client' && (
            <div className="p-4 flex flex-col gap-4">
              <h3 className="font-serif text-lg text-charcoal">Active Client File</h3>
              
              {/* Mini Client Details Box */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Selected Target Profile</span>
                <div className="flex items-center justify-between mt-2 pb-3 border-b border-champagne/40">
                  <div>
                    <h4 className="font-serif text-[15px] font-medium text-charcoal">Victoria Vance-Montgomery</h4>
                    <p className="text-[10px] text-charcoal/50">Program: Aurelia Bespoke Monthly</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-bold text-gold">Week 8</span>
                    <p className="text-[9px] text-charcoal/40">Evaluation</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3 text-center">
                  <div>
                    <span className="text-[9px] text-charcoal/50 uppercase">Current Weight</span>
                    <div className="font-serif text-lg font-light text-charcoal">62.1 kg</div>
                  </div>
                  <div>
                    <span className="text-[9px] text-charcoal/50 uppercase">Target Fat Loss</span>
                    <div className="font-serif text-lg font-light text-charcoal">19.5% (-2.9%)</div>
                  </div>
                </div>
              </div>

              {/* Progress note fields */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Biokinetic Coaching Notes</span>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full border border-champagne p-2.5 text-[11px] font-sans h-24 focus:outline-none focus:border-gold rounded bg-[#FAF8F5] leading-relaxed text-charcoal"
                />
                
                <button
                  onClick={handleNoteSave}
                  className="py-2.5 bg-charcoal text-ivory rounded hover:bg-gold text-[10px] tracking-widest uppercase transition-colors"
                >
                  {isNoteSaved ? 'Notes Logged in CRM ✓' : 'Save Session Logs'}
                </button>
              </div>

              {/* Photo Upload Simulator */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Biomarker Scan / Transformation Photo</span>
                
                {uploadedPhoto ? (
                  <div className="relative aspect-video overflow-hidden border border-champagne">
                    <img src={uploadedPhoto} alt="Uploaded progress" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setUploadedPhoto(null)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700"
                    >
                      <AlertOctagon size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoSimulate}
                    className="border-2 border-dashed border-champagne hover:border-gold p-8 rounded-lg flex flex-col items-center justify-center gap-2 transition-all bg-[#FAF8F5] text-charcoal/40 hover:text-gold"
                  >
                    <Camera size={24} />
                    <span className="text-[10px] tracking-widest uppercase font-medium">Upload Chamber Photo</span>
                  </button>
                )}
              </div>

            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="p-4 flex flex-col gap-4">
              <h3 className="font-serif text-lg text-charcoal">Director Yield & Payroll</h3>
              <p className="text-[11px] text-charcoal/60 leading-relaxed">
                Summary of monthly clinical hours, base performance pay, and active client rating bonuses.
              </p>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-champagne/40 p-3.5 rounded-xl shadow-sm">
                  <span className="text-[9px] text-charcoal/50 uppercase">Current Month Earnings</span>
                  <div className="font-serif text-xl text-gold font-light mt-1">$4,850.00</div>
                </div>

                <div className="bg-white border border-champagne/40 p-3.5 rounded-xl shadow-sm">
                  <span className="text-[9px] text-charcoal/50 uppercase">Dispatched Hours</span>
                  <div className="font-serif text-xl text-charcoal font-light mt-1">32 Hours</div>
                </div>
              </div>

              {/* Bonus details */}
              <div className="bg-white border border-champagne/40 p-4 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-l-gold">
                <div>
                  <span className="text-[9px] tracking-widest text-gold uppercase font-medium block">Rating Bonus Status</span>
                  <div className="text-[13px] font-medium mt-1">Client Feedback 5.0 Streak</div>
                  <span className="text-[10px] text-charcoal/40">Bonus target of +$500 unlocked.</span>
                </div>
                <div className="p-2 bg-gold/10 text-gold rounded-full">
                  <Sparkles size={18} />
                </div>
              </div>

              {/* Recent Dispatches table */}
              <div className="bg-white border border-champagne/40 rounded-xl overflow-hidden mt-2">
                <div className="p-3 border-b border-champagne/40 bg-[#FAF8F5]">
                  <span className="text-[9px] tracking-widest text-charcoal/50 uppercase font-medium">Yield History</span>
                </div>
                <table className="w-full text-left text-[11px]">
                  <tbody className="divide-y divide-champagne/30 text-charcoal/80">
                    <tr>
                      <td className="p-3">Jul 10 — HIIT (Victoria V.)</td>
                      <td className="p-3 text-right font-medium">$150.00</td>
                    </tr>
                    <tr>
                      <td className="p-3">Jul 08 — Strength (Julian M.)</td>
                      <td className="p-3 text-right font-medium">$150.00</td>
                    </tr>
                    <tr>
                      <td className="p-3">Jul 07 — Posture (Victoria V.)</td>
                      <td className="p-3 text-right font-medium">$150.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="p-4 flex flex-col gap-4">
              <h3 className="font-serif text-lg text-charcoal">Report Field Incident</h3>
              <p className="text-[11px] text-charcoal/60 leading-relaxed">
                Log mechanical defects, private home equipment damage, or emergency response conditions instantly to our central ops bureau.
              </p>

              <form onSubmit={handleIncidentSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Report Classification</label>
                  <select 
                    value={incidentForm.type}
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border border-champagne p-3 text-[12px] bg-white rounded focus:outline-none focus:border-gold"
                  >
                    <option>Damage Report (Equipment)</option>
                    <option>Site Obstacle (Client Residence)</option>
                    <option>Medical Response Alert</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] tracking-wider text-charcoal/50 uppercase block mb-1">Incident Narrative & Details</label>
                  <textarea 
                    value={incidentForm.desc}
                    onChange={(e) => setIncidentForm(prev => ({ ...prev, desc: e.target.value }))}
                    required
                    placeholder="e.g. Left magnetic resistance toggle on NOHrD WaterGrinder showing tension slip during 400W load test."
                    className="w-full border border-champagne p-3 text-[12px] bg-white rounded focus:outline-none focus:border-gold font-sans h-24"
                  />
                </div>

                {incidentForm.status === 'Logged' && (
                  <div className="bg-green-50 border border-green-200 text-green-600 p-3 flex items-center gap-2 rounded text-[11px]">
                    <Check size={14} /> Incident successfully dispatched to Operations Bureau.
                  </div>
                )}

                <button
                  type="submit"
                  className="py-3 bg-red-600 text-white rounded font-medium text-[10px] tracking-widest uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertCircle size={14} /> Dispatch Report
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Dynamic App Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-champagne/40 flex items-center justify-around z-20">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'schedule' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <Calendar size={18} />
            <span className="text-[9px] font-medium">Workspace</span>
          </button>

          <button 
            onClick={() => setActiveTab('client')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'client' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <User size={18} />
            <span className="text-[9px] font-medium">Active File</span>
          </button>

          <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'earnings' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <DollarSign size={18} />
            <span className="text-[9px] font-medium">Yield</span>
          </button>

          <button 
            onClick={() => setActiveTab('incidents')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'incidents' ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'}`}
          >
            <AlertOctagon size={18} />
            <span className="text-[9px] font-medium">Incidents</span>
          </button>
        </div>

        {/* iPhone bottom pill bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-charcoal/20 rounded-full z-30" />
      </div>

    </div>
  );
};
