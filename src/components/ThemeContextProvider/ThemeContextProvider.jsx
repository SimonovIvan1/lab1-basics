// components/ThemeContextProvider/ThemeContextProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import './ThemeContextProvider.css';

// Создаем контекст
const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Основной компонент для отображения
function ThemeContextDemo() {
  const { theme, toggleTheme } = useTheme();
  const [userPreferences, setUserPreferences] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    animations: true
  });

  const themes = [
    { id: 'light', name: 'Светлая', icon: '☀️' },
    { id: 'dark', name: 'Темная', icon: '🌙' },
    { id: 'blue', name: 'Синяя', icon: '🔵' },
    { id: 'green', name: 'Зеленая', icon: '🟢' }
  ];

  const applyTheme = (newTheme) => {
    alert(`Тема "${newTheme}" применена! (демо)`);
  };

  return (
    <div className="theme-context-demo">
      <h3>🎨 ЛР11: Context API - Управление темой</h3>
      
      <div className="theme-display">
        <div className={`theme-preview ${theme}`}>
          <h4>Предпросмотр темы: {theme === 'light' ? 'Светлая' : 'Темная'}</h4>
          <div className="preview-content">
            <div className="preview-card">
              <h5>Карточка контента</h5>
              <p>Это пример карточки в текущей теме. Текст и фон меняются в зависимости от темы.</p>
              <button className="preview-btn">Кнопка</button>
            </div>
            <div className="preview-text">
              <p>Основной текст: Пользовательские предпочтения сохраняются глобально.</p>
              <p className="secondary">Второстепенный текст</p>
            </div>
          </div>
        </div>
        
        <div className="theme-controls">
          <h4>Управление темой:</h4>
          <button onClick={toggleTheme} className="btn-toggle-theme">
            {theme === 'light' ? '🌙 Переключить на темную' : '☀️ Переключить на светлую'}
          </button>
          
          <div className="available-themes">
            <p>Доступные темы:</p>
            <div className="theme-buttons">
              {themes.map(t => (
                <button
                  key={t.id}
                  className={`theme-btn ${t.id === theme ? 'active' : ''}`}
                  onClick={() => applyTheme(t.id)}
                >
                  <span className="theme-icon">{t.icon}</span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="user-preferences">
        <h4>Пользовательские настройки (сохраняются глобально):</h4>
        
        <div className="preference-item">
          <label>
            Размер шрифта:
            <select
              value={userPreferences.fontSize}
              onChange={(e) => setUserPreferences(prev => ({
                ...prev,
                fontSize: e.target.value
              }))}
              className="preference-select"
            >
              <option value="small">Маленький</option>
              <option value="medium">Средний</option>
              <option value="large">Большой</option>
            </select>
          </label>
        </div>

        <div className="preference-item">
          <label>
            Контрастность:
            <div className="contrast-buttons">
              {['low', 'normal', 'high'].map(level => (
                <button
                  key={level}
                  className={`contrast-btn ${userPreferences.contrast === level ? 'active' : ''}`}
                  onClick={() => setUserPreferences(prev => ({
                    ...prev,
                    contrast: level
                  }))}
                >
                  {level === 'low' ? 'Низкая' : 
                   level === 'normal' ? 'Нормальная' : 'Высокая'}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="preference-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={userPreferences.animations}
              onChange={(e) => setUserPreferences(prev => ({
                ...prev,
                animations: e.target.checked
              }))}
            />
            Анимации интерфейса
          </label>
        </div>
      </div>

      <div className="context-explanation">
        <h4>📚 Как работает Context API:</h4>
        <div className="explanation-grid">
          <div className="explanation-card">
            <h5>1. Создание контекста</h5>
            <code>const ThemeContext = createContext();</code>
          </div>
          <div className="explanation-card">
            <h5>2. Провайдер</h5>
            <p>Оборачивает приложение и предоставляет данные</p>
          </div>
          <div className="explanation-card">
            <h5>3. Потребитель</h5>
            <p>Любой компонент может использовать данные через useContext()</p>
          </div>
          <div className="explanation-card">
            <h5>4. Преимущества</h5>
            <p>Избегаем prop drilling. Глобальный доступ к данным.</p>
          </div>
        </div>
      </div>

      <div className="context-code">
        <h4>💻 Пример использования:</h4>
        <pre className="code-block">
{`// В корневом компоненте:
<ThemeProvider>
  <App />
</ThemeProvider>

// В любом дочернем компоненте:
const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={\`component \${theme}\`}>
      <button onClick={toggleTheme}>
        Переключить тему
      </button>
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
}

// Основной компонент, который мы экспортируем по умолчанию
// Он оборачивает ThemeContextDemo в ThemeProvider
function ThemeContextProvider() {
  return (
    <ThemeProvider>
      <ThemeContextDemo />
    </ThemeProvider>
  );
}

export default ThemeContextProvider;