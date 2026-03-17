export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: "whitepaper" | "case-study" | "webinar" | "blog" | "guide";
  image: string;
  date: string;
  readTime?: string;
  featured?: boolean;
  author?: {
    name: string;
    role: string;
  };
  tags?: string[];
}

export const resources: Resource[] = [
  {
    id: "1",
    slug: "state-of-ot-security-africa-2024",
    title: "The State of OT Security in Africa 2024",
    description: "A comprehensive analysis of operational technology security challenges and trends across African industries, with actionable recommendations for enterprise leaders.",
    content: `
## Executive Summary

Operational Technology (OT) security has become a critical concern for African enterprises as digital transformation accelerates across the continent. This whitepaper examines the current state of OT security, emerging threats, and strategic recommendations for organizations looking to protect their critical infrastructure.

## Key Findings

### 1. Convergence of IT and OT Networks

The traditional air gap between IT and OT networks is disappearing rapidly. Our research shows that **78% of African industrial organizations** have some level of IT/OT convergence, yet only **34%** have implemented comprehensive security measures for these converged environments.

### 2. Rising Threat Landscape

Cyber attacks targeting OT systems in Africa have increased by **156%** over the past two years. Key threat actors include:

- **Nation-state actors** targeting critical infrastructure
- **Ransomware groups** seeking high-value industrial targets
- **Hacktivists** with political motivations

### 3. Skills Gap

There is a significant shortage of OT security professionals across the continent. Organizations report an average of **6 months** to fill OT security positions, with many roles remaining vacant indefinitely.

## Recommendations

1. **Implement network segmentation** between IT and OT environments
2. **Deploy OT-specific security monitoring** tools
3. **Develop incident response plans** tailored to OT environments
4. **Invest in training** for both IT and OT personnel
5. **Engage specialized partners** for OT security assessments

## Conclusion

African organizations must prioritize OT security to protect critical infrastructure and maintain operational resilience. The investment in security today will prevent costly disruptions tomorrow.
    `,
    category: "whitepaper",
    image: "/placeholder.svg",
    date: "2024-11-15",
    readTime: "15 min read",
    featured: true,
    author: {
      name: "Dr. Amara Okonkwo",
      role: "Chief Security Researcher",
    },
    tags: ["OT Security", "Industrial Control Systems", "Critical Infrastructure"],
  },
  {
    id: "2",
    slug: "kengen-critical-infrastructure-security",
    title: "How KenGen Secured Critical Infrastructure",
    description: "Learn how Kenya's largest power generator implemented comprehensive OT security measures to protect critical energy infrastructure.",
    content: `
## Client Overview

Kenya Electricity Generating Company (KenGen) is the leading power producer in Kenya, responsible for generating over 70% of the country's electricity. With power plants across the country including hydro, geothermal, thermal, and wind facilities, KenGen operates critical infrastructure essential to Kenya's economic growth.

## The Challenge

KenGen faced several critical security challenges:

- **Legacy systems** with limited security capabilities
- **Distributed facilities** across remote locations
- **Increasing connectivity** requirements for operational efficiency
- **Regulatory compliance** with emerging cybersecurity frameworks

## Our Approach

### Phase 1: Assessment

We conducted a comprehensive OT security assessment across all KenGen facilities:

- Network architecture review
- Asset inventory and classification
- Vulnerability assessment
- Risk analysis and prioritization

### Phase 2: Design

Based on the assessment findings, we designed a multi-layered security architecture:

- **Network segmentation** using industrial firewalls
- **Continuous monitoring** with OT-specific SIEM
- **Access control** with privileged access management
- **Secure remote access** for maintenance and support

### Phase 3: Implementation

The implementation was carefully phased to avoid operational disruption:

- Pilot deployment at one facility
- Staged rollout across remaining sites
- Integration with existing IT security operations
- Training for operations and security teams

## Results

Within 12 months of implementation, KenGen achieved:

- **95% visibility** into OT network traffic
- **Zero unplanned downtime** due to security incidents
- **Compliance** with industry security standards
- **50% reduction** in time to detect and respond to threats

## Client Testimonial

> "Tandem Security understood the unique challenges of securing power generation infrastructure. Their approach balanced security requirements with operational realities, and the results speak for themselves."
> 
> — James Mwangi, Chief Information Security Officer, KenGen
    `,
    category: "case-study",
    image: "/placeholder.svg",
    date: "2024-10-28",
    readTime: "8 min read",
    featured: true,
    author: {
      name: "Peter Njoroge",
      role: "OT Security Lead",
    },
    tags: ["Case Study", "Energy Sector", "OT Security", "Critical Infrastructure"],
  },
  {
    id: "3",
    slug: "zero-trust-architecture-african-enterprises",
    title: "Zero Trust Architecture for African Enterprises",
    description: "Recorded webinar exploring practical implementation of Zero Trust security models in the African business context.",
    content: `
## Webinar Overview

This recorded webinar provides a comprehensive introduction to Zero Trust Architecture and practical guidance for implementation in African enterprise environments.

## What You'll Learn

- **Core principles** of Zero Trust security
- **Implementation strategies** for different organizational sizes
- **Technology requirements** and vendor considerations
- **Common pitfalls** and how to avoid them
- **Case studies** from African organizations

## Key Topics Covered

### Understanding Zero Trust

Zero Trust is not a product but a security philosophy built on the principle of "never trust, always verify." This session explains:

- The limitations of perimeter-based security
- Core Zero Trust principles
- The Zero Trust maturity model

### Practical Implementation

Moving from concept to reality requires careful planning:

- Assessment of current security posture
- Defining protect surfaces
- Mapping transaction flows
- Building Zero Trust policies
- Monitoring and maintenance

### African Context Considerations

Unique factors affecting Zero Trust adoption in Africa:

- Bandwidth and connectivity challenges
- Skills availability
- Budget constraints
- Regulatory landscape

## Speakers

**Fatima Hassan** - Director of Security Architecture, Tandem Security

**Dr. Kwame Asante** - Professor of Cybersecurity, University of Nairobi

## Resources

- Slides from the presentation
- Zero Trust implementation checklist
- Recommended reading list
    `,
    category: "webinar",
    image: "/placeholder.svg",
    date: "2024-10-10",
    readTime: "45 min watch",
    author: {
      name: "Fatima Hassan",
      role: "Director of Security Architecture",
    },
    tags: ["Zero Trust", "Enterprise Security", "Webinar"],
  },
  {
    id: "4",
    slug: "gdpr-popia-compliance-guide",
    title: "GDPR & POPIA Compliance Guide",
    description: "Essential guide for organizations navigating data protection regulations in Africa and Europe, with practical compliance checklists.",
    content: `
## Introduction

Data protection regulations are reshaping how organizations handle personal information. This guide provides practical guidance for compliance with both the EU's General Data Protection Regulation (GDPR) and South Africa's Protection of Personal Information Act (POPIA).

## Understanding the Regulations

### GDPR Overview

The GDPR applies to:
- Organizations based in the EU
- Organizations offering goods/services to EU residents
- Organizations monitoring behavior of EU residents

Key requirements:
- Lawful basis for processing
- Data subject rights
- Privacy by design
- Data breach notification
- Appointment of DPO (in certain cases)

### POPIA Overview

POPIA applies to:
- Any organization processing personal information in South Africa
- Organizations using means in South Africa to process data

Key requirements:
- Purpose limitation
- Information quality
- Security safeguards
- Data subject participation
- Accountability

## Compliance Checklist

### Data Mapping
- [ ] Identify all personal data processed
- [ ] Document data flows
- [ ] Classify data by sensitivity
- [ ] Identify legal basis for processing

### Policies and Procedures
- [ ] Privacy policy updated
- [ ] Data retention policy defined
- [ ] Breach response procedure documented
- [ ] Data subject request procedures in place

### Technical Measures
- [ ] Encryption at rest and in transit
- [ ] Access controls implemented
- [ ] Logging and monitoring active
- [ ] Regular security assessments

### Organizational Measures
- [ ] Staff training completed
- [ ] DPO appointed (if required)
- [ ] Vendor assessments conducted
- [ ] Processing agreements in place

## Common Challenges

1. **Cross-border transfers**: Managing data transfers between jurisdictions
2. **Consent management**: Obtaining and tracking valid consent
3. **Data subject requests**: Responding within required timeframes
4. **Breach notification**: Meeting 72-hour notification requirements

## Conclusion

Compliance with data protection regulations requires ongoing effort and commitment. Organizations should treat compliance as a journey rather than a destination, continuously improving their data protection practices.
    `,
    category: "guide",
    image: "/placeholder.svg",
    date: "2024-09-22",
    readTime: "20 min read",
    author: {
      name: "Sarah Ndlovu",
      role: "Data Protection Consultant",
    },
    tags: ["GDPR", "POPIA", "Compliance", "Data Protection"],
  },
  {
    id: "5",
    slug: "ransomware-defense-strategies-2024",
    title: "Ransomware Defense Strategies for 2024",
    description: "Latest insights on protecting your organization from evolving ransomware threats, including incident response best practices.",
    content: `
## The Evolving Ransomware Threat

Ransomware continues to be one of the most significant threats facing organizations in 2024. Attack techniques have evolved, with threat actors now employing:

- **Double extortion**: Encrypting data AND threatening to publish it
- **Triple extortion**: Adding DDoS attacks or targeting customers
- **Ransomware-as-a-Service**: Lowering barriers to entry for attackers
- **Supply chain attacks**: Compromising software providers to reach multiple targets

## Defense Strategies

### Prevention

**Email Security**
- Advanced threat protection for email
- User awareness training
- Phishing simulation exercises

**Endpoint Protection**
- Next-gen antivirus with behavioral analysis
- Application whitelisting
- Privilege access management

**Network Security**
- Network segmentation
- Zero Trust network access
- DNS filtering

### Detection

Early detection can mean the difference between a minor incident and a major breach:

- **EDR/XDR deployment**: Real-time endpoint monitoring
- **SIEM integration**: Centralized log analysis
- **Threat hunting**: Proactive search for indicators of compromise
- **User behavior analytics**: Detecting anomalous activity

### Response

When prevention fails, rapid response is critical:

1. **Isolate affected systems** immediately
2. **Preserve evidence** for investigation
3. **Activate incident response team**
4. **Assess scope** of the attack
5. **Communicate** with stakeholders
6. **Restore from backups** (if available and clean)
7. **Conduct post-incident review**

### Recovery

Building resilience through preparation:

- **Immutable backups**: Backups that cannot be modified or deleted
- **Backup testing**: Regular restoration tests
- **Incident response plans**: Documented and practiced procedures
- **Cyber insurance**: Financial protection for major incidents

## Key Recommendations

1. Assume you will be targeted
2. Invest in prevention AND response capabilities
3. Test your backups regularly
4. Train your employees continuously
5. Engage expert partners for assessment and response

## Conclusion

Ransomware is not going away. Organizations must adopt a comprehensive approach that combines prevention, detection, response, and recovery capabilities to minimize risk and impact.
    `,
    category: "blog",
    image: "/placeholder.svg",
    date: "2024-09-15",
    readTime: "6 min read",
    author: {
      name: "Michael Osei",
      role: "Threat Intelligence Analyst",
    },
    tags: ["Ransomware", "Threat Intelligence", "Incident Response"],
  },
  {
    id: "6",
    slug: "safaricom-identity-governance",
    title: "Identity Governance Success at Safaricom",
    description: "Case study on implementing identity and access management solutions for one of Africa's largest telecommunications companies.",
    content: `
## Client Overview

Safaricom is East and Central Africa's largest telecommunications company, serving over 40 million customers. With a workforce of over 5,000 employees and thousands of contractors and partners, managing digital identities and access rights is a critical security challenge.

## The Challenge

Safaricom's identity management challenges included:

- **Complex identity landscape**: Employees, contractors, partners, and customers
- **Regulatory requirements**: Data protection and telecoms regulations
- **Rapid growth**: Frequent onboarding and offboarding
- **Legacy systems**: Mix of old and new applications

## Solution Overview

### Identity Governance and Administration (IGA)

We implemented a comprehensive IGA solution:

- **Centralized identity repository**
- **Automated provisioning and deprovisioning**
- **Role-based access control**
- **Access certification campaigns**

### Privileged Access Management (PAM)

For privileged accounts:

- **Vault for credential storage**
- **Session recording and monitoring**
- **Just-in-time access provisioning**
- **Emergency break-glass procedures**

### Single Sign-On and MFA

Improving user experience while enhancing security:

- **Enterprise SSO portal**
- **Multi-factor authentication**
- **Adaptive authentication**
- **Self-service password reset**

## Implementation Approach

The project was delivered in four phases over 18 months:

1. **Discovery and Planning** (3 months)
2. **Core Platform Deployment** (6 months)
3. **Application Integration** (6 months)
4. **Optimization and Handover** (3 months)

## Results

The implementation delivered significant improvements:

- **90% reduction** in provisioning time (from days to hours)
- **100% compliance** with access certification requirements
- **60% reduction** in password-related help desk calls
- **Zero orphan accounts** through automated deprovisioning
- **Complete visibility** into privileged access

## Lessons Learned

1. **Executive sponsorship** is essential for organization-wide projects
2. **Clean data** is the foundation of successful identity management
3. **Change management** is as important as technology
4. **Phased approach** reduces risk and allows for learning

## Client Feedback

> "The identity governance program has transformed how we manage access across the organization. We now have confidence that the right people have the right access, and we can prove it to regulators."
>
> — Alice Muthoni, Chief Information Security Officer, Safaricom
    `,
    category: "case-study",
    image: "/placeholder.svg",
    date: "2024-08-30",
    readTime: "10 min read",
    author: {
      name: "Grace Wanjiku",
      role: "IAM Practice Lead",
    },
    tags: ["Identity Management", "Telecom", "Case Study", "IAM"],
  },
  {
    id: "7",
    slug: "cloud-security-best-practices",
    title: "Cloud Security Best Practices",
    description: "Expert guidance on securing cloud infrastructure and applications, with focus on hybrid and multi-cloud environments.",
    content: `
## Introduction

As African organizations accelerate their cloud adoption, security must evolve to address new challenges and opportunities. This guide provides practical recommendations for securing cloud infrastructure and applications.

## Cloud Security Fundamentals

### Shared Responsibility Model

Understanding the division of security responsibilities:

- **IaaS**: Customer responsible for OS, applications, data
- **PaaS**: Customer responsible for applications, data
- **SaaS**: Customer responsible for data, user access

### Identity and Access Management

Core principles for cloud IAM:

- Implement least privilege access
- Use groups and roles, not individual permissions
- Enable MFA for all users
- Regular access reviews

## Multi-Cloud Security

Many organizations use multiple cloud providers. Key considerations:

### Unified Security Management

- Cloud Security Posture Management (CSPM)
- Cloud Workload Protection Platforms (CWPP)
- Cloud Access Security Brokers (CASB)

### Consistent Policies

- Define security baselines applicable across clouds
- Automate policy enforcement
- Centralize logging and monitoring

## Key Security Controls

### Network Security

- Virtual network segmentation
- Security groups and NACLs
- Web Application Firewalls
- DDoS protection

### Data Protection

- Encryption at rest (customer-managed keys)
- Encryption in transit (TLS 1.2+)
- Data Loss Prevention
- Backup and disaster recovery

### Workload Security

- Secure configuration baselines
- Vulnerability management
- Runtime protection
- Container security

## Compliance Considerations

Cloud compliance in the African context:

- Data residency requirements
- Industry-specific regulations
- International frameworks (ISO 27001, SOC 2)
- Regional requirements (POPIA, etc.)

## Recommendations

1. **Start with visibility**: You can't secure what you can't see
2. **Automate security**: Manual processes don't scale
3. **Shift left**: Build security into development pipelines
4. **Prepare for incidents**: Cloud incidents require different response approaches
5. **Train your team**: Cloud security requires new skills

## Conclusion

Cloud security is a journey, not a destination. Organizations should continuously assess and improve their cloud security posture as threats and technologies evolve.
    `,
    category: "guide",
    image: "/placeholder.svg",
    date: "2024-08-18",
    readTime: "12 min read",
    author: {
      name: "David Kimani",
      role: "Cloud Security Architect",
    },
    tags: ["Cloud Security", "Multi-Cloud", "Best Practices"],
  },
  {
    id: "8",
    slug: "securing-industrial-control-systems",
    title: "Securing Industrial Control Systems",
    description: "Deep dive into protecting ICS/SCADA systems in manufacturing and energy sectors from cyber threats.",
    content: `
## Introduction

Industrial Control Systems (ICS) and SCADA systems are the backbone of critical infrastructure. As these systems become more connected, they face increasing cyber risks that require specialized security approaches.

## Understanding ICS/SCADA Security

### The Purdue Model

The traditional reference architecture for ICS security:

- **Level 0-1**: Physical process and basic control
- **Level 2**: Area supervisory control
- **Level 3**: Site operations and control
- **Level 4-5**: Enterprise network and internet

### Key Differences from IT Security

ICS security differs from traditional IT security:

| Aspect | IT | OT/ICS |
|--------|----|----|
| Priority | Confidentiality | Availability |
| Updates | Frequent | Rare/planned |
| Lifespan | 3-5 years | 15-25 years |
| Protocols | IP-based | Proprietary (Modbus, DNP3, etc.) |

## Threat Landscape

### Common Attack Vectors

- Spear phishing targeting engineers
- Removable media (USB drives)
- Remote access exploitation
- Supply chain compromise
- Insider threats

### Notable ICS Attacks

- Stuxnet (2010): Iranian nuclear centrifuges
- Ukraine Power Grid (2015, 2016): Power outages
- TRITON (2017): Safety systems targeted
- Colonial Pipeline (2021): Fuel supply disruption

## Security Framework

### Prevention

- Network segmentation with DMZ
- Secure remote access solutions
- Application whitelisting
- USB device control

### Detection

- OT-specific intrusion detection
- Asset discovery and monitoring
- Anomaly detection
- Log collection and analysis

### Response

- OT-specific incident response plans
- Backup and recovery procedures
- Communication protocols
- Regulatory notification requirements

## Implementation Roadmap

### Phase 1: Assessment (Months 1-3)
- Asset inventory
- Network mapping
- Vulnerability assessment
- Risk analysis

### Phase 2: Quick Wins (Months 4-6)
- Network segmentation
- Password management
- Backup verification
- Security awareness training

### Phase 3: Core Controls (Months 7-12)
- Monitoring and detection
- Remote access security
- Patch management program
- Incident response capability

### Phase 4: Maturity (Year 2+)
- Advanced threat detection
- Security operations integration
- Continuous improvement
- Compliance certification

## Conclusion

ICS security requires a specialized approach that balances security with operational requirements. Organizations should start with risk assessment and build security capabilities progressively.
    `,
    category: "whitepaper",
    image: "/placeholder.svg",
    date: "2024-08-05",
    readTime: "18 min read",
    author: {
      name: "Dr. Amara Okonkwo",
      role: "Chief Security Researcher",
    },
    tags: ["ICS", "SCADA", "OT Security", "Critical Infrastructure"],
  },
  {
    id: "9",
    slug: "building-security-operations-center",
    title: "Building a Security Operations Center",
    description: "Webinar recording on establishing and running an effective SOC for African enterprises of all sizes.",
    content: `
## Webinar Overview

This comprehensive webinar covers the essential elements of building and operating a Security Operations Center (SOC), with practical guidance for organizations of all sizes.

## Key Topics

### SOC Models

**In-house SOC**
- Full control and customization
- Higher initial investment
- Requires skilled staff
- Best for large enterprises

**Hybrid SOC**
- Balance of internal and external resources
- Flexible scaling
- Shared responsibility model
- Good for growing organizations

**Managed SOC (MSSP)**
- Lower upfront costs
- Access to expertise
- 24/7 coverage
- Suitable for smaller organizations

### Essential Components

**People**
- SOC analysts (Tiers 1-3)
- Security engineers
- Threat hunters
- SOC manager

**Process**
- Incident response procedures
- Escalation workflows
- Playbooks and runbooks
- Metrics and reporting

**Technology**
- SIEM platform
- EDR/XDR solutions
- Threat intelligence feeds
- SOAR for automation

### Building Blocks

**Phase 1: Foundation**
- Define scope and objectives
- Select SOC model
- Establish governance
- Baseline security controls

**Phase 2: Technology**
- SIEM deployment
- Log source integration
- Alert tuning
- Dashboard creation

**Phase 3: Operations**
- Team recruitment/training
- Process documentation
- Shift scheduling
- Metrics establishment

**Phase 4: Optimization**
- Continuous improvement
- Automation implementation
- Threat hunting program
- Advanced analytics

## Metrics That Matter

- Mean Time to Detect (MTTD)
- Mean Time to Respond (MTTR)
- Alert volume and false positive rate
- Incidents by severity
- Compliance coverage

## Speaker Panel

**Moderator**: John Mutua, Managing Director, Tandem Security

**Panelists**:
- Catherine Ndegwa, SOC Manager, Large Bank
- Robert Ochieng, Security Director, Manufacturing Company
- Dr. Fatou Diallo, CISO, Regional Telco

## Additional Resources

- SOC maturity assessment template
- Sample SOC charter document
- Technology evaluation criteria
- Staffing model calculator
    `,
    category: "webinar",
    image: "/placeholder.svg",
    date: "2024-07-20",
    readTime: "55 min watch",
    author: {
      name: "John Mutua",
      role: "Managing Director",
    },
    tags: ["SOC", "Security Operations", "SIEM", "Webinar"],
  },
  {
    id: "10",
    slug: "emerging-threats-east-africa",
    title: "Emerging Threats in East Africa",
    description: "Analysis of the latest cyber threats targeting organizations in the East African region and how to prepare for them.",
    content: `
## Threat Landscape Overview

The East African cyber threat landscape continues to evolve rapidly. Our threat intelligence team has identified several concerning trends that organizations should be aware of.

## Key Threat Categories

### Business Email Compromise (BEC)

BEC remains the most financially damaging attack type in the region:

- **CEO fraud**: Impersonating executives to authorize wire transfers
- **Vendor impersonation**: Requesting payment to fraudulent accounts
- **Payroll diversion**: Redirecting employee salaries

**Statistics**: Average loss per BEC incident in East Africa is now **$120,000 USD**, up 35% from last year.

### Mobile-First Attacks

Given the high mobile adoption in East Africa:

- **Mobile banking trojans**: Targeting M-Pesa and mobile banking apps
- **SIM swap fraud**: Taking over phone numbers to bypass MFA
- **Malicious apps**: Fake apps distributed outside official stores

### Ransomware Evolution

Ransomware groups are increasingly targeting African organizations:

- Attacks are more targeted and research-intensive
- Ransom demands have increased significantly
- Data exfiltration before encryption is now standard

## Sector-Specific Threats

### Financial Services
- ATM jackpotting attempts
- Core banking system attacks
- Mobile money fraud

### Healthcare
- Patient data theft
- Ransomware targeting hospitals
- Medical device vulnerabilities

### Government
- Nation-state espionage
- Hacktivism
- Critical infrastructure targeting

## Recommended Actions

### Immediate

1. Review BEC controls and wire transfer procedures
2. Implement MFA on all systems, especially mobile
3. Verify backup integrity and test recovery
4. Update incident response contacts

### Short-term

1. Conduct phishing awareness training
2. Review vendor payment procedures
3. Implement email authentication (DMARC, DKIM, SPF)
4. Deploy endpoint detection and response

### Long-term

1. Develop threat intelligence capability
2. Participate in information sharing groups
3. Engage in regional security communities
4. Conduct regular security assessments

## Conclusion

The threat landscape in East Africa is maturing alongside the region's digital growth. Organizations must evolve their security posture to address these emerging challenges while building resilience for future threats.
    `,
    category: "blog",
    image: "/placeholder.svg",
    date: "2024-07-08",
    readTime: "5 min read",
    author: {
      name: "Michael Osei",
      role: "Threat Intelligence Analyst",
    },
    tags: ["Threat Intelligence", "East Africa", "BEC", "Ransomware"],
  },
];

export const resourceCategories = [
  { value: "all", label: "All Resources" },
  { value: "whitepaper", label: "Whitepapers" },
  { value: "case-study", label: "Case Studies" },
  { value: "webinar", label: "Webinars" },
  { value: "blog", label: "Blog Posts" },
  { value: "guide", label: "Guides" },

];

export const getResourceBySlug = (slug: string): Resource | undefined => {
  return resources.find((r) => r.slug === slug);
};
