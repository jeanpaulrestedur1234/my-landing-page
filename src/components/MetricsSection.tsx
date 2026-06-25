"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Flame, Users } from "lucide-react";

interface MetricsSectionProps {
  language: "es" | "en";
}

function AnimatedNumber({
  value,
  suffix = "",
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const end = value;
          const totalSteps = 40;
          const stepTime = duration / totalSteps;
          const stepValue = end / totalSteps;

          const timer = setInterval(() => {
            start += stepValue;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function MetricsSection({ language }: MetricsSectionProps) {
  const metrics = [
    {
      icon: Activity,
      value: 10,
      suffix: "x",
      titleEs: "Mejora en eficiencia",
      titleEn: "Efficiency improvement",
      descEs: "Optimizamos tus flujos de trabajo multiplicando el rendimiento por diez.",
      descEn: "We optimize your workflows, multiplying operational performance by ten.",
      glow: "from-blue-500/20 to-transparent",
    },
    {
      icon: Flame,
      value: 95,
      suffix: "%",
      titleEs: "Reducción de procesos manuales",
      titleEn: "Reduction in manual tasks",
      descEs: "Eliminamos tareas repetitivas mediante flujos de automatización inteligente.",
      descEn: "We eliminate repetitive tasks using intelligent automation workflows.",
      glow: "from-cyan-500/20 to-transparent",
    },
    {
      icon: ShieldCheck,
      value: 60,
      suffix: "%",
      titleEs: "Optimización de costos",
      titleEn: "Cost optimization",
      descEs: "Reducimos costos operativos mediante la consolidación y eficiencia digital.",
      descEn: "We lower operational costs through consolidation and digital efficiency.",
      glow: "from-indigo-500/20 to-transparent",
    },
    {
      icon: Users,
      value: 100,
      suffix: "%",
      titleEs: "Acompañamiento integral",
      titleEn: "Comprehensive support",
      descEs: "Estamos contigo en cada fase, desde el diagnóstico hasta el despliegue final.",
      descEn: "We stand by you in every phase, from diagnosis to final deployment.",
      glow: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <section id="nosotros" className="py-32 relative bg-brand-black/40 border-y border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 radial-glow-blue opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* Left panel: intro */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold tracking-wider text-bright-cyan uppercase">
                {language === "es" ? "Métricas de Impacto" : "Impact Metrics"}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight mt-4 mb-6 text-white leading-tight">
                {language === "es"
                  ? "Resultados que transforman negocios"
                  : "Results that transform businesses"}
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                {language === "es"
                  ? "Nuestras integraciones tecnológicas y desarrollos de IA no son solo innovación, son activos estratégicos que generan eficiencias medibles e inmediatas."
                  : "Our technology integrations and AI solutions are not just innovative; they are strategic assets that deliver measurable, immediate efficiencies."}
              </p>
              <div className="h-0.5 w-20 bg-gradient-to-r from-electric-blue to-bright-cyan" />
            </motion.div>
          </div>

          {/* Right panel: grid of 4 cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                >
                  {/* Subtle card specific glow */}
                  <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br ${metric.glow} blur-xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-bright-cyan">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 flex items-baseline">
                    <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-bright-cyan transition-colors">
                    {language === "es" ? metric.titleEs : metric.titleEn}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {language === "es" ? metric.descEs : metric.descEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
