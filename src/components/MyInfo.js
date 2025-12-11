import React from 'react';
import HobbyList from './HobbyList';

function MyInfo() {
  const hobbies = ['Фотография', 'Велоспорт', 'Чтение'];
  
  return (
    <div className="my-info">
      <h1>Имя Фамилия</h1>
      <p>Фронтенд-разработчик с опытом работы 2 года. Увлекаюсь React, TypeScript и современным CSS.</p>
      
      <h3>Любимые технологии:</h3>
      <ol>
        <li>React</li>
        <li>TypeScript</li>
        <li>Node.js</li>
      </ol>
      
      <HobbyList hobbies={hobbies} />
      
      <p className="copyright">
        © {new Date().getFullYear()} Все права защищены
      </p>
      
      <p>Стаж в месяцах: {2 * 12}</p>
    </div>
  );
}

export default MyInfo;
