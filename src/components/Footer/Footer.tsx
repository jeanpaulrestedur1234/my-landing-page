// ============================================
// Footer.tsx
// ============================================
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

