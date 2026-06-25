"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, Cpu } from "lucide-react";

interface NavbarProps {
  currentView: "landing" | "contact";
  onNavigate: (view: "landing" | "contact", sectionId?: string) => void;
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

export default function Navbar({ currentView, onNavigate, language, setLanguage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: language === "es" ? "Inicio" : "Home" },
    { id: "soluciones", label: language === "es" ? "Soluciones" : "Solutions" },
    { id: "nosotros", label: language === "es" ? "Quiénes Somos" : "About Us" },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate("landing", sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-brand-black/60 backdrop-blur-md border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => onNavigate("landing", "inicio")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-blue to-bright-cyan flex items-center justify-center shadow-lg shadow-electric-blue/20 transition-transform group-hover:scale-105">
            <Cpu className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white font-sans uppercase">
            Wally<span className="text-bright-cyan font-extrabold">.</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {currentView === "landing" &&
            navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer relative py-1"
              >
                {item.label}
              </button>
            ))}

          {currentView === "contact" && (
            <button
              onClick={() => onNavigate("landing")}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {language === "es" ? "Volver a Inicio" : "Back to Home"}
            </button>
          )}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg border border-white/10 hover:border-white/20 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-28 rounded-xl border border-white/10 bg-brand-graphite/95 backdrop-blur-md p-1.5 shadow-2xl z-20"
                  >
                    <button
                      onClick={() => {
                        setLanguage("es");
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg cursor-pointer transition-colors ${
                        language === "es"
                          ? "bg-electric-blue/20 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      Español (ES)
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg cursor-pointer transition-colors ${
                        language === "en"
                          ? "bg-electric-blue/20 text-white"
                          : "text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      English (EN)
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Hablemos */}
          <button
            onClick={() => onNavigate("contact")}
            className="glow-btn-primary px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
          >
            {language === "es" ? "Hablemos" : "Let's Talk"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          {/* Quick Language Toggle */}
          <button
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-xs font-medium text-zinc-400 border border-white/10 py-1 px-2 rounded-lg"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-brand-black/95 backdrop-blur-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {currentView === "landing" &&
                navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left text-lg font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}

              {currentView === "contact" && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate("landing");
                  }}
                  className="text-left text-lg font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {language === "es" ? "Volver a Inicio" : "Back to Home"}
                </button>
              )}

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate("contact");
                }}
                className="glow-btn-primary w-full py-3.5 rounded-xl text-base font-semibold text-center cursor-pointer"
              >
                {language === "es" ? "Hablemos" : "Let's Talk"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
