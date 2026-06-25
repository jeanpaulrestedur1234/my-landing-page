"use client";

interface MarqueeProps {
  language: "es" | "en";
}

export default function Marquee({ language }: MarqueeProps) {
  const partners = [
    "TechCorp",
    "InnovateLab",
    "DataFlow",
    "CloudSync",
    "NextGen",
    "SmartOps",
    "DigiPro",
    "AutomateX",
  ];

  // Double the list to create a seamless infinite loop
  const doublePartners = [...partners, ...partners];

  return (
    <section className="py-12 border-y border-white/5 bg-brand-black/40 relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {language === "es"
            ? "Empresas que confían en nuestra tecnología"
            : "Organizations trusting our technology"}
        </p>
      </div>

      {/* Marquee track */}
      <div className="flex w-full overflow-hidden select-none">
        <div className="flex gap-16 min-w-full shrink-0 animate-marquee items-center justify-around">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="text-lg md:text-xl font-bold text-zinc-600 hover:text-zinc-300 transition-colors tracking-wider whitespace-nowrap cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
        {/* Mirror copy for seamless loop */}
        <div className="flex gap-16 min-w-full shrink-0 animate-marquee items-center justify-around" aria-hidden="true">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner}-dup-${index}`}
              className="text-lg md:text-xl font-bold text-zinc-600 hover:text-zinc-300 transition-colors tracking-wider whitespace-nowrap cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
