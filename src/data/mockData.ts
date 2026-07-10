export interface Trainer {
  id: string;
  name: string;
  role: string;
  rating: number;
  sessionsCount: number;
  certifications: string[];
  specialties: string[];
  bio: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export interface Package {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'Paused' | 'Pending';
  trainerId: string;
  metrics: {
    weight: number[];
    bodyFat: number[];
    muscleMass: number[];
    dates: string[];
  };
  upcomingSessions: Array<{
    id: string;
    date: string;
    time: string;
    location: string;
    type: string;
  }>;
  mealPlan: Array<{
    day: string;
    meal: string;
    recipe: string;
    calories: number;
    macros: string;
  }>;
  photos: string[];
}

export const trainers: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Alexander Sterling',
    role: 'Elite Athletic Performance & Longevity',
    rating: 5.0,
    sessionsCount: 1420,
    certifications: ['NASM-PES', 'Exos Performance Specialist', 'Precision Nutrition L2'],
    specialties: ['High-Performance Training', 'Metabolic Optimization', 'Biomechanical Alignment'],
    bio: 'Former Olympic-level track coach specialized in structural longevity and elite human athletic conditioning for high-performance executives.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 40.7829, lng: -73.9654 } // Central Park
  },
  {
    id: 'tr-2',
    name: 'Seraphina Laurent',
    role: 'Somatic Flow, Yoga & Neuro-Restoration',
    rating: 4.9,
    sessionsCount: 980,
    certifications: ['RYT-500 Somatic Yoga', 'FST Level 3 (Fascial Stretch)', 'MA Kinesiology'],
    specialties: ['Fascial Stretch Therapy', 'Mind-Body Integration', 'Cortical Recovery'],
    bio: 'Integrates premium orthopedic mobility with breathwork and recovery methodologies to restore nervous system equilibrium and build fluid strength.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 40.7580, lng: -73.9855 } // Times Square area
  },
  {
    id: 'tr-3',
    name: 'Marcus Vance',
    role: 'Strength Architecture & Metabolic Science',
    rating: 5.0,
    sessionsCount: 1850,
    certifications: ['CSCS *D', 'USAW Sports Performance', 'ISSN Sports Nutritionist'],
    specialties: ['Hypertrophy Science', 'Strength Development', 'Body Composition Modification'],
    bio: 'Specialist in private home gym architectural planning and custom high-efficiency hypertrophic systems for international clients.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 40.7484, lng: -73.9857 } // Empire State Building
  },
  {
    id: 'tr-4',
    name: 'Helena Moreno',
    role: 'Holistic Kinematics & Postnatal Longevity',
    rating: 4.9,
    sessionsCount: 1100,
    certifications: ['ACE Medical Exercise Specialist', 'STOTT Pilates Trainer', 'Pre/Post Natal Specialist'],
    specialties: ['Kinesiology Analysis', 'Postural Restoration', 'Pelvic Floor Rehabilitation'],
    bio: 'Focuses on structural mechanics, posture correction, and tailored functional longevity programs for high-net-worth families.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
    coordinates: { lat: 40.8075, lng: -73.9626 } // Morningside Heights
  }
];

