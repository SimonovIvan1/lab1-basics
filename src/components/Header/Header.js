import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.navLink}>Главная</a>
        <a href="#about" className={styles.navLink}>О нас</a>
        <a href="#services" className={styles.navLink}>Услуги</a>
        <a href="#portfolio" className={styles.navLink}>Портфолио</a>
        <a href="#contact" className={styles.navLink}>Контакты</a>
      </nav>
      <h1 className={styles.title}>Добро пожаловать на мой сайт</h1>
      <p className={styles.subtitle}>Изучаем React: компоненты и стили</p>
    </header>
  );
}

export default Header;
