import { HeroSection } from '../../components/HeroSection/HeroSection';
import { TrustedBy } from '../../components/TrustedBy/TrustedBy';
import { Services } from '../../components/Services/Services';
import { WhyChooseUs } from '../../components/WhyChooseUs/WhyChooseUs';
import { CTASection } from '../../components/CTASection/CTASection';
import { ScrollReveal } from '../../components/ScrollReveal';

export const Home = () => {
    return (
        <>
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
        </>
    );
};
