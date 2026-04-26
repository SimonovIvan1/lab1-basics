import React, { useState } from 'react';
import './MainContent.css';

// Импорты для ЛР1-ЛР5
import UserList from '../UserList/UserList';
import Notification from '../Notification/Notification';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import ConditionalRender from '../ConditionalRender/ConditionalRender';

// Импорты для Последующих работ
import ClassComponentExample from '../ClassComponentExample/ClassComponentExample';
import LifecycleDemo from '../LifecycleDemo/LifecycleDemo';
import ComplexStateObject from '../ComplexStateObject/ComplexStateObject';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import DragDropList from '../DragDropList/DragDropList';
import EventPropagationDemo from '../EventPropagationDemo/EventPropagationDemo';
import MultiStepForm from '../MultiStepForm/MultiStepForm';
import DynamicFieldsForm from '../DynamicFieldsForm/DynamicFieldsForm';
import ApiDataFetching from '../ApiDataFetching/ApiDataFetching';
import ThemeContextProvider from '../ThemeContextProvider/ThemeContextProvider';
import MemoizationDemo from '../MemoizationDemo/MemoizationDemo';

function MainContent() {
  const [activeLab, setActiveLab] = useState(1);
  
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
    // ... остальные пользователи
  ];

  const labs = [
  { id: 1, title: 'ЛР1-ЛР5: Основы React', description: 'Props, State, Компоненты' },
  { id: 6, title: 'ЛР6: Классовые компоненты', description: 'Жизненный цикл, методы класса' },
  { id: 7, title: 'ЛР7: Сложное состояние', description: 'Работа со сложными структурами данных' },
  { id: 8, title: 'ЛР8: Обработка событий', description: 'События, Drag&Drop, формы' },
  { id: 9, title: 'ЛР9: Сложные формы', description: 'Валидация, динамические поля' },
  // ДОБАВЛЯЕМ НОВЫЕ РАБОТЫ:
  { id: 10, title: 'ЛР10: Работа с API', description: 'HTTP-запросы, асинхронные операции' },
  { id: 11, title: 'ЛР11: Глобальное состояние', description: 'Context API, управление состоянием' },
  { id: 12, title: 'ЛР12: Оптимизация React', description: 'Мемоизация, производительность' }
];

  const renderLabContent = () => {
    switch(activeLab) {
      case 1:
        return (
          <>
            <section className="intro">
              <h2>Лабораторные работы 1-5</h2>
              <p>Основы React: компоненты, props, state, работа с формами</p>
              
              <div className="lab-navigation">
                <div className="lab-buttons">
                  <button 
                    className="lab-btn active"
                    onClick={() => setActiveLab(1)}
                  >
                    ЛР1-5
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(6)}
                  >
                    ЛР6
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(7)}
                  >
                    ЛР7
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(8)}
                  >
                    ЛР8
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(9)}
                  >
                    ЛР9
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(10)}
                  >
                    ЛР10
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(11)}
                  >
                    ЛР11
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(12)}
                  >
                    ЛР12
                  </button>
                </div>
              </div>
            </section>

            <Notification 
              type="info" 
              message="Лабораторные работы 1-5: Основы React" 
            />

            <ToggleTheme />
            
            <ConditionalRender />
            
            <section className="team">
              <h2>Динамический список пользователей</h2>
              <UserList initialUsers={users} />
            </section>

            <Notification 
              type="success" 
              message="Для перехода к другим лабораторным работам используйте кнопки выше" 
            />
          </>
        );
      
      case 6:
        return (
          <>
            <section className="intro">
              <h2>Лабораторная работа 6</h2>
              <p>Классовые компоненты и жизненный цикл</p>
              
              <div className="lab-navigation">
                <div className="lab-buttons">
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(1)}
                  >
                    ЛР1-5
                  </button>
                  <button 
                    className="lab-btn active"
                    onClick={() => setActiveLab(6)}
                  >
                    ЛР6
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(7)}
                  >
                    ЛР7
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(8)}
                  >
                    ЛР8
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(9)}
                  >
                    ЛР9
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(10)}
                  >
                    ЛР10
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(11)}
                  >
                    ЛР11
                  </button>
                  <button 
                    className="lab-btn"
                    onClick={() => setActiveLab(12)}
                  >
                    ЛР12
                  </button>
                </div>
              </div>
            </section>

            <Notification 
              type="info" 
              message="Откройте консоль браузера для просмотра сообщений жизненного цикла" 
            />

            <ClassComponentExample />
            
            <LifecycleDemo />

            <Notification 
              type="warning" 
              message="Изучите вывод в консоли браузера при взаимодействии с компонентами" 
            />
          </>
        );
      
      case 7:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 7</h2>
        <p>Сложное состояние: Работа со сложными структурами данных</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn active" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn active" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Работа с вложенными объектами, массивами объектов и иммутабельными обновлениями" 
      />

      <ComplexStateObject />
      
      <ShoppingCart />

      <Notification 
        type="success" 
        message="Изучите как обновляются сложные структуры данных без мутаций" 
      />
    </>
  );

