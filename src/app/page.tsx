"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import ThreeBackground from "@/components/ThreeBackground";
import Marquee from "@/components/Marquee";
import SolutionsSection from "@/components/SolutionsSection";
import MetricsSection from "@/components/MetricsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [view, setView] = useState<"landing" | "contact">("landing");
  const [language, setLanguage] = useState<"es" | "en">("es");

  const handleNavigate = (targetView: "landing" | "contact", sectionId?: string) => {
    if (targetView === "landing") {
      setView("landing");
      if (sectionId) {
        // Wait for render, then scroll
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setView("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-white flex flex-col font-sans">
      {/* Three.js Interactive Background */}
      <ThreeBackground />

      {/* Navbar Header */}
      <Navbar
        currentView={view}
        onNavigate={handleNavigate}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-24 relative z-10">
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            /* ============================================================== */
            /* VISTA 1: LANDING PRINCIPAL                                     */
            /* ============================================================== */
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* HERO SECTION */}
              <section
                id="inicio"
                className="min-h-[85vh] flex items-center justify-center relative px-6 py-20"
              >
                {/* Ambient lights */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 radial-glow-blue opacity-40 pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center gap-2 border border-white/10 px-3.5 py-1.5 rounded-full bg-white/5 mb-8 backdrop-blur-md"
                  >
                    <div className="w-2 h-2 rounded-full bg-bright-cyan animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {language === "es"
                        ? "Transformación Digital Con IA"
                        : "Digital Transformation With AI"}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] max-w-4xl"
                  >
                    {language === "es" ? (
                      <>
                        Transformamos tu negocio con{" "}
                        <span className="glow-accent font-black">tecnología</span> e{" "}
                        <span className="glow-accent font-black">inteligencia artificial</span>
                      </>
                    ) : (
                      <>
                        Transforming your business through{" "}
                        <span className="glow-accent font-black">technology</span> &{" "}
                        <span className="glow-accent font-black">artificial intelligence</span>
                      </>
                    )}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-3xl mb-12 leading-relaxed"
                  >
                    {language === "es"
                      ? "Ayudamos a las empresas a optimizar procesos, analizar datos y escalar con soluciones de software e inteligencia artificial a la medida."
                      : "We assist organizations in workflow optimization, data analysis, and scaling with custom software & tailored artificial intelligence systems."}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                  >
                    <button
                      onClick={() => handleNavigate("contact")}
                      className="glow-btn-primary px-8 py-4 rounded-full text-base font-bold flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <span>
                        {language === "es" ? "Agendar sesión estratégica" : "Book Strategic Session"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleNavigate("landing", "soluciones")}
                      className="px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-base font-bold text-zinc-300 hover:text-white transition-all cursor-pointer w-full sm:w-auto text-center"
                    >
                      {language === "es" ? "Ver soluciones" : "Discover Solutions"}
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* PARTNERS LOGO MARQUEE */}
              <Marquee language={language} />

              {/* SOLUTIONS GRID */}
              <SolutionsSection language={language} />

              {/* METRICS SECTION */}
              <MetricsSection language={language} />

              {/* FINAL CTA */}
              <section className="py-32 relative overflow-hidden px-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 radial-glow-blue opacity-30 pointer-events-none" />

                <div className="max-w-4xl mx-auto glass-panel p-12 md:p-16 rounded-[2.5rem] border border-white/10 text-center relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-bright-cyan/5 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric-blue/5 blur-3xl rounded-full" />

                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                      {language === "es"
                        ? "Lleva tu empresa al siguiente nivel"
                        : "Take your business to the next level"}
                    </h2>
                    <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                      {language === "es"
                        ? "Agenda una sesión estratégica y descubre cómo la transformación digital y la IA pueden potenciar tu negocio."
                        : "Schedule a strategic assessment call and discover how digital transformation and artificial intelligence can optimize your organization."}
                    </p>
                    <button
                      onClick={() => handleNavigate("contact")}
                      className="glow-btn-primary px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>{language === "es" ? "Hablemos" : "Let's Talk"}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : (
            /* ============================================================== */
            /* VISTA 2: CONTACTO ESTRATÉGICO                                  */
            /* ============================================================== */
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -35 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-6 py-16"
            >
              {/* Header */}
              <div className="max-w-3xl mb-16">
                <span className="text-sm font-semibold tracking-wider text-bright-cyan uppercase border border-bright-cyan/20 px-3 py-1 rounded-full bg-bright-cyan/5">
                  {language === "es" ? "Área Estratégica" : "Strategic Office"}
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6 mb-4 text-white">
                  {language === "es"
                    ? "Diseñemos tu próximo salto tecnológico"
                    : "Let's design your next technological leap"}
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {language === "es"
                    ? "Reserva una sesión estratégica gratuita de 30 minutos con nuestros ingenieros y arquitectos de soluciones de software e IA."
                    : "Book a complimentary 30-minute strategic session with our lead software engineers and AI solution architects."}
                </p>
              </div>

              {/* Contact Panel Grid */}
              <ContactForm language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-brand-black py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-bright-cyan" />
            <span className="text-sm font-bold tracking-wider text-white uppercase">
              Wally<span className="text-bright-cyan">.</span>
            </span>
          </div>
          <p className="text-xs text-zinc-500 text-center md:text-right">
            © {new Date().getFullYear()} Wally.{" "}
            {language === "es"
              ? "Todos los derechos reservados. Tecnología e Inteligencia Artificial a Medida."
              : "All rights reserved. Custom Software & AI Systems."}
          </p>
        </div>
      </footer>
    </div>
  );
}
