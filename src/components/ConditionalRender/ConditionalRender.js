import React, { useState } from 'react';

function ConditionalRender() {
  const [userRole, setUserRole] = useState('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const roles = ['guest', 'user', 'editor', 'admin'];

  // Функции для условного рендеринга
  const renderContent = () => {
    // 1. Условный оператор if
    if (userRole === 'guest') {
      return (
        <div style={cardStyle('#f7fafc', '#4a5568')}>
          <h4>Вы вошли как гость</h4>
          <p>Пожалуйста, войдите для получения полного доступа</p>
        </div>
      );
    }

    // 2. Логический оператор &&
    return (
      <div>
        {userRole === 'admin' && (
          <div style={cardStyle('#fed7d7', '#742a2a')}>
            <h4>Администратор</h4>
            <p>У вас есть доступ ко всем функциям</p>
            <button style={buttonStyle('#e53e3e', 'white')}>
              Управление пользователями
            </button>
          </div>
        )}
        
        {userRole === 'editor' && (
          <div style={cardStyle('#feebc8', '#744210')}>
            <h4>Редактор</h4>
            <p>Вы можете редактировать контент</p>
            <button style={buttonStyle('#dd6b20', 'white')}>
              Редактировать статьи
            </button>
          </div>
        )}
        
        {userRole === 'user' && (
          <div style={cardStyle('#c6f6d5', '#22543d')}>
            <h4>Пользователь</h4>
            <p>Добро пожаловать! У вас есть базовый доступ</p>
            <button style={buttonStyle('#38a169', 'white')}>
              Мой профиль
            </button>
          </div>
        )}
      </div>
    );
  };

  // Стили как переменные
  const cardStyle = (bgColor, textColor) => ({
    padding: '20px',
    backgroundColor: bgColor,
    borderRadius: '10px',
    margin: '10px 0',
    color: textColor
  });

  const buttonStyle = (bgColor, textColor) => ({
    padding: '8px 16px',
    backgroundColor: bgColor,
    color: textColor,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: '600'
  });

  return (
    <div style={{
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      margin: '20px 0'
    }}>
      <h3>Условный рендеринг и встроенные стили</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: '500' }}>Роль пользователя:</label>
        <select 
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '2px solid #e2e8f0'
          }}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: '500' }}>
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={(e) => setIsLoggedIn(e.target.checked)}
            style={{ marginRight: '5px' }}
          />
          Пользователь вошел в систему
        </label>
      </div>

      {/* Условный рендеринг с помощью && */}
      {isLoggedIn && renderContent()}
      
      {/* Условный рендеринг с помощью тернарного оператора */}
      {!isLoggedIn ? (
        <div style={cardStyle('#e2e8f0', '#4a5568')}>
          <h4>Требуется вход</h4>
          <p>Пожалуйста, войдите в систему для доступа к контенту</p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            style={buttonStyle('#667eea', 'white')}
          >
            Войти
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={buttonStyle('#805ad5', 'white')}
          >
            {showAdvanced ? 'Скрыть' : 'Показать'} дополнительные настройки
          </button>
          
          {/* Рендеринг по условию */}
          {showAdvanced && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#faf5ff',
              borderRadius: '8px',
              border: '1px solid #d6bcfa'
            }}>
              <h5>Дополнительные настройки</h5>
              <p>Здесь могут быть дополнительные параметры для {userRole}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button style={buttonStyle('#9f7aea', 'white')}>Настройка 1</button>
                <button style={buttonStyle('#9f7aea', 'white')}>Настройка 2</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConditionalRender;