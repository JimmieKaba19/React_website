import { ArrowDown } from "lucide-react";

// Shared Slide Components
export const TitleSlide = ({ title, subtitle, footer, theme }: { 
  title: string; 
  subtitle: string; 
  footer?: string;
  theme?: DeckTheme;
}) => {
  const t = theme || defaultTheme;
  return (
    <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: t.dark, color: '#ffffff' }}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: t.secondary }}>{title}</h1>
      <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: t.accent }}>{subtitle}</p>
      {footer && (
        <div className="mt-16 font-bold tracking-widest text-sm text-white/70">{footer}</div>
      )}
    </section>
  );
};

export const SlideHeader = ({ title, theme }: { title: string; theme?: DeckTheme }) => {
  const t = theme || defaultTheme;
  return (
    <div className="absolute top-10 left-10 flex items-center">
      <div className="w-1.5 h-10 mr-4" style={{ backgroundColor: t.secondary }} />
      <h2 className="text-2xl md:text-4xl font-bold" style={{ color: t.primary }}>{title}</h2>
    </div>
  );
};

export const Card = ({ title, children, variant = "primary", theme }: { 
  title: string; 
  children: React.ReactNode; 
  variant?: "primary" | "secondary" | "dark";
  theme?: DeckTheme;
}) => {
  const t = theme || defaultTheme;
  const styles = {
    primary: { bg: t.light, border: t.primary, titleColor: t.primary, textColor: '#444' },
    secondary: { bg: t.light, border: t.secondary, titleColor: t.primary, textColor: '#444' },
    dark: { bg: t.dark, border: t.secondary, titleColor: t.secondary, textColor: '#fff' },
  };
  const s = styles[variant];
  
  return (
    <div 
      className="p-6 md:p-8 rounded-2xl shadow-md border-l-4"
      style={{ backgroundColor: s.bg, borderColor: s.border }}
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: s.titleColor }}>
        {title}
      </h3>
      <div className="text-base md:text-lg leading-relaxed" style={{ color: s.textColor }}>
        {children}
      </div>
    </div>
  );
};

export const StatItem = ({ value, label, theme }: { value: string; label: string; theme?: DeckTheme }) => {
  const t = theme || defaultTheme;
  return (
    <div className="text-center">
      <div className="text-5xl md:text-7xl font-extrabold" style={{ color: t.primary }}>{value}</div>
      <div className="text-sm md:text-base text-gray-600 uppercase tracking-widest mt-2">{label}</div>
    </div>
  );
};

