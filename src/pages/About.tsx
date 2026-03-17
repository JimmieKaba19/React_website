import { Link } from "react-router-dom";
import { Shield, Target, Eye, Award, Users, Globe, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { stats } from "@/data/company";
import teamImage from "@/assets/team-collaboration.jpg";
import consultationImage from "@/assets/consultation-meeting.jpg";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty in all our client relationships and security recommendations.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest standards in every solution we deliver, continuously improving our expertise and methodologies.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside our clients as trusted advisors, understanding their unique challenges and goals.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "We stay ahead of emerging threats by embracing cutting-edge technologies and forward-thinking approaches.",
  },
];

const milestones = [
  { year: "2020", event: "Founded in Nairobi with a vision for African cybersecurity" },
  { year: "2021", event: "Expanded partnerships with global technology vendors" },
  { year: "2022", event: "Launched IT Security practice for clients" },
  { year: "2023", event: "Expanded operations across East Africa" },
  { year: "2024", event: "Launched OT Security practice for industrial clients" },
  { year: "2025", event: "Serving 15+ enterprise clients" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-navy to-primary-dark pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/stock/cybersecurity-hero.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-navy/90 to-primary-dark/95" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-accent font-medium mb-4 block">About Us</span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Securing Africa's Digital Future
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Tandem Technologies is a cybersecurity firm dedicated to protecting organizations across Africa with
              world-class security solutions and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-muted rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower African organizations with comprehensive cybersecurity solutions that protect their
                operations, secure their identities, and govern their data enabling them to thrive in the digital age
                with confidence.
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be Africa's most trusted cybersecurity partner, recognized for our expertise, innovation, and
                unwavering commitment to protecting organizations from evolving digital threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Founded in Nairobi in 2020, Tandem Technologies emerged from a vision to bridge the cybersecurity gap
                facing African enterprises. Our founder, seasoned security professionals with decades of combined
                experience, recognized that organizations across the continent needed access to world-class security
                solutions tailored to local challenges.
              </p>
              <p className="mt-4">
                Today, we've grown into a leading cybersecurity firm serving over 15 enterprise clients across FSI,
                manufacturing, energy, healthcare, and Service sectors. Our team of certified security experts combines
                global best practices with deep understanding of the African business landscape.
              </p>
              <p className="mt-4">
                We partner with industry-leading technology vendors to deliver comprehensive security solutions from
                operational technology protection to identity governance, from endpoint security to data privacy
                compliance. Our mission remains unchanged: to secure operations, protect identities, and govern data for
                organizations building Africa's digital future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
<<<<<<< HEAD
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Our Journey
          </h2>
=======
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
>>>>>>> adcaaaa4402426e8dc018147b22a738c4b23e774
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform md:-translate-x-1/2" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-6 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                    <div className="bg-background rounded-xl p-6 border border-border shadow-sm">
                      <span className="text-accent font-bold text-lg">{milestone.year}</span>
                      <p className="text-foreground mt-2">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-muted rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Tandem Technologies?</h2>
              <ul className="space-y-4">
                {[
                  "Certified security experts with global experience",
                  "Deep understanding of African business landscape",
                  "Partnerships with world-leading technology vendors",
                  "Comprehensive solutions across all security domains",
                  "24/7 support and managed security services",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green flex-shrink-0 mt-0.5" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={consultationImage}
                alt="Tandem Technologies team in consultation"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                <div className="text-center w-full">
                  <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-foreground mb-2">Certified Security Experts</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Meeting international standards for information security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      {/* <section className="py-0">
        <div className="relative h-80 overflow-hidden">
          <img 
            src={teamImage} 
            alt="Tandem Technologies team collaborating" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary-foreground mb-2">Our Expert Team</h3>
              <p className="text-primary-foreground/80">Dedicated to securing Africa's digital future</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-primary mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help secure your organization's digital future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-accent/90 text-accent-foreground">
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className=" bg-green-600 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/solutions">Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
