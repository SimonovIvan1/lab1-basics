import React, { useState } from 'react';

function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Встроенные стили для кнопки
  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  // Динамические стили в зависимости от темы
  const themeStyles = {
    backgroundColor: isDarkMode ? '#4a5568' : '#667eea',
    color: isDarkMode ? '#e2e8f0' : 'white',
    boxShadow: isDarkMode 
      ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
      : '0 4px 6px rgba(102, 126, 234, 0.4)'
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px 0',
      borderRadius: '10px',
      backgroundColor: isDarkMode ? '#2d3748' : '#f7fafc',
      color: isDarkMode ? '#e2e8f0' : '#2d3748',
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ marginBottom: '15px' }}>
        {isDarkMode ? 'Темная тема активна' : 'Светлая тема активна'}
      </h3>
      
      <button 
        onClick={toggleTheme}
        style={{ ...buttonStyle, ...themeStyles }}
      >
        <span>{isDarkMode ? '☀️' : '🌙'}</span>
        {isDarkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      </button>
      
      {/* Пример условного рендеринга */}
      {isDarkMode ? (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#4a5568',
          borderRadius: '8px',
          color: '#e2e8f0'
        }}>
          <p><strong>Темная тема включена</strong></p>
          <p>Легче для глаз в ночное время</p>
        </div>
      ) : (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#edf2f7',
          borderRadius: '8px',
          color: '#2d3748'
        }}>
          <p><strong>Светлая тема включена</strong></p>
          <p>Лучшая читаемость при дневном свете</p>
        </div>
      )}
    </div>
  );
}

export default ToggleTheme;