export const CheckList = ({ items, theme }: { items: string[]; theme?: DeckTheme }) => {
  const t = theme || defaultTheme;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-center text-base md:text-lg">
          <span className="font-bold mr-3" style={{ color: t.primary }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
};

export const DiagramNode = ({ label, sublabel, variant = "primary", theme }: { 
  label: string; 
  sublabel: string; 
  variant?: "primary" | "secondary" | "accent" | "sap";
  theme?: DeckTheme;
}) => {
  const t = theme || defaultTheme;
  const styles = {
    primary: { bg: t.primary, color: '#ffffff' },
    secondary: { bg: t.secondary, color: t.dark },
    accent: { bg: t.dark, color: t.accent },
    sap: { bg: '#0089d1', color: '#ffffff' },
  };
  const s = styles[variant];
  
  return (
    <div 
      className="px-4 py-5 md:px-6 md:py-6 rounded-xl text-center font-bold shadow-lg min-w-[140px] md:min-w-[180px]"
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      <div className="text-sm md:text-base">{label}</div>
      <div className="text-xs opacity-80 mt-1">{sublabel}</div>
    </div>
  );
};

export const NavigationHint = () => (
  <div className="fixed bottom-5 right-5 bg-black/50 text-white px-5 py-2.5 rounded-full text-sm flex items-center gap-2 pointer-events-none z-50">
    <ArrowDown className="h-4 w-4 animate-bounce" />
    Scroll to navigate
  </div>
);

// Theme type
export interface DeckTheme {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  accent: string;
}

const defaultTheme: DeckTheme = {
  primary: '#2e7d32',
  secondary: '#fbc02d',
  dark: '#1b2e1c',
  light: '#f1f8e9',
  accent: '#81c784',
};

// Deck interface
export interface Deck {
  id: string;
  title: string;
  client: string;
  description: string;
  date: string;
  theme: DeckTheme;
  component: React.ComponentType<{ theme: DeckTheme }>;
}

// Mansa Sugar Deck Component
const MansaSugarDeck = ({ theme }: { theme: DeckTheme }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <TitleSlide 
        title="Mansa Sugar Digital Core" 
        subtitle="Unified Agriculture Operations & SAP Business One Integration"
        footer="TANDEM TECHNOLOGIES"
        theme={theme}
      />

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="The Challenge" theme={theme} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
          <Card title="Operational Blindspots" theme={theme}>
            <p>Field scouting currently takes days to digitize. Management lacks real-time visibility on crop health and soil moisture across 15,000 hectares.</p>
          </Card>
          <Card title="Disconnected Data" theme={theme}>
            <p>Farm management data (Cropin) and financial data (SAP B1) live in silos, leading to inefficient procurement and inaccurate yield forecasting.</p>
          </Card>
        </div>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Technical Architecture" theme={theme} />
        <div className="w-full max-w-5xl bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-10 mt-16">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-4 md:gap-6 relative">
            <DiagramNode label="EDGE LAYER" sublabel="IoT & Weather Stations" variant="primary" theme={theme} />
            <DiagramNode label="AERIAL LAYER" sublabel="Drones (DJI Agras)" variant="secondary" theme={theme} />
            <DiagramNode label="ORCHESTRATOR" sublabel="Hitachi Pentaho" variant="accent" theme={theme} />
            <DiagramNode label="BUSINESS CORE" sublabel="SAP Business One" variant="sap" theme={theme} />
          </div>
          <div className="w-full h-0.5 bg-gray-300 my-6 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-2xl">➔</span>
          </div>
        </div>
        <p className="text-center max-w-3xl mt-8 text-gray-700 text-base md:text-lg">
          <strong>Hitachi Pentaho</strong> acts as the intelligent bridge, ingesting field telemetry (MQTT/REST) and pushing transactional data into <strong>SAP B1</strong> via API Framework.
        </p>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Real-Time Synergy" theme={theme} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
          <Card title="Weather-Optimized Drones" theme={theme}>
            <p>The IoT Weather Station grounds the drone fleet automatically if wind speeds exceed 15km/h, ensuring spray accuracy and asset safety.</p>
          </Card>
          <Card title="SAP-Integrated Inventory" variant="secondary" theme={theme}>
            <p>When soil sensors detect specific nutrient depletion, Pentaho triggers an automated <strong>Purchase Request</strong> in SAP B1 for fertilizer restocking.</p>
          </Card>
        </div>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Value Proposition" theme={theme} />
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl gap-8 md:gap-4 mt-16">
          <StatItem value="30%" label="Water Savings" theme={theme} />
          <StatItem value="20%" label="Yield Increase" theme={theme} />
          <StatItem value="1.5" label="Season ROI" theme={theme} />
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#0089d1] text-white font-bold px-6 py-3 rounded mb-4">
            SAP Business One Powered
          </div>
          <p className="text-gray-600 italic">Eliminating human error in yield forecasting and inventory management.</p>
        </div>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Implementation Roadmap" theme={theme} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: theme.primary }}>Month 1-3: Pilot</h3>
              <CheckList items={["IoT & Weather Deployment (1,500 Ha)", "Pentaho to SAP B1 Connectivity"]} theme={theme} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: theme.primary }}>Month 4-6: Scale</h3>
              <CheckList items={["Drone Fleet Launch (Agris T40)", "Variable-Rate Prescription Maps"]} theme={theme} />
            </div>
          </div>
          <Card title="Full Optimization" variant="dark" theme={theme}>
            <p>Total estate integration (15,000 Ha) with AI-driven predictive yield modeling and outgrower support dashboards.</p>
          </Card>
        </div>
      </section>

      <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: theme.dark }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>Partnering for Growth</h1>
        <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: theme.accent }}>Mansa Sugar & Tandem Technologies</p>
        <div className="mt-10 px-8 py-5 rounded-xl" style={{ border: `1px solid ${theme.accent}` }}>
          <p className="text-white">Contact: project-lead@tandemtech.com</p>
        </div>
      </section>

      <NavigationHint />
    </div>
  );
};

