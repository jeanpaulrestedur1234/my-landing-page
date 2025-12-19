import { useTranslation } from 'react-i18next';
import './Header.css';

export const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo-icon">
            <span>{t('header.logo')}</span>
          </div>
          <span className="logo-text">{t('header.name')}</span>
        </div>

        {/* Navigation Desktop */}
        <nav className="nav-desktop">
          <a href="#hero" className="nav-link">{t('header.nav.home')}</a>
          <a href="#services" className="nav-link">{t('header.nav.services')}</a>
          <a href="#why-choose-us" className="nav-link">{t('header.nav.about')}</a>
          <a href="#" className="nav-link">{t('header.nav.blog')}</a>
        </nav>

        {/* CTA Button & Lang Switcher */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="cta-button">
            {t('header.cta')}
          </button>
          <button onClick={toggleLanguage} className="lang-button">
            {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};

