import { Shield, Network, Monitor, KeyRound, Database, Users, Headphones, Server, Fingerprint } from "lucide-react";

export interface Solution {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: typeof Shield;
  capabilities: string[];
  partners: string[];
  industries: string[];
  slug: string;
  benefits: string[];
  useCases: string[];
  process: { title: string; description: string }[];
  isFlagship?: boolean;
  externalUrl?: string;
}

export const solutions: Solution[] = [
  // {
  //   id: "tandem-iga",
  //   title: "Tandem IGA – IdentityGuard",
  //   shortTitle: "Tandem IGA",
  //   description: "Our flagship Enterprise Identity Governance & Administration platform. Centralized identity management, access control, MFA, time & attendance, and comprehensive audit trails — built by Tandem.",
  //   longDescription: "Tandem IGA (IdentityGuard) is our proprietary Identity Governance & Administration platform designed for modern enterprises. It delivers centralized user management with Active Directory sync, OAuth & SAML SSO, multi-factor authentication, geo-fenced time & attendance tracking with NFC support, shared mailbox collaboration, and deep analytics with comprehensive audit trails. Purpose-built to simplify identity governance while maintaining enterprise-grade security.",
  //   icon: Fingerprint,
  //   isFlagship: true,
  //   externalUrl: "https://igs.tandem.co.ke/",
  //   capabilities: [
  //     "Identity Governance & Administration",
  //     "Multi-Factor Authentication (MFA)",
  //     "OAuth & SAML Single Sign-On",
  //     "Active Directory Sync",
  //     "Geo-fenced Time & Attendance",
  //     "NFC-based Access Tracking",
  //     "Shared Mailbox & Collaboration",
  //     "Comprehensive Audit Trails & Analytics"
  //   ],
  //   partners: ["Tandem (In-house)"],
  //   industries: ["Banking & Financial Services", "Healthcare", "Public Sector", "Manufacturing & Industrial"],
  //   slug: "tandem-iga",
  //   benefits: [
  //     "Centralized identity management from a single platform",
  //     "Enterprise-grade security with MFA and threat detection",
  //     "Streamlined access control with SSO and RDP management",
  //     "Real-time workforce tracking with geo-fencing and NFC",
  //     "Full compliance visibility with audit trails and reporting"
  //   ],
  //   useCases: [
  //     "Enterprise unified 10,000+ identities across multiple directories",
  //     "Financial institution achieved full access governance compliance",
  //     "Organization reduced onboarding time by 70% with automated provisioning"
  //   ],
  //   process: [
  //     { title: "Discovery & Planning", description: "Assess current identity landscape and define governance requirements" },
  //     { title: "Platform Deployment", description: "Deploy IdentityGuard with AD sync and SSO integration" },
  //     { title: "Policy Configuration", description: "Configure access policies, MFA, and compliance rules" },
  //     { title: "Go-Live & Optimization", description: "Launch with training, monitoring, and continuous improvement" }
  //   ]
  // },
  {
    id: "ot-security",
    title: "Operational Technology (OT) Cybersecurity",
    shortTitle: "Operational Technology (OT) Cybersecurity",
    description: "Protect critical infrastructure and industrial control systems with specialized OT security solutions designed for manufacturing, energy, and utilities sectors.",
    longDescription: "Our OT Cybersecurity solutions bridge the gap between operational technology and information technology security. We provide comprehensive protection for industrial control systems, SCADA networks, and critical infrastructure while ensuring operational continuity and safety. Our approach combines deep industrial expertise with cutting-edge security technologies from our leading partners.",
    icon: Shield,
    capabilities: [
      "Industrial Control System (ICS) Security",
      "SCADA System Protection",
      "OT Network Segmentation",
      "Real-time Threat Detection",
      "Vulnerability Assessment for Industrial Systems",
      "Compliance with IEC 62443"
    ],
    partners: ["TXOne Networks", "Nozomi Networks", "Fortinet"],
    industries: ["Manufacturing & Industrial", "Energy & Utilities", "Logistics & Transport", "Healthcare"],
    slug: "Operational Technology cybersecurity",
    benefits: [
      "Reduce risk of operational disruption from cyber attacks",
      "Maintain visibility across all OT assets and networks",
      "Achieve compliance with industry regulations",
      "Minimize unplanned downtime and production losses",
      "Protect legacy systems without disrupting operations"
    ],
    useCases: [
      "A mining company secured their extraction operations, preventing $2M in potential daily losses",
      "Power utility achieved NERC CIP compliance within 6 months",
      "Manufacturing plant gained 100% visibility into their OT network"
    ],
    process: [
      { title: "Discovery & Assessment", description: "Complete inventory of all OT assets and identification of vulnerabilities" },
      { title: "Architecture Design", description: "Design secure network segmentation and protection strategies" },
      { title: "Implementation", description: "Deploy security solutions with zero operational disruption" },
      { title: "Monitoring & Response", description: "24/7 threat monitoring and incident response capabilities" }
    ]
  },
  {
    id: "enterprise-security",
    title: "Enterprise, Network & Cloud Security",
    shortTitle: "Enterprise, Network & Cloud Security",
    description: "Comprehensive security solutions for enterprise networks, cloud environments, and hybrid infrastructures with advanced threat protection.",
    longDescription: "Our Enterprise Security solutions provide multi-layered protection for your entire digital infrastructure. From on-premises networks to multi-cloud environments, we deliver integrated security that adapts to your business needs. Our solutions combine next-generation firewalls, cloud security posture management, and zero-trust architecture to create a resilient security foundation.",
    icon: Network,
    capabilities: [
      "Next-Generation Firewall (NGFW)",
      "Cloud Security Posture Management",
      "Zero Trust Network Access",
      "Secure SD-WAN",
      "DDoS Protection",
      "Security Information & Event Management (SIEM)"
    ],
    partners: ["Palo Alto Networks", "Fortinet", "Microsoft"],
    industries: ["All Industries"],
    slug: "enterprise-network-cloud-security",
    benefits: [
      "Unified visibility across on-prem and cloud environments",
      "Reduce attack surface with zero-trust architecture",
      "Accelerate threat detection and response times",
      "Simplify security management with integrated platforms",
      "Enable secure hybrid work and remote access"
    ],
    useCases: [
      "Financial institution blocked 99.9% of threats with NGFW deployment",
      "Healthcare provider secured multi-cloud infrastructure across 3 providers",
      "Enterprise reduced security incident response time by 70%"
    ],
    process: [
      { title: "Security Assessment", description: "Evaluate current posture and identify gaps" },
      { title: "Strategy Development", description: "Create roadmap aligned with business objectives" },
      { title: "Technology Deployment", description: "Implement integrated security solutions" },
      { title: "Continuous Optimization", description: "Ongoing tuning and improvement" }
    ]
  },
  {
    id: "endpoint-management",
    title: "Endpoint & Unified Device Management",
    shortTitle: "Endpoint & Unified Device Management",
    description: "Secure and manage all endpoints across your organization with unified endpoint management and advanced threat protection.",
    longDescription: "In today's distributed workforce, endpoints are the new perimeter. Our Endpoint Management solutions provide comprehensive protection and management for all devices from workstations and laptops to mobile devices and IoT sensors. We combine advanced threat detection with unified management to ensure every endpoint is secure, compliant, and optimized.",
    icon: Monitor,
    capabilities: [
      "Endpoint Detection & Response (EDR)",
      "Mobile Device Management (MDM)",
      "Unified Endpoint Management (UEM)",
      "Application Whitelisting",
      "Patch Management",
      "Device Encryption"
    ],
    partners: ["Hexnode", "Microsoft Intune", "VMware Workspace ONE"],
    industries: ["All Industries"],
    slug: "endpoint-device-management",
    benefits: [
      "Protect against ransomware and advanced threats",
      "Manage all devices from a single console",
      "Automate patch management and compliance",
      "Enable secure BYOD policies",
      "Reduce IT operational overhead"
    ],
    useCases: [
      "Retail chain secured 10,000+ POS terminals across locations",
      "Professional services firm enabled secure remote work for 5,000 employees",
      "University managed 25,000 student and staff devices"
    ],
    process: [
      { title: "Device Inventory", description: "Complete audit of all endpoint devices" },
      { title: "Policy Definition", description: "Define security and management policies" },
      { title: "Solution Deployment", description: "Roll out UEM and EDR solutions" },
      { title: "Lifecycle Management", description: "Ongoing device and security management" }
    ]
  },
  {
    id: "identity-access",
    title: "Identity, Privileged Access & Trust (IAM)",
    shortTitle: "Identity & Privileged Access Management",
    description: "Protect identities and manage privileged access with comprehensive identity governance and zero-trust authentication solutions.",
    longDescription: "Identity is the foundation of modern security. Our IAM solutions provide comprehensive identity governance, privileged access management, and zero-trust authentication. We help organizations ensure the right people have the right access at the right time, while protecting against identity-based attacks that account for over 80% of breaches.",
    icon: KeyRound,
    capabilities: [
      "Identity Governance & Administration",
      "Privileged Access Management (PAM)",
      "Multi-Factor Authentication (MFA)",
      "Single Sign-On (SSO)",
      "Identity Threat Detection",
      "Access Certification & Reviews"
    ],
    partners: ["CyberArk", "SailPoint", "Okta", "Microsoft Entra"],
    industries: ["All Industries"],
    slug: "identity-privileged-access",
    benefits: [
      "Prevent credential theft and identity-based attacks",
      "Achieve regulatory compliance for access management",
      "Streamline user experience with SSO",
      "Reduce privileged access risks",
      "Automate access reviews and certifications"
    ],
    useCases: [
      "Bank reduced privileged access incidents by 95%",
      "Healthcare network achieved HIPAA compliance for access management",
      "Government agency implemented zero-trust access for 50,000 users"
    ],
    process: [
      { title: "Identity Assessment", description: "Evaluate current identity landscape and risks" },
      { title: "Architecture Design", description: "Design zero-trust identity architecture" },
      { title: "Solution Implementation", description: "Deploy IAM, PAM, and MFA solutions" },
      { title: "Governance & Optimization", description: "Establish ongoing governance processes" }
    ]
  },
  {
    id: "data-governance",
    title: "Data Governance, Privacy & Compliance",
    shortTitle: "Data Governance, Security & Compliance",
    description: "Ensure data privacy, regulatory compliance, and effective governance with comprehensive data protection and classification solutions.",
    longDescription: "Data is your most valuable asset and your biggest liability if not properly protected. Our Data Governance solutions help you discover, classify, and protect sensitive data across your organization. We ensure compliance with regulations like GDPR, POPIA, and PCI-DSS while enabling your business to leverage data securely.",
    icon: Database,
    capabilities: [
      "Data Loss Prevention (DLP)",
      "Data Classification & Discovery",
      "Privacy Management",
      "Regulatory Compliance (GDPR, POPIA, PCI-DSS)",
      "Data Encryption & Masking",
      "Audit & Reporting"
    ],
    partners: ["Microsoft Purview", "BigID"],
    industries: ["All Industries"],
    slug: "data-governance-privacy-compliance",
    benefits: [
      "Achieve and maintain regulatory compliance",
      "Prevent data breaches and leakage",
      "Gain visibility into sensitive data locations",
      "Reduce compliance audit effort and cost",
      "Build customer trust through privacy protection"
    ],
    useCases: [
      "Insurance company achieved POPIA compliance in 4 months",
      "Hospital network discovered and protected 2M patient records",
      "Retailer reduced PCI-DSS audit time by 60%"
    ],
    process: [
      { title: "Data Discovery", description: "Find and classify all sensitive data" },
      { title: "Risk Assessment", description: "Identify compliance gaps and risks" },
      { title: "Control Implementation", description: "Deploy DLP, encryption, and governance tools" },
      { title: "Compliance Monitoring", description: "Continuous monitoring and reporting" }
    ]
  },
  {
    id: "cyber-services",
    title: "Cybersecurity & Digital Services",
    shortTitle: "Cybersecurity & Digital Services",
    description: "Expert cybersecurity consulting, managed security services, and digital transformation support for organizations of all sizes.",
    longDescription: "Not every organization can build an in-house security team. Our Cyber Services provide expert support from security operations to strategic consulting. Whether you need a fully managed SOC, penetration testing, or virtual CISO services, our team of certified professionals becomes an extension of your organization.",
    icon: Users,
    capabilities: [
      "Security Operations Center (SOC) as a Service",
      "Penetration Testing & Red Team",
      "Security Awareness Training",
      "Incident Response & Forensics",
      "Virtual CISO Services",
      "Security Architecture Review"
    ],
    partners: ["Multiple Technology Partners"],
    industries: ["All Industries"],
    slug: "cybersecurity-digital-services",
    benefits: [
      "24/7 security monitoring without building a SOC",
      "Access to certified security expertise on demand",
      "Identify vulnerabilities before attackers do",
      "Rapid incident response capabilities",
      "Strategic security guidance aligned to business"
    ],
    useCases: [
      "Mid-size company gained 24/7 SOC coverage at 40% less than in-house",
      "E-commerce platform fixed critical vulnerabilities found in pentest",
      "NGO improved staff security awareness by 80%"
    ],
    process: [
      { title: "Requirements Analysis", description: "Understand your security needs and gaps" },
      { title: "Service Design", description: "Customize services to your requirements" },
      { title: "Service Activation", description: "Onboard and activate security services" },
      { title: "Continuous Improvement", description: "Regular reviews and optimization" }
    ]
  },
  {
    id: "contact-center",
    title: "Contact Center & Customer Experience",
    shortTitle: "Contact Center & Call Recording",
    description: "Secure and enhance customer experience with modern contact center solutions that prioritize security and compliance.",
    longDescription: "Customer experience is a competitive differentiator, but it must be secure. Our Contact Center solutions combine omnichannel engagement with enterprise-grade security. We help you deliver exceptional customer experiences while protecting sensitive customer data and maintaining PCI-DSS compliance.",
    icon: Headphones,
    capabilities: [
      "Omnichannel Contact Center",
      "Secure Voice & Video",
      "Customer Journey Analytics",
      "AI-Powered Chatbots",
      "Quality Management",
      "PCI-DSS Compliant Payments"
    ],
    partners: ["Genesys", "NICE", "Five9"],
    industries: ["All Industries"],
    slug: "contact-center-customer-experience",
    benefits: [
      "Improve customer satisfaction scores",
      "Reduce average handle time with AI assistance",
      "Ensure PCI-DSS compliance for payments",
      "Gain insights from customer journey analytics",
      "Enable seamless omnichannel experiences"
    ],
    useCases: [
      "Bank improved NPS by 25 points with secure omnichannel solution",
      "Healthcare provider reduced call wait times by 50%",
      "Logistics company enabled real-time shipment tracking via chatbot"
    ],
    process: [
      { title: "CX Assessment", description: "Evaluate current customer experience and pain points" },
      { title: "Solution Design", description: "Design omnichannel experience with security in mind" },
      { title: "Platform Deployment", description: "Implement and integrate contact center solution" },
      { title: "Optimization", description: "Continuous improvement based on analytics" }
    ]
  },
  {
    id: "erp-crm",
    title: "Business Operations Systems",
    shortTitle: "ERP, CRM & Business Systems",
    description: "Secure implementation and management of enterprise resource planning and customer relationship management systems.",
    longDescription: "Business systems like ERP, HR and CRM contain your organization's most sensitive data and processes. Our solutions ensure these critical systems are implemented securely and remain protected throughout their lifecycle.",
    icon: Server,
    capabilities: [
      "Identity & Access Governance (HR & ERP)",
      "Enterprise Resource Risk Management",
      "Customer Data Privacy & Vaulting",
      "Business Logic & API Integrity",
      "Cross-Platform Data Orchestration Security",
      "Automated Business Process Compliance",
    ],
    partners: ["Microsoft Dynamics 365", "Salesforce"],
    industries: ["All Industries"],
    slug: "erp-crm-business-systems",
    benefits: [
      "Protect critical business data and processes",
      "Ensure segregation of duties and compliance",
      "Secure API integrations between systems",
      "Reduce risk of fraud and unauthorized changes",
      "Enable secure digital transformation"
    ],
    useCases: [
      "Manufacturer secured SAP landscape serving 20 global facilities",
      "Bank achieved SOX compliance for Salesforce implementation",
      "Retailer protected customer data across integrated systems"
    ],
    process: [
      { title: "System Assessment", description: "Evaluate security posture of business systems" },
      { title: "Risk Remediation", description: "Address identified vulnerabilities and gaps" },
      { title: "Security Hardening", description: "Implement security controls and monitoring" },
      { title: "Governance", description: "Establish ongoing security governance processes" }
    ]
  }
];
