import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// --- TYPES & DATA ---
type CountryInfo = {
  name: string;
  flag: string;
  hq: boolean;
  desc: string;
  sectors: string[];
};

const COUNTRIES: Record<string, CountryInfo> = {
  KE: {
    name: "Kenya",
    flag: "🇰🇪",
    hq: true,
    desc: "Our headquarters and home market. Nairobi is our operational hub serving clients across East, Central and Africa.",
    sectors: ["Banking & Finance", "Automotive Aftermarket", "Manufacturing", "Healthcare", "Hospitality", "NGOs"],
  },
  UG: {
    name: "Uganda",
    flag: "🇺🇬",
    hq: false,
    desc: "From the bustling streets of Kampala to the transit corridors of the north, we provide high-performance automotive parts and expert maintenance services that power Uganda's transport and logistics backbone.",
    sectors: ["Automotive Aftermarket"],
  },
  TZ: {
    name: "Tanzania",
    flag: "🇹🇿",
    hq: false,
    desc: "Supporting clients in the automotive aftermarket sector from the African great lakes to Dar es Salaam and other key regional centres.",
    sectors: ["Automotive Aftermarket"],
  },
  CD: {
    name: "DR Congo",
    flag: "🇨🇩",
    hq: false,
    desc: "Supporting mining, energy, and enterprise organisations operating in complex, high-stakes environments.",
    sectors: ["Banking & Finance"],
  },
  ZM: {
    name: "Zambia",
    flag: "🇿🇲",
    hq: false,
    desc: "Providing specialized managed services for automotive branches.",
    sectors: ["Automotive Aftermarket"],
  },
  RW: {
    name: "Rwanda",
    flag: "🇷🇼",
    hq: false,
    desc: "Delivering precision-focused automotive aftermarket solutions in Kigali and beyond, helping our clients navigate the unique demands of Rwanda's terrain",
    sectors: ["Automotive Aftermarket"],
  },
  AO: {
    name: "Angola",
    flag: "🇦🇴",
    hq: false,
    desc: "Supporting energy and infrastructure organisations in Angola's fast-growing digital economy.",
    sectors: ["Energy & Utilities"],
  },
  GH: {
    name: "Ghana",
    flag: "🇬🇭",
    hq: false,
    desc: "Active in financial services across Accra one of West Africa's most dynamic digital markets.",
    sectors: ["Banking & Finance"],
  },
};

// const MAP_MAPPING: Record<number, string> = { 404: 'KE', 800: 'UG', 834: 'TZ', 180: 'CD', 894: 'ZM', 24: 'AO', 288: 'GH' };

// Use strings for keys to handle leading zeros correctly
const MAP_MAPPING: Record<string, string> = {
  "404": "KE",
  "800": "UG",
  "834": "TZ",
  "180": "CD",
  "894": "ZM",
  "024": "AO", // Added the leading zero
  "24": "AO", // Added as a fallback
  "288": "GH",
  "646": "RW",
};

