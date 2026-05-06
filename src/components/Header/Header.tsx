import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const handleHashLink = (hash: string) => {
    if (location.pathname !== '/') {
      // If not on home page, use normal Link to home with hash
      return;
    }
    // If on home, smooth scroll
    const element = document.getElementById(hash.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash scroll after navigation from another page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
          <div className="logo-icon">
            <span>{t('header.logo')}</span>
          </div>
          <span className="logo-text">{t('header.name')}</span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="nav-desktop">
          <Link
            to="/#hero"
            className="nav-link"
            onClick={() => handleHashLink('#hero')}
          >
            {t('header.nav.home')}
          </Link>
          <Link
            to="/#services"
            className="nav-link"
            onClick={() => handleHashLink('#services')}
          >
            {t('header.nav.services')}
          </Link>
          <Link
            to="/#why-choose-us"
            className="nav-link"
            onClick={() => handleHashLink('#why-choose-us')}
          >
            {t('header.nav.about')}
          </Link>
        </nav>

        {/* CTA Button & Lang Switcher */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/contact">
            <button className="cta-button">
              {t('header.cta')}
            </button>
          </Link>
          <button onClick={toggleLanguage} className="lang-button">
            {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};

