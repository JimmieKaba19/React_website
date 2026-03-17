import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logoWhite}
                alt="Tandem Technologies"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Securing Operations. Protecting Identity. Governing Data.
              <br />
              Your trusted partner for enterprise cybersecurity solutions.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:letstalk@tandem.co.ke"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
                letstalk@tandem.co.ke
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  <a href="tel:+254734258175" className="hover:text-accent transition-colors">+254 734 258 175</a>
                  <span className="mx-2">|</span>
                  <a href="tel:+254207602010" className="hover:text-accent transition-colors">+254 020 760 2010</a>
                </span>
              </div>
              <div className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  8th Floor, View Park Towers
                  <br />
                  P.O. Box 56119-00200 Nairobi
                </span>
              </div>
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Solutions</h4>
            <ul className="space-y-2">
              {solutions.slice(0, 6).map((solution) => (
                <li key={solution.id}>
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {solution.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/solutions"
                  className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Industries</h4>
            <ul className="space-y-2">
              {industries.slice(0, 6).map((industry) => (
                <li key={industry.id}>
                  <div
                    // to={`/industries/${industry.slug}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {industry.title}
                  </div>
                </li>
              ))}
              {/* <li>
                <Link
                  to="/industries"
                  className="text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                >
                  View All →
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  target="_blank" 
                  rel="noopener noreferrer"
                  to="https://tandemltd.sg.larksuite.com/scheduler/c9ee5e2b00c8013c"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    Schedule Consultation
              </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Tandem Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <div className="flex items-center gap-4">
                <a
                  href="https://ke.linkedin.com/company/tandem-technologies-kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