// Healthcare Digital Deck Component
const HealthcareDigitalDeck = ({ theme }: { theme: DeckTheme }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <TitleSlide 
        title="Regional Health Network" 
        subtitle="Integrated Patient Management & Telemedicine Platform"
        footer="TANDEM TECHNOLOGIES"
        theme={theme}
      />

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Current Challenges" theme={theme} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
          <Card title="Fragmented Records" theme={theme}>
            <p>Patient data scattered across 12 facilities with no unified view. Average record lookup takes 15+ minutes, impacting emergency response.</p>
          </Card>
          <Card title="Limited Access" theme={theme}>
            <p>Rural communities travel 2+ hours for specialist consultations. 40% of appointments missed due to distance and transportation costs.</p>
          </Card>
        </div>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Solution Architecture" theme={theme} />
        <div className="w-full max-w-5xl bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-10 mt-16">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-4 md:gap-6 relative">
            <DiagramNode label="PATIENT PORTAL" sublabel="Mobile & Web Access" variant="primary" theme={theme} />
            <DiagramNode label="TELEHEALTH" sublabel="Video Consultations" variant="secondary" theme={theme} />
            <DiagramNode label="EHR SYSTEM" sublabel="Unified Records" variant="accent" theme={theme} />
            <DiagramNode label="ANALYTICS" sublabel="Health Insights" variant="sap" theme={theme} />
          </div>
          <div className="w-full h-0.5 bg-gray-300 my-6 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-2xl">➔</span>
          </div>
        </div>
        <p className="text-center max-w-3xl mt-8 text-gray-700 text-base md:text-lg">
          A <strong>cloud-native platform</strong> connecting all facilities with real-time data sync and <strong>HIPAA-compliant</strong> security.
        </p>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Expected Impact" theme={theme} />
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl gap-8 md:gap-4 mt-16">
          <StatItem value="75%" label="Faster Access" theme={theme} />
          <StatItem value="50%" label="Cost Reduction" theme={theme} />
          <StatItem value="3x" label="Patient Reach" theme={theme} />
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block font-bold px-6 py-3 rounded mb-4 text-white" style={{ backgroundColor: theme.primary }}>
            HL7 FHIR Compliant
          </div>
          <p className="text-gray-600 italic">Interoperability with national health systems and insurance providers.</p>
        </div>
      </section>

      <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: theme.dark }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>Transforming Healthcare</h1>
        <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: theme.accent }}>Regional Health Network & Tandem Technologies</p>
        <div className="mt-10 px-8 py-5 rounded-xl" style={{ border: `1px solid ${theme.accent}` }}>
          <p className="text-white">Contact: healthcare@tandemtech.com</p>
        </div>
      </section>

      <NavigationHint />
    </div>
  );
};

