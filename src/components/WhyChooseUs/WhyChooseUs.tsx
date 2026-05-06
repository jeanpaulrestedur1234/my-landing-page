// ============================================
// WhyChooseUs.tsx
// ============================================
import { useTranslation } from 'react-i18next';

export const WhyChooseUs = () => {
  const { t } = useTranslation();

  const stats = [
    { number: t('whyChooseUs.stats.efficiency.number'), text: t('whyChooseUs.stats.efficiency.text') },
    { number: t('whyChooseUs.stats.errors.number'), text: t('whyChooseUs.stats.errors.text') },
    { number: t('whyChooseUs.stats.costs.number'), text: t('whyChooseUs.stats.costs.text') },
    { number: t('whyChooseUs.stats.support.number'), text: t('whyChooseUs.stats.support.text') },
  ];

  return (
    <section className="choose-us-section">
      <div className="choose-us-container">
        <div className="choose-us-header">
          <h2 className="choose-us-title">{t('whyChooseUs.title')}</h2>
          <p className="choose-us-subtitle">{t('whyChooseUs.subtitle')}</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-number">
                {stat.number}
              </div>
              <p className="stat-card-text">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

