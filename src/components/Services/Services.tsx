import { useTranslation } from 'react-i18next';
import { Bot, Zap, Target, Rocket, Users, BarChart3 } from 'lucide-react';

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Bot,
      title: t('services.items.automation.title'),
      description: t('services.items.automation.desc')
    },
    {
      icon: Zap,
      title: t('services.items.integration.title'),
      description: t('services.items.integration.desc')
    },
    {
      icon: BarChart3,
      title: t('services.items.analytics.title'),
      description: t('services.items.analytics.desc')
    },
    {
      icon: Target,
      title: t('services.items.consulting.title'),
      description: t('services.items.consulting.desc')
    },
    {
      icon: Rocket,
      title: t('services.items.development.title'),
      description: t('services.items.development.desc')
    },
    {
      icon: Users,
      title: t('services.items.training.title'),
      description: t('services.items.training.desc')
    },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">{t('services.title')}</h2>
          <p className="services-subtitle">{t('services.subtitle')}</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card"
            >
              <div className="service-icon-wrapper">
                <service.icon className="service-icon" />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
