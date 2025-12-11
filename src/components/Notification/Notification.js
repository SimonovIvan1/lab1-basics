import React, { useState } from 'react';
import styles from './Notification.module.css';

function Notification({ type = 'info', message, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Автоматическое закрытие
  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);

  // Встроенные стили в зависимости от типа
  const getInlineStyles = () => {
    const baseStyle = {
      padding: '15px 20px',
      borderRadius: '8px',
      margin: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    };

    switch(type) {
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#c6f6d5',
          borderLeft: '4px solid #38a169',
          color: '#22543d'
        };
      case 'error':
        return {
          ...baseStyle,
          backgroundColor: '#fed7d7',
          borderLeft: '4px solid #e53e3e',
          color: '#742a2a'
        };
      case 'warning':
        return {
          ...baseStyle,
          backgroundColor: '#feebc8',
          borderLeft: '4px solid #dd6b20',
          color: '#744210'
        };
      case 'info':
      default:
        return {
          ...baseStyle,
          backgroundColor: '#bee3f8',
          borderLeft: '4px solid #3182ce',
          color: '#2a4365'
        };
    }
  };

  if (!isVisible) return null;

  return (
    <div style={getInlineStyles()} className={styles.notification}>
      <div className={styles.content}>
        <span className={styles.icon}>
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className={styles.text}>{message}</span>
      </div>
      <button 
        onClick={handleClose}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: 'inherit',
          padding: '0',
          marginLeft: '10px'
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Notification;