case 8:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 8</h2>
        <p>Обработка событий: События, Drag&Drop, формы</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn active" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn active" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Работа с событиями Drag&Drop, пользовательскими событиями и их распространением" 
      />

      <DragDropList />
      
      <EventPropagationDemo />

      <Notification 
        type="warning" 
        message="Попробуйте разные события: drag, drop, mouse, keyboard" 
      />
    </>
  );

case 9:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 9</h2>
        <p>Сложные формы: Валидация, динамические поля</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn active" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn active" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Многошаговые формы, валидация в реальном времени, динамические поля" 
      />

      <MultiStepForm />
      
      <DynamicFieldsForm />

      <Notification 
        type="success" 
        message="Протестируйте валидацию и попробуйте добавить/удалить поля динамически" 
      />
    </>
  );

  case 10:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 10</h2>
        <p>Работа с API: HTTP-запросы, асинхронные операции, обработка загрузки и ошибок</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn active" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Работа с внешними API, обработка асинхронных операций, состояния загрузки и ошибок" 
      />

      <ApiDataFetching />

      <Notification 
        type="success" 
        message="Попробуйте разные HTTP-методы: GET, POST, DELETE" 
      />
    </>
  );

case 11:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 11</h2>
        <p>Глобальное состояние: Context API, управление состоянием приложения</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn active" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Использование Context API для глобального управления состоянием приложения" 
      />

      <ThemeContextProvider />

      <Notification 
        type="warning" 
        message="Попробуйте переключать тему и обратите внимание, как она применяется глобально" 
      />
    </>
  );

case 12:
  return (
    <>
      <section className="intro">
        <h2>Лабораторная работа 12</h2>
        <p>Оптимизация React: Мемоизация, ленивая загрузка, виртуализация, профилирование</p>
        
        <div className="lab-navigation">
          <div className="lab-buttons">
            <button className="lab-btn" onClick={() => setActiveLab(1)}>ЛР1-5</button>
            <button className="lab-btn" onClick={() => setActiveLab(6)}>ЛР6</button>
            <button className="lab-btn" onClick={() => setActiveLab(7)}>ЛР7</button>
            <button className="lab-btn" onClick={() => setActiveLab(8)}>ЛР8</button>
            <button className="lab-btn" onClick={() => setActiveLab(9)}>ЛР9</button>
            <button className="lab-btn" onClick={() => setActiveLab(10)}>ЛР10</button>
            <button className="lab-btn" onClick={() => setActiveLab(11)}>ЛР11</button>
            <button className="lab-btn active" onClick={() => setActiveLab(12)}>ЛР12</button>
          </div>
        </div>
      </section>

      <Notification 
        type="info" 
        message="Техники оптимизации производительности React приложений" 
      />

      <MemoizationDemo />

      <Notification 
        type="success" 
        message="Откройте консоль разработчика (F12) чтобы увидеть разницу в перерендеринге" 
      />
    </>
  );
      
      default:
        return (
          <section className="intro">
            <h2>Лабораторные работы по React</h2>
            <p>Выберите лабораторную работу из списка</p>
            
            <div className="labs-grid">
              {labs.map(lab => (
                <div 
                  key={lab.id} 
                  className="lab-card"
                  onClick={() => setActiveLab(lab.id)}
                >
                  <h3>{lab.title}</h3>
                  <p>{lab.description}</p>
                  <button className="btn btn-primary">
                    Перейти к работе
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
    }
  };

  return (
    <main className="main-content">
      {renderLabContent()}
    </main>
  );
}

export default MainContent;