// ============================================
// CTASection.tsx
// ============================================
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">
          {t('ctaSection.title')}
        </h2>
        <p className="cta-description">
          {t('ctaSection.description')}
        </p>
        <Link to="/contact">
          <button className="cta-action-button">
            {t('ctaSection.button')}
          </button>
        </Link>
      </div>
    </section>
  );
};

