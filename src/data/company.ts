export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
}

// removing the partners we don't work with and adding new
export const partners: Partner[] = [
  { 
    id: "palo-alto", 
    name: "Palo Alto Networks", 
    logo: "/images/partners/palo-alto.png",
    category: "Network Security",
    description: "Industry-leading next-generation firewalls and cloud-based security solutions for enterprise protection.",
    website: "https://www.paloaltonetworks.com"
  },
  { 
    id: "hexnode", 
    name: "Hexnode", 
    logo: "/images/partners/hexnode.png",
    category: "Endpoint Security",
    description: "Unified endpoint management platform for securing and managing devices across enterprises.",
    website: "https://www.hexnode.com"
  },
  { 
    id: "xdece", 
    name: "Xdece", 
    logo: "/images/partners/xdece.png",
    category: "Data Security Posture Management",
    description: "An intelligent data security platform.",
    website: "https://www.xdece.com"
  },
  { 
    id: "microsoft", 
    name: "Microsoft", 
    logo: "/images/partners/microsoft.png",
    category: "Cloud & Identity",
    description: "Comprehensive cloud computing, productivity, and enterprise security solutions.",
    website: "https://www.microsoft.com/security"
  },
  { 
    id: "levelblue", 
    name: "LevelBlue", 
    logo: "/images/partners/levelblue.png",
    category: "Unified Security Management",
    description: "Expert managed security services and proactive threat intelligence.",
    website: "https://www.levelblue.com"
  },
  { 
    id: "baar-iga", 
    name: "Baar Iga", 
    logo: "/images/partners/baar-iga.png",
    category: "Identity",
    description: "Automates user lifecycle management, access provisioning, and compliance.",
    website: "https://www.baar-iga.com"
  },
  { 
    id: "threatcop", 
    name: "ThreatCop", 
    logo: "/images/partners/threatcop.png",
    category: "Security Awareness",
    description: "People-centric security simulation and awareness training platforms.",
    website: "https://www.threatcop.com"
  },
  { 
    id: "seamlesshr", 
    name: "SeamlessHR", 
    logo: "/images/partners/seamlesshr.png",
    category: "HR Technology",
    description: "End-to-end HR and payroll management software for growing enterprises.",
    website: "https://www.seamlesshr.com"
  },
  { 
    id: "fortinet", 
    name: "Fortinet", 
    logo: "/images/partners/fortinet.png",
    category: "Network Security",
    description: "High-performance network security appliances and unified threat management.",
    website: "https://www.fortinet.com"
  },
  { 
    id: "txone", 
    name: "TXOne Networks", 
    logo: "/images/partners/txone.png",
    category: "OT Security",
    description: "OT-native cybersecurity solutions purpose-built for industrial control systems and critical infrastructure.",
    website: "https://www.txone.com"
  },
  { 
    id: "zscaler", 
    name: "Zscaler", 
    logo: "/images/partners/zscaler.png",
    category: "Cloud Security",
    description: "Cloud-native zero trust platform for secure digital transformation.",
    website: "https://www.zscaler.com"
  },
  { 
    id: "callminer", 
    name: "CallMiner", 
    logo: "/images/partners/callminer.png",
    category: "Contact Center Analytics",
    description: "AI-powered conversation analytics platform for improving contact center performance and compliance.",
    website: "https://www.callminer.com"
  },
  { 
    id: "okta", 
    name: "Okta", 
    logo: "/images/partners/okta.png",
    category: "Identity",
    description: "Enterprise-grade identity management with single sign-on and MFA.",
    website: "https://www.okta.com"
  },
  { 
    id: "microsoft-dynamics", 
    name: "Microsoft Dynamics 365", 
    logo: "/images/partners/microsoft.png",
    category: "ERP",
    description: "Intelligent business applications that deliver operational excellence and create more engaging customer experiences.",
    website: "https://dynamics.microsoft.com"
  },
  { 
    id: "nozomi", 
    name: "Nozomi Networks", 
    logo: "/images/partners/nozomi.png",
    category: "OT Security",
    description: "OT and IoT security and visibility solutions for critical infrastructure.",
    website: "https://www.nozominetworks.com"
  }
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Technology Partners" },
  { value: "9+", label: "Solution Areas" },
  { value: "8", label: "Countries Served" },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Tandem Technologies transformed our security posture with their comprehensive OT security implementation. Their expertise in industrial systems is unmatched.",
    author: "John Mbeki",
    role: "CISO",
    company: "Leading Mining Corporation"
  },
  {
    id: "2",
    quote: "The identity management solution deployed by Tandem has significantly reduced our security risks while improving user experience across our organization.",
    author: "Sarah van der Berg",
    role: "IT Director",
    company: "Major Financial Institution"
  },
  {
    id: "3",
    quote: "Their managed security services provide us with peace of mind, knowing that our critical infrastructure is monitored and protected around the clock.",
    author: "David Nkosi",
    role: "CIO",
    company: "National Energy Provider"
  }
];