export const packages: Package[] = [
  {
    id: 'pkg-1',
    name: 'Bespoke Wellness Assessment',
    price: 350,
    period: 'one-time',
    description: 'Comprehensive physical, physiological, metabolic, and movement architecture diagnostics.',
    features: [
      '90-minute bio-mechanical evaluation',
      'Blood lactate & metabolic threshold screening',
      'Postural & 3D functional mobility scan',
      'Personalized longevity and training roadmap'
    ]
  },
  {
    id: 'pkg-2',
    name: 'Aurelia Bespoke Monthly',
    price: 5000,
    period: 'month',
    description: 'Private 1-on-1 performance and recovery ecosystem designed specifically for your lifestyle.',
    features: [
      '12 Private In-Home or On-Location sessions',
      'Dedicated primary Elite Performance Coach',
      'Weekly Fascial Stretch & recovery sessions',
      'Custom luxury nutrition & meal prep pairing'
    ]
  },
  {
    id: 'pkg-3',
    name: 'Ecosystem Annual Membership',
    price: 55000,
    period: 'year',
    description: 'The ultimate luxury fitness residency. Multi-location support and elite concierge access.',
    features: [
      'Unlimited sessions across NY, Hamptons, Aspen & Palm Beach',
      'Coordinated training team (Lead Trainer + Somatic Specialist)',
      'Quarterly advanced biometric & laboratory reviews',
      '24/7 Concierge travel schedule integration'
    ]
  },
  {
    id: 'pkg-4',
    name: 'Corporate Executive Suite',
    price: 25000,
    period: 'month',
    description: 'Corporate wellness architectures designed to maximize productivity and vitality of elite boards.',
    features: [
      'In-office performance studio setup consulting',
      'Daily board-member restorative sessions',
      'Executive metabolic nutrition delivery coaching',
      'Quarterly physical resilience retreats'
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Victoria Vance-Montgomery',
    email: 'victoria@montgomerycap.com',
    plan: 'Aurelia Bespoke Monthly',
    status: 'Active',
    trainerId: 'tr-1',
    metrics: {
      weight: [64.2, 63.8, 63.1, 62.5, 62.1],
      bodyFat: [22.4, 21.8, 21.0, 20.2, 19.5],
      muscleMass: [46.8, 47.1, 47.3, 47.6, 47.9],
      dates: ['May 1', 'May 15', 'Jun 1', 'Jun 15', 'Jul 1']
    },
    upcomingSessions: [
      { id: 'sess-101', date: 'July 11', time: '08:00 AM', location: 'Tribeca Penthouse', type: 'High Performance HIIT' },
      { id: 'sess-102', date: 'July 13', time: '08:00 AM', location: 'Tribeca Penthouse', type: 'Biomechanical Mobility' }
    ],
    mealPlan: [
      { day: 'Monday', meal: 'Breakfast', recipe: 'Poached Organic Eggs, Avocado Mousse, Sourdough, Microgreens', calories: 420, macros: 'P: 25g | C: 30g | F: 22g' },
      { day: 'Monday', meal: 'Lunch', recipe: 'Pan-seared Wild Salmon, Quinoa Salad, Lemon Herb Vinaigrette', calories: 580, macros: 'P: 45g | C: 40g | F: 25g' },
      { day: 'Monday', meal: 'Dinner', recipe: 'Grass-fed Filet Mignon, Roasted Asparagus, Sweet Potato Puree', calories: 650, macros: 'P: 50g | C: 35g | F: 28g' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=300'
    ]
  },
  {
    id: 'cust-2',
    name: 'Julian Mercer',
    email: 'j.mercer@mercerpartners.com',
    plan: 'Ecosystem Annual Membership',
    status: 'Active',
    trainerId: 'tr-3',
    metrics: {
      weight: [88.5, 88.0, 87.2, 86.8, 86.1],
      bodyFat: [18.2, 17.7, 16.9, 16.2, 15.5],
      muscleMass: [68.2, 68.9, 69.4, 70.1, 70.8],
      dates: ['May 1', 'May 15', 'Jun 1', 'Jun 15', 'Jul 1']
    },
    upcomingSessions: [
      { id: 'sess-103', date: 'July 11', time: '07:00 AM', location: 'Soho Loft Gym', type: 'Hypertrophic Conditioning' },
      { id: 'sess-104', date: 'July 14', time: '07:00 AM', location: 'Soho Loft Gym', type: 'Power Development' }
    ],
    mealPlan: [
      { day: 'Monday', meal: 'Breakfast', recipe: 'Seared Wagyu Flank, Soft-boiled Farm Eggs, Roasted Tomatoes', calories: 610, macros: 'P: 55g | C: 12g | F: 38g' },
      { day: 'Monday', meal: 'Lunch', recipe: 'Free-range Roast Chicken Breast, Steamed Broccolini, Jasmine Rice', calories: 590, macros: 'P: 48g | C: 50g | F: 18g' },
      { day: 'Monday', meal: 'Dinner', recipe: 'Baked Halibut, Lemon Caper Jus, Braised Fennel & Quinoa', calories: 520, macros: 'P: 42g | C: 45g | F: 15g' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300'
    ]
  }
];

// Mock Live Sessions for Operations Dashboard
export interface LiveSession {
  id: string;
  customerName: string;
  trainerName: string;
  location: string;
  type: string;
  status: 'In Progress' | 'En Route' | 'Completed';
  etaMinutes?: number;
  durationMinutes: number;
}

export const initialLiveSessions: LiveSession[] = [
  {
    id: 'live-1',
    customerName: 'Victoria Vance-Montgomery',
    trainerName: 'Alexander Sterling',
    location: 'Tribeca Penthouse',
    type: 'High Performance HIIT',
    status: 'In Progress',
    durationMinutes: 42
  },
  {
    id: 'live-2',
    customerName: 'Julian Mercer',
    trainerName: 'Marcus Vance',
    location: 'Soho Loft Gym',
    type: 'Hypertrophic Conditioning',
    status: 'En Route',
    etaMinutes: 8,
    durationMinutes: 60
  }
];

// Database simulation helpers using LocalStorage
class MockDatabase {
  private getStorageItem<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(`aurelia_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  }

  private setStorageItem<T>(key: string, value: T): void {
    localStorage.setItem(`aurelia_${key}`, JSON.stringify(value));
  }

  getCustomers(): Customer[] {
    return this.getStorageItem<Customer[]>('customers', initialCustomers);
  }

  saveCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    const idx = customers.findIndex(c => c.id === customer.id);
    if (idx !== -1) {
      customers[idx] = customer;
    } else {
      customers.push(customer);
    }
    this.setStorageItem('customers', customers);
  }

  getBookings() {
    return this.getStorageItem<any[]>('bookings', [
      { id: 'b-1', customerName: 'Victoria Vance-Montgomery', trainerName: 'Alexander Sterling', date: 'July 11', time: '08:00 AM', location: 'Tribeca Penthouse', status: 'Confirmed', package: 'Aurelia Bespoke Monthly', amount: 5000 },
      { id: 'b-2', customerName: 'Julian Mercer', trainerName: 'Marcus Vance', date: 'July 11', time: '07:00 AM', location: 'Soho Loft Gym', status: 'Confirmed', package: 'Ecosystem Annual Membership', amount: 55000 }
    ]);
  }

  addBooking(booking: any) {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    this.setStorageItem('bookings', bookings);

    // Also automatically create/update customer profile for CRM link
    const customers = this.getCustomers();
    const trainer = trainers.find(t => t.name === booking.trainerName) || trainers[0];
    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: booking.customerName,
      email: booking.email || `${booking.customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      plan: booking.package,
      status: 'Active',
      trainerId: trainer.id,
      metrics: {
        weight: [82.0],
        bodyFat: [18.0],
        muscleMass: [62.0],
        dates: ['Jul 10']
      },
      upcomingSessions: [
        { id: `sess-${Date.now()}`, date: booking.date, time: booking.time, location: booking.location, type: 'Initial Premium Assessment' }
      ],
      mealPlan: [
        { day: 'Monday', meal: 'Breakfast', recipe: 'Organic Protein Blend, Mixed Berry Bowl, Chia Seeds', calories: 350, macros: 'P: 30g | C: 25g | F: 12g' },
        { day: 'Monday', meal: 'Lunch', recipe: 'Seared Wild Halibut & Asparagus Medley', calories: 450, macros: 'P: 40g | C: 20g | F: 18g' },
        { day: 'Monday', meal: 'Dinner', recipe: 'Lean Wagyu Ribeye & Sautéed Leafy Greens', calories: 600, macros: 'P: 45g | C: 15g | F: 28g' }
      ],
      photos: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300']
    };
    this.saveCustomer(newCust);
  }

  getLiveSessions(): LiveSession[] {
    return this.getStorageItem<LiveSession[]>('live_sessions', initialLiveSessions);
  }

  updateLiveSession(session: LiveSession): void {
    const sessions = this.getLiveSessions();
    const idx = sessions.findIndex(s => s.id === session.id);
    if (idx !== -1) {
      sessions[idx] = session;
    } else {
      sessions.push(session);
    }
    this.setStorageItem('live_sessions', sessions);
  }
}

export const db = new MockDatabase();
