import React from 'react';
import UserList from '../UserList/UserList';
import Notification from '../Notification/Notification';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import ConditionalRender from '../ConditionalRender/ConditionalRender';
import './MainContent.css';

function MainContent() {
  const users = [
    {
      id: 1,
      name: 'Алексей Петров',
      role: 'Frontend разработчик',
      experience: '3 года',
      skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Redux', 'Next.js'],
      description: 'Специализируюсь на создании современных пользовательских интерфейсов',
      avatarColor: '#667eea',
      isOnline: true,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Мария Иванова',
      role: 'UI/UX дизайнер',
      experience: '4 года',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch'],
      description: 'Создаю удобные и красивые интерфейсы',
      avatarColor: '#764ba2',
      isOnline: false,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Иван Сидоров',
      role: 'Backend разработчик',
      experience: '5 лет',
      skills: ['Node.js', 'Python', 'MongoDB', 'Docker', 'AWS', 'PostgreSQL'],
      description: 'Разрабатываю серверную часть веб-приложений',
      avatarColor: '#f093fb',
      isOnline: true,
      rating: 4.2
    },
    {
      id: 4,
      name: 'Елена Кузнецова',
      role: 'Fullstack разработчик',
      experience: '2 года',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'GraphQL'],
      description: 'Работаю над полным циклом разработки приложений',
      avatarColor: '#4facfe',
      isOnline: true,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Сергей Волков',
      role: 'Frontend разработчик',
      experience: '1 год',
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      description: 'Начинающий разработчик, учусь React',
      avatarColor: '#38b2ac',
      isOnline: true,
      rating: 3.8
    },
    {
      id: 6,
      name: 'Ольга Смирнова',
      role: 'UI/UX дизайнер',
      experience: '3 года',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
      description: 'Создаю дизайн для мобильных и веб-приложений',
      avatarColor: '#ed64a6',
      isOnline: false,
      rating: 4.6
    },
    {
      id: 7,
      name: 'Дмитрий Козлов',
      role: 'DevOps инженер',
      experience: '6 лет',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      description: 'Автоматизирую процессы развертывания и мониторинга',
      avatarColor: '#f56565',
      isOnline: true,
      rating: 4.9
    },
    {
      id: 8,
      name: 'Анна Новикова',
      role: 'Frontend разработчик',
      experience: '2 года',
      skills: ['React', 'Vue.js', 'Sass', 'Webpack'],
      description: 'Люблю создавать анимации и интерактивные элементы',
      avatarColor: '#4299e1',
      isOnline: false,
      rating: 4.3
    }
  ];

  const technologies = [
    'React 18',
    'CSS Modules',
    'Flexbox/Grid',
    'Адаптивный дизайн',
    'Компонентный подход',
    'Props и State',
    'Метод map()',
    'Ключи (keys)',
    'Сортировка и фильтрация',
    'Условный рендеринг',
    'Встроенные стили (inline styles)'
  ];

  return (
    <main className="main-content">
      <section className="intro">
        <h2>О нашем проекте</h2>
        <p>
          Этот проект создан для изучения структуры React-приложений,
          работы с компонентами и их стилизацией. В этой лабораторной работе 
          мы изучаем условный рендеринг и встроенные стили.
        </p>
        
        {/* Пример уведомлений с разными типами */}
        <Notification 
          type="info" 
          message="Добро пожаловать в лабораторную работу 5!" 
        />
        <Notification 
          type="success" 
          message="Успешно загружены данные пользователей" 
          duration={3000}
        />
        
        <div className="features">
          <h3>Что мы изучим:</h3>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>
      
      <section className="conditional-section">
        <h2>Условный рендеринг</h2>
        
        <div className="example-content">
          <div className="example-code">
            <pre>
{`// Примеры условного рендеринга

// 1. Логический оператор &&
{isLoggedIn && <UserProfile />}

// 2. Тернарный оператор
{isLoading ? <Spinner /> : <Content />}

// 3. Переменная с JSX
let message;
if (userRole === 'admin') {
  message = <AdminPanel />;
} else {
  message = <UserPanel />;
}

// 4. Немедленно вызываемая функция
{(() => {
  if (error) return <Error />;
  if (loading) return <Loader />;
  return <Data />;
})()}`}
            </pre>
          </div>
          <div className="example-explanation">
            <h3>Методы условного рендеринга</h3>
            <p>React предоставляет несколько способов для условного отображения компонентов.</p>
            <h4>Основные подходы:</h4>
            <ul>
              <li><strong>if/else</strong> - для сложных условий</li>
              <li><strong>&& оператор</strong> - для простых условий</li>
              <li><strong>Тернарный оператор</strong> - для выбора между двумя вариантами</li>
              <li><strong>Немедленно вызываемая функция</strong> - для сложной логики</li>
            </ul>
          </div>
        </div>
        
        {/* Компонент с условным рендерингом */}
        <ConditionalRender />
      </section>
      
      <section className="inline-styles-section">
        <h2>Встроенные стили (Inline Styles)</h2>
        
        <div className="example-content">
          <div className="example-code">
            <pre>
{`// Пример встроенных стилей

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#667eea',
  color: 'white',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer'
};

function MyButton() {
  return (
    <button style={buttonStyle}>
      Нажми меня
    </button>
  );
}

// Динамические стили
function DynamicButton({ isActive }) {
  const dynamicStyle = {
    ...buttonStyle,
    backgroundColor: isActive ? '#48bb78' : '#667eea'
  };
  
  return <button style={dynamicStyle}>Кнопка</button>;
}`}
            </pre>
          </div>
          <div className="example-explanation">
            <h3>Встроенные стили в React</h3>
            <p>Встроенные стили - это JavaScript-объекты, которые передаются через атрибут style.</p>
            <h4>Особенности:</h4>
            <ul>
              <li>Имена свойств в camelCase (backgroundColor вместо background-color)</li>
              <li>Значения в виде строк (включая числовые)</li>
              <li>Подходят для динамических стилей</li>
              <li>Меньше производительности, чем CSS-классы</li>
            </ul>
          </div>
        </div>
        
        {/* Компонент с переключением темы */}
        <ToggleTheme />
      </section>
      
      <section className="team">
        <h2>Динамический список пользователей</h2>
        <UserList initialUsers={users} />
        
        {/* Дополнительное уведомление */}
        <Notification 
          type="warning" 
          message="Не забудьте сохранить изменения перед выходом" 
        />
      </section>
    </main>
  );
}

export default MainContent;