import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export const Contact = () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        phone: '', // Aquí se guardará el número completo (ej: +11234567890)
        details: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // El formData.phone ya incluye el prefijo internacional gracias a la librería
        console.log('Form submitted:', formData);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert(t('contact.success'));
        setIsSubmitting(false);
        setFormData({ email: '', phone: '', details: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Función específica para actualizar el teléfono
    const handlePhoneChange = (phone: string) => {
        setFormData(prev => ({ ...prev, phone }));
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1>{t('contact.title')}</h1>
                <p>{t('contact.subtitle')}</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="email">{t('contact.form.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t('contact.form.emailPlaceholder')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">{t('contact.form.phone')}</label>
                        <PhoneInput
                            defaultCountry="co"
                            value={formData.phone}
                            onChange={(phone) => handlePhoneChange(phone)}
                            inputClassName="phone-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="details">{t('contact.form.details')}</label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder={t('contact.form.detailsPlaceholder')}
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                    </button>
                </form>
            </div>
        </div>
    );
};