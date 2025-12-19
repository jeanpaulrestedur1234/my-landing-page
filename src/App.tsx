import { Header } from './components/Header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';
import { TrustedBy } from './components/TrustedBy/TrustedBy';
import { Services } from './components/Services/Services';
import { WhyChooseUs } from './components/WhyChooseUs/WhyChooseUs';
import { CTASection } from './components/CTASection/CTASection';
import { Footer } from './components/Footer/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <div id="hero">
        <HeroSection />
      </div>

      <ScrollReveal direction="up">
        <TrustedBy />
      </ScrollReveal>

      <ScrollReveal direction="left" id="services">
        <Services />
      </ScrollReveal>

      <ScrollReveal direction="right" id="why-choose-us">
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal direction="up" id="cta">
        <CTASection />
      </ScrollReveal>

      <Footer />
    </div>
  );
}