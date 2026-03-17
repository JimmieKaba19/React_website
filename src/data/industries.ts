import { Building2, Factory, Zap, Heart, GraduationCap, Truck, HandHeart, Car } from "lucide-react";

export interface Industry {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: typeof Building2;
  challenges: string[];
  relevantSolutions: string[];
  stakeholders: string[];
  slug: string;
  regulations: string[];
  stats: { value: string; label: string }[];
  caseStudyPreview: { title: string; result: string };
}

export const industries: Industry[] = [
  {
    id: "banking",
    title: "Banking & Financial Services",
    description: "Protect financial assets, ensure regulatory compliance, and secure digital banking services with specialized security solutions for the financial sector.",
    longDescription: "Financial institutions are prime targets for cybercriminals. With the rise of digital banking, mobile payments, and open banking APIs, the attack surface continues to expand. Our specialized solutions for banking and financial services address the unique challenges of protecting financial assets while enabling innovation and maintaining strict regulatory compliance.",
    icon: Building2,
    challenges: [
      "Regulatory compliance (PCI-DSS, POPIA, Basel III)",
      "Fraud prevention and detection",
      "Secure digital banking and mobile apps",
      "Third-party and vendor risk management",
      "Data privacy and customer trust",
      "Open banking API security"
    ],
    relevantSolutions: ["identity-access", "data-governance", "enterprise-security", "cyber-services"],
    stakeholders: ["CISO", "CIO", "Head of Risk", "Compliance Officer", "Digital Banking Lead"],
    slug: "banking-financial-services",
    regulations: ["PCI-DSS", "POPIA", "Basel III", "SARB Guidelines", "GLBA"],
    stats: [
      { value: "R4.5B", label: "Protected in transactions daily" },
      { value: "15+", label: "Financial institution clients" },
      { value: "99.99%", label: "Fraud prevention rate" }
    ],
    caseStudyPreview: {
      title: "Major Bank Achieves Zero-Trust Architecture",
      result: "Reduced identity-related incidents by 95% and achieved full regulatory compliance"
    }
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industrial",
    description: "Secure operational technology, protect intellectual property, and ensure production continuity with industrial-grade cybersecurity solutions.",
    longDescription: "Manufacturing environments face unique challenges as IT and OT networks converge. Legacy industrial systems, IIoT devices, and complex supply chains create a vast attack surface. Our solutions protect production lines, intellectual property, and business operations while ensuring safety and maintaining uptime in 24/7 manufacturing environments.",
    icon: Factory,
    challenges: [
      "OT/IT convergence security",
      "Intellectual property protection",
      "Supply chain security",
      "Industrial IoT (IIoT) security",
      "Legacy system protection",
      "Production continuity and safety"
    ],
    relevantSolutions: ["ot-security", "endpoint-management", "enterprise-security", "erp-crm"],
    stakeholders: ["Plant Manager", "OT Security Lead", "CIO", "Operations Director", "Quality Manager"],
    slug: "manufacturing-industrial",
    regulations: ["IEC 62443", "ISO 27001", "NIST CSF", "Industry 4.0 Standards"],
    stats: [
      { value: "0", label: "Production stoppages from cyber" },
      { value: "100%", label: "OT asset visibility" },
      { value: "45%", label: "Reduction in security incidents" }
    ],
    caseStudyPreview: {
      title: "Mining Corporation Secures Operations",
      result: "Protected $2M daily operations with comprehensive OT security"
    }
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    description: "Protect critical infrastructure, ensure grid reliability, and maintain regulatory compliance with specialized security for energy and utilities sectors.",
    longDescription: "Energy and utilities form the backbone of modern society. Protecting critical infrastructure from nation-state actors, ransomware, and insider threats is paramount. Our solutions provide defense-in-depth for power generation, transmission, distribution, and smart grid systems while ensuring compliance with stringent industry regulations.",
    icon: Zap,
    challenges: [
      "Critical infrastructure protection",
      "NERC CIP and regulatory compliance",
      "Smart grid and AMI security",
      "Remote asset protection",
      "Operational resilience",
      "Nation-state threat actors"
    ],
    relevantSolutions: ["ot-security", "enterprise-security", "endpoint-management", "cyber-services"],
    stakeholders: ["CISO", "Operations Manager", "Grid Security Officer", "Compliance Manager", "Asset Manager"],
    slug: "energy-utilities",
    regulations: ["NERC CIP", "IEC 62351", "NIST SP 800-82", "NIS Directive"],
    stats: [
      { value: "5GW", label: "Power generation protected" },
      { value: "24/7", label: "OT security monitoring" },
      { value: "100%", label: "Regulatory compliance" }
    ],
    caseStudyPreview: {
      title: "National Utility Achieves NERC CIP Compliance",
      result: "Full compliance achieved in 6 months with zero operational disruption"
    }
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Protect patient data, secure medical devices, and ensure HIPAA/POPIA compliance with healthcare-specific cybersecurity solutions.",
    longDescription: "Healthcare organizations hold some of the most sensitive personal data and operate life-critical systems. From electronic health records to connected medical devices, security is not just about compliance—it's about patient safety. Our healthcare solutions protect patient privacy, secure medical devices, and ensure business continuity for hospitals, clinics, and healthcare networks.",
    icon: Heart,
    challenges: [
      "Patient data privacy (HIPAA/POPIA)",
      "Medical device security (IoMT)",
      "Ransomware protection",
      "Telemedicine security",
      "Legacy system integration",
      "Clinical workflow continuity"
    ],
    relevantSolutions: ["data-governance", "identity-access", "endpoint-management", "enterprise-security"],
    stakeholders: ["CIO", "CISO", "Chief Medical Officer", "Privacy Officer", "Clinical Director"],
    slug: "healthcare",
    regulations: ["HIPAA", "POPIA", "GDPR", "FDA Cybersecurity Guidance", "NIST Healthcare"],
    stats: [
      { value: "2M+", label: "Patient records protected" },
      { value: "500+", label: "Medical devices secured" },
      { value: "0", label: "Patient data breaches" }
    ],
    caseStudyPreview: {
      title: "Hospital Network Secures Patient Data",
      result: "Achieved HIPAA compliance and prevented ransomware across 12 facilities"
    }
  },
  {
    id: "public-sector",
    title: "Public Sector & Education",
    description: "Secure citizen services, protect sensitive data, and ensure compliance with government cybersecurity standards and regulations.",
    longDescription: "Government agencies and educational institutions serve millions of citizens and students, handling sensitive personal data and providing critical services. Budget constraints, legacy systems, and evolving threats make security challenging. Our solutions help public sector organizations protect citizen data, secure digital services, and build public trust.",
    icon: GraduationCap,
    challenges: [
      "Citizen and student data protection",
      "Government compliance frameworks",
      "Budget and resource constraints",
      "Legacy system modernization",
      "Public trust and transparency",
      "Digital service security"
    ],
    relevantSolutions: ["identity-access", "data-governance", "enterprise-security", "cyber-services"],
    stakeholders: ["CIO", "IT Director", "Security Officer", "Department Head", "Registrar"],
    slug: "public-sector-education",
    regulations: ["POPIA", "MISS", "NIST CSF", "ISO 27001", "FERPA"],
    stats: [
      { value: "1M+", label: "Citizens/students protected" },
      { value: "50+", label: "Government departments served" },
      { value: "40%", label: "Cost reduction vs. in-house" }
    ],
    caseStudyPreview: {
      title: "Provincial Government Modernizes Security",
      result: "Implemented zero-trust access for 50,000 employees across departments"
    }
  },
  {
    id: "logistics",
    title: "Logistics & Transport",
    description: "Secure supply chain operations, protect fleet management systems, and ensure operational continuity for logistics and transportation companies.",
    longDescription: "The logistics and transportation sector is the backbone of global commerce. From fleet management systems to warehouse automation, connected technologies enable efficiency but create security risks. Our solutions protect the digital supply chain, secure IoT devices, and ensure the continuous flow of goods while maintaining customer trust.",
    icon: Truck,
    challenges: [
      "Fleet and IoT device security",
      "Supply chain visibility and protection",
      "Real-time tracking system security",
      "Partner ecosystem security",
      "Warehouse automation protection",
      "Customer data protection"
    ],
    relevantSolutions: ["ot-security", "endpoint-management", "enterprise-security", "contact-center"],
    stakeholders: ["CIO", "Fleet Manager", "Operations Director", "IT Security Manager", "Supply Chain Head"],
    slug: "logistics-transport",
    regulations: ["CTPAT", "ISO 28000", "GDPR", "POPIA", "AEO Standards"],
    stats: [
      { value: "10K+", label: "Fleet vehicles monitored" },
      { value: "99.9%", label: "System uptime" },
      { value: "60%", label: "Faster incident response" }
    ],
    caseStudyPreview: {
      title: "Logistics Giant Secures Fleet Operations",
      result: "Protected 5,000 connected vehicles across 8 countries"
    }
  },
  {
    id: "ngos",
    title: "NGOs & Non-Profits",
    description: "Protect donor data, secure operations, and ensure mission continuity with cost-effective cybersecurity solutions for non-profit organizations.",
    longDescription: "Non-profit organizations often operate with limited resources but handle sensitive donor and beneficiary data. They're increasingly targeted by attackers who see them as soft targets. Our solutions provide enterprise-grade security at non-profit-friendly pricing, protecting your mission, your donors, and the communities you serve.",
    icon: HandHeart,
    challenges: [
      "Donor data protection",
      "Limited security budgets",
      "Volunteer and contractor access",
      "Remote and field operations",
      "Grant compliance requirements",
      "Reputation protection"
    ],
    relevantSolutions: ["data-governance", "identity-access", "endpoint-management", "cyber-services"],
    stakeholders: ["Executive Director", "IT Manager", "Program Director", "Finance Director", "Development Director"],
    slug: "ngos-non-profits",
    regulations: ["POPIA", "GDPR", "PCI-DSS", "Grant Compliance", "Charity Commission"],
    stats: [
      { value: "50+", label: "NGO clients served" },
      { value: "R50M+", label: "Donor funds protected" },
      { value: "30%", label: "Below commercial pricing" }
    ],
    caseStudyPreview: {
      title: "International NGO Secures Global Operations",
      result: "Protected donor data across 15 countries with limited budget"
    }
  },
  {
    id: "automotive-aftermarket",
    title: "Automotive Aftermarket",
    description: "Secure multi-branch retail operations, protect supply chain integrity, and safeguard customer vehicle data across East Africa’s leading fitment networks.",
    longDescription: "As the automotive industry shifts toward digital service tracking and e-commerce parts distribution, the risk of supply chain disruption and data theft increases. Our solutions for the aftermarket sector focus on ensuring 100% uptime for retail fitment centers, securing point-of-sale systems, and protecting the proprietary data used in modern vehicle diagnostics and fleet management.",
    icon: Car, 
    challenges: [
      "Securing multi-branch Point-of-Sale (POS) networks",
      "Supply chain visibility and protection against counterfeit parts",
      "Protection of customer PII (Personal Identifiable Information) in loyalty programs",
      "Securing IoT-enabled vehicle diagnostic tools",
      "Uptime for real-time inventory and e-TIMS integration",
      "Cyber-resilience for regional distribution centers"
    ],
    relevantSolutions: ["endpoint-protection", "network-security", "data-privacy", "managed-it-services"],
    stakeholders: ["CEO", "Operations Director", "IT Manager", "Supply Chain Lead"],
    slug: "automotive-aftermarket",
    regulations: ["Kenya Data Protection Act (2019)", "ISO 9001:2015", "Consumer Protection Act"],
    stats: [
      { value: "87+", label: "Service centers secured" },
      { value: "600+", label: "Devices protected across branches" },
      { value: "99.9%", label: "System uptime for retail operations" }
    ],
    caseStudyPreview: {
      title: "Securing East Africa's Largest Fitment Network",
      result: "Implemented centralized device management across 87+ branches"
    }
  }
];
