import React from 'react';
import UserList from '../UserList/UserList';
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
    'Сортировка и фильтрация'
  ];

  return (
    <main className="main-content">
      <section className="intro">
        <h2>О нашем проекте</h2>
        <p>
          Этот проект создан для изучения структуры React-приложений,
          работы с компонентами и их стилизацией с помощью CSS Modules.
          В этой лабораторной работе мы изучаем динамическое формирование разметки с помощью метода map().
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
      
      <section className="map-example">
        <h2>Пример использования метода map()</h2>
        <div className="example-content">
          <div className="example-code">
            <pre>
{`// Пример рендеринга списка
const users = [{id: 1, name: 'Алексей'}, {id: 2, name: 'Мария'}];

function UserList() {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
}`}
            </pre>
          </div>
          <div className="example-explanation">
            <h3>Метод map() в React</h3>
            <p>Используется для преобразования массивов данных в массив React-элементов.</p>
            <h4>Основные правила:</h4>
            <ul>
              <li>Всегда добавляйте уникальный key prop</li>
              <li>Key должен быть стабильным и предсказуемым</li>
              <li>Не используйте индекс массива как key, если данные могут меняться</li>
              <li>Каждый элемент в списке должен иметь уникальный key</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="team">
        <h2>Динамический список пользователей</h2>
        <p className="team-description">
          Используйте фильтры и сортировку для управления списком
        </p>
        <UserList initialUsers={users} />
      </section>
    </main>
  );
}

export default MainContent;