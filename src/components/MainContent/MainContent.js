import React from 'react';
import UserCard from '../UserCard/UserCard';
import './MainContent.css';

function MainContent() {
  const users = [
    {
      id: 1,
      name: 'Алексей Петров',
      role: 'Frontend разработчик',
      experience: '3 года',
      skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
      description: 'Специализируюсь на создании современных пользовательских интерфейсов',
      avatarColor: '#667eea'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      role: 'UI/UX дизайнер',
      experience: '4 года',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
      description: 'Создаю удобные и красивые интерфейсы',
      avatarColor: '#764ba2'
    },
    {
      id: 3,
      name: 'Иван Сидоров',
      role: 'Backend разработчик',
      experience: '5 лет',
      skills: ['Node.js', 'Python', 'MongoDB', 'Docker'],
      description: 'Разрабатываю серверную часть веб-приложений',
      avatarColor: '#f093fb'
    },
    {
      id: 4,
      name: 'Елена Кузнецова',
      role: 'Fullstack разработчик',
      experience: '2 года',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      description: 'Работаю над полным циклом разработки приложений',
      avatarColor: '#4facfe'
    }
  ];

  const technologies = [
    'React 18',
    'CSS Modules',
    'Flexbox/Grid',
    'Адаптивный дизайн',
    'Компонентный подход',
    'Props и State'
  ];

  return (
    <main className="main-content">
      <section className="intro">
        <h2>О нашем проекте</h2>
        <p>
          Этот проект создан для изучения структуры React-приложений, 
          работы с компонентами и их стилизацией с помощью CSS Modules.
        </p>
        
        <div className="features">
          <h3>Что мы изучим:</h3>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="team">
        <h2>Наша команда</h2>
        <div className="user-cards-container">
          {users.map(user => (
            <UserCard 
              key={user.id}
              name={user.name}
              role={user.role}
              experience={user.experience}
              skills={user.skills}
              description={user.description}
              avatarColor={user.avatarColor}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default MainContent;
