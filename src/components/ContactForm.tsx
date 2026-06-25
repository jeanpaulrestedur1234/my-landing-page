"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, ChevronRight, Send, User, Building, Briefcase, Mail, Phone, MessageSquare } from "lucide-react";

interface ContactFormProps {
  language: "es" | "en";
}

// Internal holographic canvas drawing (glowing orbital rings)
function MiniHologram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 200;
      canvas.height = 180;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(cx, cy) - 20;

      angle += 0.015;

      // Draw outer fading glow ring
      ctx.strokeStyle = "rgba(0, 242, 254, 0.1)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, r + Math.sin(angle * 2) * 5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw orbit 1 (cyan)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(0, 242, 254, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r / 3, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Node on orbit 1
      ctx.fillStyle = "#00f2fe";
      ctx.shadowColor = "#00f2fe";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(r, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw orbit 2 (blue)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 1.5 + Math.PI / 4);
      ctx.strokeStyle = "rgba(0, 102, 255, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r / 4, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Node on orbit 2
      ctx.fillStyle = "#0066ff";
      ctx.shadowColor = "#0066ff";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(-r, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw center core
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00f2fe";
      const coreRadius = 8 + Math.abs(Math.sin(angle * 3)) * 4;
      
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(0, 242, 254, 0.8)");
      gradient.addColorStop(0.8, "rgba(0, 102, 255, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Clean shadow values
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export default function ContactForm({ language }: ContactFormProps) {
  // Form State
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    cargo: "",
    correo: "",
    telefono: "",
    necesidad: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calendar State
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mocks
  const daysInMonth = Array.from({ length: 14 }, (_, i) => i + 12); // Mock business days (e.g. 12th to 25th)
  const timeSlots = ["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"];

  const benefits = [
    {
      titleEs: "Diagnóstico técnico gratuito",
      titleEn: "Free technical diagnosis",
      descEs: "Evaluamos tus procesos actuales sin costo para identificar cuellos de botella.",
      descEn: "We evaluate your current processes at no cost to identify bottlenecks."
    },
    {
      titleEs: "Consultores de nivel senior",
      titleEn: "Senior level consultants",
      descEs: "Sesión directa con arquitectos de software y líderes en inteligencia artificial.",
      descEn: "Direct session with software architects and AI leaders."
    },
    {
      titleEs: "Propuesta de hoja de ruta",
      titleEn: "Roadmap proposal",
      descEs: "Saldrás de la llamada con un plan de acción concreto de transformación digital.",
      descEn: "You will leave the call with a concrete action plan for digital transformation."
    }
  ];

  const timelineSteps = [
    {
      step: "01",
      titleEs: "Sesión de Descubrimiento",
      titleEn: "Discovery Session",
      descEs: "Analizamos en detalle los desafíos y metas de tu empresa.",
      descEn: "We detail your company's core challenges and goals."
    },
    {
      step: "02",
      titleEs: "Diagnóstico y Diseño",
      titleEn: "Diagnosis & Design",
      descEs: "Diseñamos una propuesta tecnológica a medida con costos y tiempos.",
      descEn: "We design a custom technical proposal with costs and timeline."
    },
    {
      step: "03",
      titleEs: "Desarrollo e Integración",
      titleEn: "Development & Integration",
      descEs: "Implementamos las herramientas y modelos de IA bajo metodología ágil.",
      descEn: "We implement the software & AI models using agile methodology."
    },
    {
      step: "04",
      titleEs: "Despliegue y Capacitación",
      titleEn: "Deployment & Training",
      descEs: "Lanzamiento a producción con entrenamiento intensivo a tu equipo.",
      descEn: "Production launch combined with intensive team training."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.necesidad) {
      alert(language === "es" ? "Por favor completa los campos requeridos." : "Please fill in the required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* LEFT COLUMN: Premium Form */}
      <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-electric-blue/10 blur-3xl rounded-full" />
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                {language === "es" ? "Solicitar Diagnóstico Estratégico" : "Request Strategic Assessment"}
              </h2>
              <p className="text-zinc-400 text-sm mb-8">
                {language === "es"
                  ? "Cuéntanos sobre tu negocio y un arquitecto senior se pondrá en contacto contigo."
                  : "Tell us about your business and a senior architect will get in touch with you."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                      {language === "es" ? "Nombre Completo *" : "Full Name *"}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                      {language === "es" ? "Empresa" : "Company"}
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                      {language === "es" ? "Cargo / Posición" : "Job Title / Position"}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                      <input
                        type="text"
                        value={formData.cargo}
                        onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                        placeholder="CTO / Director"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                      {language === "es" ? "Correo Corporativo *" : "Work Email *"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                        placeholder="jdoe@acme.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                    {language === "es" ? "Teléfono de Contacto" : "Phone Number"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                {/* Need Description */}
                <div className="relative">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">
                    {language === "es"
                      ? "¿Cuál es tu necesidad principal de tecnología o IA? *"
                      : "What is your main technology or AI need? *"}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <textarea
                      required
                      rows={4}
                      value={formData.necesidad}
                      onChange={(e) => setFormData({ ...formData, necesidad: e.target.value })}
                      className="w-full bg-brand-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-bright-cyan transition-colors text-sm"
                      placeholder={
                        language === "es"
                          ? "Ej: Queremos automatizar la atención al cliente con agentes IA o integrar nuestro ERP..."
                          : "E.g. We want to automate customer support with AI agents or integrate our ERP..."
                      }
                    />
                  </div>
                </div>

                {/* Date & Time chosen notice (if picked) */}
                {(selectedDate || selectedTime) && (
                  <div className="p-4 rounded-xl bg-bright-cyan/5 border border-bright-cyan/20 text-xs flex items-center gap-3 text-zinc-300">
                    <Calendar className="w-4.5 h-4.5 text-bright-cyan flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">
                        {language === "es" ? "Fecha sugerida:" : "Suggested date:"}
                      </span>{" "}
                      {selectedDate ? `${selectedDate} de Octubre` : ""}
                      {selectedTime ? ` a las ${selectedTime}` : ""}
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="glow-btn-primary w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>{language === "es" ? "Agendar Diagnóstico Gratuito" : "Schedule Free Assessment"}</span>
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-bright-cyan/10 border border-bright-cyan/20 flex items-center justify-center mb-6 text-bright-cyan shadow-lg shadow-bright-cyan/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {language === "es" ? "¡Solicitud Recibida!" : "Request Received!"}
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                {language === "es"
                  ? `Gracias ${formData.nombre}. Hemos reservado tu solicitud de diagnóstico. Uno de nuestros ingenieros senior te contactará en menos de 24 horas laborables.`
                  : `Thank you ${formData.nombre}. We have reserved your assessment request. One of our senior engineers will contact you in less than 24 business hours.`}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ nombre: "", empresa: "", cargo: "", correo: "", telefono: "", necesidad: "" });
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {language === "es" ? "Enviar otro formulario" : "Send another request"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN: Hologram, timeline, benefits, calendar */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        {/* Visual 3D Orbit Hologram */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-bright-cyan/5 blur-2xl rounded-full" />
          <MiniHologram />
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-4">
            {language === "es" ? "NODO DE IA — CONEXIÓN ACTIVA" : "AI NODE — CONNECTION ACTIVE"}
          </span>
        </div>

        {/* Dynamic tabs for scheduling, timeline, benefits */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <h3 className="text-sm font-semibold tracking-wider text-bright-cyan uppercase mb-6 flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5" />
            <span>{language === "es" ? "Paso 1: Selecciona Fecha (Opcional)" : "Step 1: Pick a Date (Optional)"}</span>
          </h3>

          {/* Calendar picker */}
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-zinc-500 uppercase mb-3">
              <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
            </div>
            <div className="grid grid-cols-7 gap-2 custom-calendar">
              {daysInMonth.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`py-2 text-xs font-semibold rounded-lg ${
                    selectedDate === day
                      ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/30"
                      : "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-white/5 pt-6"
            >
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{language === "es" ? "Horas Disponibles (CET)" : "Available Hours (CET)"}</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 text-xs font-medium rounded-lg border ${
                      selectedTime === time
                        ? "bg-bright-cyan/20 border-bright-cyan text-bright-cyan"
                        : "bg-transparent border-white/10 hover:border-white/20 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Timeline del Proceso */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <h3 className="text-sm font-semibold tracking-wider text-bright-cyan uppercase mb-6">
            {language === "es" ? "Nuestra Metodología" : "Our Methodology"}
          </h3>
          <div className="space-y-6">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="text-xs font-mono font-bold text-bright-cyan border border-bright-cyan/35 px-2 py-0.5 rounded bg-bright-cyan/5 mt-0.5">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {language === "es" ? step.titleEs : step.titleEn}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {language === "es" ? step.descEs : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios Destacados */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10">
          <h3 className="text-sm font-semibold tracking-wider text-bright-cyan uppercase mb-6">
            {language === "es" ? "Beneficios Destacados" : "Key Benefits"}
          </h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-bright-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {language === "es" ? benefit.titleEs : benefit.titleEn}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {language === "es" ? benefit.descEs : benefit.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