const RegionsSection = () => {
  const [selectedIso, setSelectedIso] = useState("KE");
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear previous SVG if any (prevents duplicates during hot reloads)
    d3.select(mapRef.current).select("svg").remove();

    const W = 420;
    const H = 500;

    const svg = d3
      .select(mapRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("class", "w-full h-auto");

    const projection = d3
      .geoMercator()
      .center([25, 0])
      .scale(340)
      .translate([W / 2, H / 2]);

    const pathFn = d3.geoPath().projection(projection);

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((world) => {
        // @ts-ignore
        const features = topojson.feature(world, world.objects.countries).features;

        svg
          .selectAll("path")
          .data(features)
          .join("path")
          // @ts-ignore
          .attr("d", pathFn)
          .attr("fill", (d: any) => (MAP_MAPPING[d.id] ? "rgba(0,194,203,0.3)" : "rgba(255,255,255,0.04)"))
          .attr("stroke", (d: any) => (MAP_MAPPING[d.id] ? "rgba(0,194,203,0.75)" : "rgba(255,255,255,0.08)"))
          .attr("stroke-width", (d: any) => (MAP_MAPPING[d.id] ? 1 : 0.4))
          .style("cursor", (d: any) => (MAP_MAPPING[d.id] ? "pointer" : "default"))
          .on("mouseenter", function (event, d: any) {
            // check which country will hover
            console.log("Country ID hovered:", d.id);
            const iso = MAP_MAPPING[d.id];
            if (!iso) return;
            d3.select(this).attr("fill", "rgba(0,194,203,0.6)");
            if (tooltipRef.current) {
              tooltipRef.current.textContent = `${COUNTRIES[iso].flag} ${COUNTRIES[iso].name} ${COUNTRIES[iso].hq ? "· HQ" : ""}`;
              tooltipRef.current.style.opacity = "1";
            }
          })
          .on("mousemove", (event) => {
            if (tooltipRef.current && mapRef.current) {
              const bounds = mapRef.current.getBoundingClientRect();
              tooltipRef.current.style.left = `${event.clientX - bounds.left - tooltipRef.current.offsetWidth / 2}px`;
              tooltipRef.current.style.top = `${event.clientY - bounds.top - tooltipRef.current.offsetHeight - 14}px`;
            }
          })
          .on("mouseleave", function (event, d: any) {
            if (!MAP_MAPPING[d.id]) return;
            d3.select(this).attr("fill", "rgba(0,194,203,0.3)");
            if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
          })
          .on("click", (event, d: any) => {
            const iso = MAP_MAPPING[d.id];
            if (iso) setSelectedIso(iso);
          });

        // HQ Pulse Effect for Kenya
        const keFeature = features.find((f: any) => f.id === 404);
        if (keFeature) {
          const [kx, ky] = pathFn.centroid(keFeature);
          const g = svg.append("g").attr("transform", `translate(${kx},${ky})`);

          g.append("circle").attr("r", 5).attr("fill", "#00C2CB").attr("opacity", 0.95);
          const ring = g
            .append("circle")
            .attr("r", 5)
            .attr("fill", "none")
            .attr("stroke", "#00C2CB")
            .attr("stroke-width", 1.5);

          const pulse = () => {
            ring
              .attr("r", 5)
              .attr("opacity", 0.5)
              .transition()
              .duration(1800)
              .attr("r", 18)
              .attr("opacity", 0)
              .on("end", pulse);
          };
          pulse();
        }
      });
  }, []);

  const currentData = COUNTRIES[selectedIso];

  return (
    <section id="regions" className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Where We Operate</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">8 Countries. 1 Partner.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 italic">
            From Nairobi to Accra enterprise-grade capabilities delivered directly to your market.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* MAP SIDE */}
          <div className="relative bg-navy/20 rounded-3xl p-4 border border-white/5">
            <div ref={mapRef} className="w-full relative min-h-[400px]" />
            <div
              ref={tooltipRef}
              className="absolute pointer-events-none bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-xs border border-white/10 opacity-0 transition-opacity duration-200 z-50 whitespace-nowrap"
            />
            <p className="text-center text-[10px] text-white/20 uppercase tracking-[2px] mt-4">
              Hover or tap a highlighted country
            </p>
          </div>

          {/* DATA PANEL SIDE */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIso}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{currentData.flag}</span>
                  <div>
                    <h3 className="text-3xl font-bold">{currentData.name}</h3>
                    {currentData.hq && (
                      <span className="bg-[#00C2CB]/20 text-[#00C2CB] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[#00C2CB]/30">
                        Headquarter
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{currentData.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {currentData.sectors.map((s) => (
                    <span
                      key={s}
                      className="bg-white/5 px-3 py-1 rounded-full text-[11px] text-gray-400 border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CHIPS */}
            <div className="flex flex-wrap gap-3">
              {Object.entries(COUNTRIES).map(([iso, data]) => (
                <button
                  key={iso}
                  onClick={() => setSelectedIso(iso)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 border ${
                    selectedIso === iso
                      ? "bg-[#00C2CB] border-[#00C2CB] text-navy font-bold shadow-[0_0_20px_rgba(0,194,203,0.3)]"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  {data.flag} {data.name}
                  {data.hq && <span className="text-[9px] opacity-70 font-bold ml-1">HQ</span>}
                </button>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              {[
                { num: "8", label: "Countries" },
                { num: "8", label: "Industries" },
                { num: "9+", label: "Solution Areas" },
                { num: "2020", label: "Est." },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#00C2CB]">{stat.num}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
