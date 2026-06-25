"use client";

import { motion } from "framer-motion";
import { Zap, GitMerge, BarChart3, Compass, Code2, BrainCircuit } from "lucide-react";
import React from "react";

interface SolutionsSectionProps {
  language: "es" | "en";
}

export default function SolutionsSection({ language }: SolutionsSectionProps) {
  const solutions = [
    {
      icon: Zap,
      titleEs: "Optimización y Automatización de Procesos",
      titleEn: "Process Optimization & Automation",
      descEs: "Eliminamos cuellos de botella y automatizamos tareas repetitivas para multiplicar la productividad de tu equipo.",
      descEn: "We eliminate bottlenecks and automate repetitive tasks to multiply your team's productivity.",
      color: "from-blue-600 to-cyan-500",
      glow: "rgba(0, 242, 254, 0.15)",
    },
    {
      icon: GitMerge,
      titleEs: "Integración de Software y Sistemas",
      titleEn: "Software & Systems Integration",
      descEs: "Conectamos todas tus herramientas y bases de datos en un ecosistema digital unificado y sin fricciones.",
      descEn: "We connect all your tools and databases in a unified, friction-free digital ecosystem.",
      color: "from-indigo-600 to-blue-500",
      glow: "rgba(99, 102, 241, 0.15)",
    },
    {
      icon: BarChart3,
      titleEs: "Análisis de Datos e Inteligencia de Negocio",
      titleEn: "Data Analytics & Business Intelligence",
      descEs: "Transformamos datos en bruto en tableros interactivos e insights estratégicos para la toma de decisiones.",
      descEn: "We transform raw data into interactive dashboards and strategic insights for decision-making.",
      color: "from-cyan-600 to-blue-500",
      glow: "rgba(6, 182, 212, 0.15)",
    },
    {
      icon: Compass,
      titleEs: "Consultoría en Transformación Digital",
      titleEn: "Digital Transformation Consulting",
      descEs: "Diseñamos la hoja de ruta tecnológica ideal para modernizar tu modelo de negocio de manera rentable.",
      descEn: "We design the ideal technology roadmap to modernize your business model profitably.",
      color: "from-purple-600 to-indigo-500",
      glow: "rgba(168, 85, 247, 0.15)",
    },
    {
      icon: Code2,
      titleEs: "Desarrollo de Software a Medida",
      titleEn: "Custom Software Development",
      descEs: "Creamos plataformas web, móviles y empresariales robustas diseñadas específicamente para tus necesidades.",
      descEn: "We create robust web, mobile, and enterprise platforms designed specifically for your needs.",
      color: "from-blue-600 to-indigo-600",
      glow: "rgba(37, 99, 235, 0.15)",
    },
    {
      icon: BrainCircuit,
      titleEs: "Implementación y Capacitación en IA",
      titleEn: "AI Implementation & Training",
      descEs: "Integramos modelos de lenguaje y agentes de IA en tus procesos, capacitando a tu equipo para el futuro.",
      descEn: "We integrate language models and AI agents into your workflows, training your team for the future.",
      color: "from-cyan-500 to-purple-600",
      glow: "rgba(0, 242, 254, 0.2)",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Rotate coordinates (max 10 degrees)
    const rotateX = -(y - yc) / 10;
    const rotateY = (x - xc) / 10;
    
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${rotateX}deg`);
    el.style.setProperty("--ry", `${rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <section id="soluciones" className="py-32 relative cyber-grid">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 radial-glow-blue opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 radial-glow-cyan opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-wider text-bright-cyan uppercase border border-bright-cyan/20 px-3 py-1 rounded-full bg-bright-cyan/5">
              {language === "es" ? "Nuestras Soluciones" : "Our Solutions"}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4 text-white">
              {language === "es"
                ? "Capacidades tecnológicas a tu servicio"
                : "Technological capabilities at your service"}
            </h2>
            <p className="text-lg text-zinc-400">
              {language === "es"
                ? "Diseñamos, desarrollamos e implementamos herramientas digitales de vanguardia para impulsar el crecimiento empresarial."
                : "We design, develop, and deploy cutting-edge digital tools to accelerate business growth."}
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl p-[1px] bg-white/5 overflow-hidden transition-all duration-300 hover:bg-white/10"
                style={{
                  perspective: "1000px",
                }}
              >
                {/* 3D Tilt Wrapper */}
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="h-full rounded-2xl bg-brand-graphite/90 p-8 flex flex-col justify-between relative overflow-hidden transition-transform duration-300 ease-out border border-white/5"
                  style={{
                    transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Radial Spotlight Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at var(--mx, 0px) var(--my, 0px), ${sol.glow}, transparent 80%)`,
                    }}
                  />

                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr opacity-20 blur-sm" />
                      <Icon className="w-6 h-6 text-bright-cyan relative z-10" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white tracking-tight group-hover:text-bright-cyan transition-colors">
                      {language === "es" ? sol.titleEs : sol.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {language === "es" ? sol.descEs : sol.descEn}
                    </p>
                  </div>

                  {/* Read More / Action Indicator */}
                  <div className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-zinc-500 group-hover:text-white transition-colors mt-auto">
                    <span>{language === "es" ? "Saber más" : "Learn more"}</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
