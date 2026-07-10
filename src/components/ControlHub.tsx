import React from 'react';
import { Layout, Smartphone, UserCheck, Shield, Activity, RefreshCw } from 'lucide-react';

export type ActivePanel = 'marketing' | 'customer' | 'trainer' | 'operations' | 'admin';

interface ControlHubProps {
  activePanel: ActivePanel;
  onChangePanel: (panel: ActivePanel) => void;
  resetDb: () => void;
}

export const ControlHub: React.FC<ControlHubProps> = ({ activePanel, onChangePanel, resetDb }) => {
  const modes: { id: ActivePanel; label: string; sub: string; icon: any }[] = [
    { id: 'marketing', label: 'Brand Experience', sub: 'Desktop Marketing Site', icon: Layout },
    { id: 'customer', label: 'Customer App', sub: 'iOS Wellness Companion', icon: Smartphone },
    { id: 'trainer', label: 'Trainer App', sub: 'iOS Trainer Workspace', icon: UserCheck },
    { id: 'operations', label: 'Operations Command', sub: 'Live Fleet & Session CRM', icon: Shield },
    { id: 'admin', label: 'Executive Admin', sub: 'Stripe/Tesla-style CRM', icon: Activity }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Reset State Button */}
      <button 
        onClick={resetDb}
        title="Reset Demo Database"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-champagne hover:border-gold hover:text-gold text-charcoal/70 shadow-sm transition-all duration-300 glass-panel"
      >
        <RefreshCw size={16} className="hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* Main Mode Controller */}
      <div className="glass-panel p-3 rounded-2xl shadow-xl border border-gold/10 flex flex-col gap-1 w-72 max-w-sm">
        <div className="px-2 py-1.5 border-b border-champagne/40 mb-2">
          <span className="text-[10px] tracking-[0.3em] font-medium text-gold uppercase">
            Aurelia Demo console
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activePanel === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => onChangePanel(mode.id)}
                className={`flex items-center gap-3.5 p-2.5 rounded-xl text-left transition-all duration-500 ${
                  isActive
                    ? 'bg-charcoal text-ivory shadow-lg shadow-charcoal/10'
                    : 'text-charcoal/70 hover:bg-champagne/30 hover:text-charcoal'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${
                  isActive ? 'bg-gold/20 text-gold' : 'bg-stone/30 text-charcoal/60'
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-[12px] font-medium tracking-wide">
                    {mode.label}
                  </div>
                  <div className={`text-[9px] ${isActive ? 'text-ivory/60' : 'text-charcoal/40'}`}>
                    {mode.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
