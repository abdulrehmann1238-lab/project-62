import { useState } from 'react';
import { Loader } from './components/Loader';
import { ControlHub, ActivePanel } from './components/ControlHub';
import { MarketingSite } from './views/MarketingSite';
import { CustomerApp } from './views/CustomerApp';
import { TrainerApp } from './views/TrainerApp';
import { OperationsApp } from './views/OperationsApp';
import { AdminDashboard } from './views/AdminDashboard';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>('marketing');
  
  // A booking trigger count. When incremented, it forces the booking modal to open in the marketing site.
  const [bookingTrigger, setBookingTrigger] = useState(0);

  const handleResetDb = () => {
    localStorage.removeItem('aurelia_customers');
    localStorage.removeItem('aurelia_bookings');
    localStorage.removeItem('aurelia_live_sessions');
    window.location.reload();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1F2421]">
      {/* Cinematic Loading Experience */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Main Experience (Visible after loading completes) */}
      {isLoaded && (
        <div className="animate-scale-up min-h-screen flex flex-col justify-between">
          
          {/* Main Workspace Panels */}
          <div className="flex-1">
            {activePanel === 'marketing' && (
              <MarketingSite 
                onOpenApp={(panel) => setActivePanel(panel)} 
                bookingTrigger={bookingTrigger}
              />
            )}
            
            {activePanel === 'customer' && (
              <CustomerApp 
                onTriggerBooking={() => {
                  setActivePanel('marketing');
                  setBookingTrigger(prev => prev + 1);
                }} 
              />
            )}

            {activePanel === 'trainer' && (
              <TrainerApp />
            )}

            {activePanel === 'operations' && (
              <OperationsApp />
            )}

            {activePanel === 'admin' && (
              <AdminDashboard />
            )}
          </div>

          {/* Interactive Floating Control Hub switcher */}
          <ControlHub 
            activePanel={activePanel} 
            onChangePanel={(panel) => setActivePanel(panel)} 
            resetDb={handleResetDb}
          />
        </div>
      )}
    </div>
  );
}

export default App;
