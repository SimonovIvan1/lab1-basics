import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '👨‍💻' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Telegram', url: 'https://telegram.org', icon: '📱' },
    { name: 'Email', url: 'mailto:example@email.com', icon: '✉️' }
  ];

  const quickLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'О проекте', href: '#about' },
    { name: 'Команда', href: '#team' },
    { name: 'Контакты', href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">React Лаборатория</h3>
          <p className="footer-description">
            Учебный проект для изучения React, компонентов и их стилизации.
            Идеально подходит для начинающих разработчиков.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Быстрые ссылки</h4>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="footer-link">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Социальные сети</h4>
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} React Лаборатория. Все права защищены.
        </div>
        <div className="footer-info">
          <span>Версия 1.0.0</span>
          <span className="separator">•</span>
          <span>Учебный проект</span>
          <span className="separator">•</span>
          <span>Создано с ❤️ и React</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
