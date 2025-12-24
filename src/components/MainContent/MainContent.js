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
    { id: 9, title: 'ЛР9: Сложные формы', description: 'Валидация, динамические поля' }
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