// ============================================
// HeroSection.tsx
// ============================================
import { useTranslation } from 'react-i18next';
import { HeroIllustration } from './HeroIllustration';
import './HeroSection.css';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.title.main')}{' '}
            <span className="highlight-text">
              {t('hero.title.highlight')}
            </span>
          </h1>

          <p className="hero-description">
            {t('hero.description')}
          </p>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number-wrapper">
                <div className="stat-number">10</div>
                <div className="stat-x">x</div>
              </div>
              <div className="stat-label">
                {t('hero.stats.growth')}
              </div>
            </div>

            {/* Mini Bar Chart */}
            <div className="chart-container">
              {[
                { height: 'bar-h-7', label: 'JUN' },
                { height: 'bar-h-11', label: 'JUL' },
                { height: 'bar-h-14', label: 'AUG' },
                { height: 'bar-h-20', label: 'SEP' }
              ].map((bar, i) => (
                <div key={i} className="chart-bar-wrapper">
                  <div className={`chart-bar ${bar.height}`}></div>
                  <span className="chart-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
        <div className="hero-illustration-wrapper">
          <HeroIllustration />
        </div>
      </div>


    </section>
  );
};