// Smart City Deck Component
const SmartCityDeck = ({ theme }: { theme: DeckTheme }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <TitleSlide 
        title="Metro Smart City Initiative" 
        subtitle="IoT-Driven Urban Infrastructure Management"
        footer="TANDEM TECHNOLOGIES"
        theme={theme}
      />

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Urban Challenges" theme={theme} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mt-16">
          <Card title="Traffic Congestion" theme={theme}>
            <p>Average commute times increased 35% over 5 years. Manual traffic management unable to adapt to real-time conditions.</p>
          </Card>
          <Card title="Resource Waste" theme={theme}>
            <p>Street lighting operates on fixed schedules, wasting 40% energy. Water systems lose 25% to undetected leaks.</p>
          </Card>
        </div>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Smart Infrastructure" theme={theme} />
        <div className="w-full max-w-5xl bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-10 mt-16">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-4 md:gap-6 relative">
            <DiagramNode label="SENSORS" sublabel="10,000+ IoT Devices" variant="primary" theme={theme} />
            <DiagramNode label="AI ENGINE" sublabel="Predictive Analytics" variant="secondary" theme={theme} />
            <DiagramNode label="CONTROL CENTER" sublabel="Unified Dashboard" variant="accent" theme={theme} />
            <DiagramNode label="CITIZEN APP" sublabel="Public Services" variant="sap" theme={theme} />
          </div>
          <div className="w-full h-0.5 bg-gray-300 my-6 relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-2xl">➔</span>
          </div>
        </div>
        <p className="text-center max-w-3xl mt-8 text-gray-700 text-base md:text-lg">
          An <strong>AI-powered command center</strong> that optimizes traffic flow, energy usage, and emergency response in real-time.
        </p>
      </section>

      <section className="w-full min-h-screen snap-start flex flex-col justify-center items-center relative bg-white p-6 md:p-10 pt-24">
        <SlideHeader title="Projected Outcomes" theme={theme} />
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl gap-8 md:gap-4 mt-16">
          <StatItem value="25%" label="Traffic Reduction" theme={theme} />
          <StatItem value="40%" label="Energy Savings" theme={theme} />
          <StatItem value="60%" label="Faster Response" theme={theme} />
        </div>
        <div className="mt-16 text-center">
          <div className="inline-block font-bold px-6 py-3 rounded mb-4 text-white" style={{ backgroundColor: theme.primary }}>
            ISO 37120 Certified
          </div>
          <p className="text-gray-600 italic">Meeting international standards for sustainable urban development.</p>
        </div>
      </section>

      <section className="w-full h-screen snap-start flex flex-col justify-center items-center relative p-10" style={{ backgroundColor: theme.dark }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>Building Tomorrow's City</h1>
        <p className="text-xl md:text-2xl opacity-90 text-center" style={{ color: theme.accent }}>Metro Municipality & Tandem Technologies</p>
        <div className="mt-10 px-8 py-5 rounded-xl" style={{ border: `1px solid ${theme.accent}` }}>
          <p className="text-white">Contact: smartcity@tandemtech.com</p>
        </div>
      </section>

      <NavigationHint />
    </div>
  );
};

// All available decks
export const decks: Deck[] = [
  {
    id: 'mansa-sugar',
    title: 'Mansa Sugar Digital Core',
    client: 'Mansa Sugar',
    description: 'Unified Agriculture Operations & SAP Business One Integration',
    date: 'January 2026',
    theme: {
      primary: '#2e7d32',
      secondary: '#fbc02d',
      dark: '#1b2e1c',
      light: '#f1f8e9',
      accent: '#81c784',
    },
    component: MansaSugarDeck,
  },
  {
    id: 'healthcare-digital',
    title: 'Regional Health Network',
    client: 'Regional Health Authority',
    description: 'Integrated Patient Management & Telemedicine Platform',
    date: 'December 2025',
    theme: {
      primary: '#1565c0',
      secondary: '#4fc3f7',
      dark: '#0d47a1',
      light: '#e3f2fd',
      accent: '#81d4fa',
    },
    component: HealthcareDigitalDeck,
  },
  {
    id: 'smart-city',
    title: 'Metro Smart City Initiative',
    client: 'Metro Municipality',
    description: 'IoT-Driven Urban Infrastructure Management',
    date: 'November 2025',
    theme: {
      primary: '#6a1b9a',
      secondary: '#ce93d8',
      dark: '#4a148c',
      light: '#f3e5f5',
      accent: '#ba68c8',
    },
    component: SmartCityDeck,
  },
];
