import React, { Component } from 'react';
import './ClassComponentExample.css';

class ClassComponentExample extends Component {
  constructor(props) {
    super(props);
    
    // Инициализация состояния
    this.state = {
      count: 0,
      isActive: false,
      timer: 0,
      users: [
        { id: 1, name: 'Алексей Петров', role: 'Frontend разработчик' },
        { id: 2, name: 'Мария Иванова', role: 'UI/UX дизайнер' },
        { id: 3, name: 'Иван Сидоров', role: 'Backend разработчик' }
      ],
      inputValue: ''
    };
    
    // Привязка методов
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }
  
  // Метод жизненного цикла - монтирование
  componentDidMount() {
    console.log('Компонент смонтирован');
    
    // Запускаем таймер
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1
      }));
    }, 1000);
  }
  
  // Метод жизненного цикла - обновление
  componentDidUpdate(prevProps, prevState) {
    console.log('Компонент обновился');
    
    if (prevState.count !== this.state.count) {
      console.log(`Счетчик изменился с ${prevState.count} на ${this.state.count}`);
    }
    
    if (prevState.isActive !== this.state.isActive) {
      console.log(`Статус изменился на: ${this.state.isActive ? 'активен' : 'неактивен'}`);
    }
  }
  
  // Метод жизненного цикла - размонтирование
  componentWillUnmount() {
    console.log('Компонент будет размонтирован');
    
    // Очищаем интервал
    clearInterval(this.intervalId);
  }
  
  // Обработчики событий
  handleIncrement() {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }
  
  handleDecrement() {
    this.setState(prevState => ({
      count: prevState.count > 0 ? prevState.count - 1 : 0
    }));
  }
  
  toggleActive() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }
  
  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  
  handleAddUser() {
    if (this.state.inputValue.trim()) {
      const newUser = {
        id: Date.now(),
        name: this.state.inputValue,
        role: 'Новый пользователь'
      };
      
      this.setState(prevState => ({
        users: [...prevState.users, newUser],
        inputValue: ''
      }));
    }
  }
  
  // Метод для удаления пользователя
  handleRemoveUser = (id) => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.id !== id)
    }));
  }
  
  render() {
    const { count, isActive, timer, users, inputValue } = this.state;
    
    return (
      <div className="class-component">
        <h2>Классовый компонент</h2>
        <p>Демонстрация жизненного цикла и методов класса</p>
        
        <div className="state-section">
          <h3>Состояние компонента:</h3>
          
          <div className="counter">
            <h4>Счетчик: {count}</h4>
            <div className="button-group">
              <button 
                onClick={this.handleIncrement}
                className="btn btn-primary"
              >
                Увеличить
              </button>
              <button 
                onClick={this.handleDecrement}
                className="btn btn-secondary"
                disabled={count === 0}
              >
                Уменьшить
              </button>
            </div>
          </div>
          
          <div className="status">
            <h4>Статус: {isActive ? 'Активен' : 'Неактивен'}</h4>
            <button 
              onClick={this.toggleActive}
              className={`btn ${isActive ? 'btn-danger' : 'btn-success'}`}
            >
              {isActive ? 'Деактивировать' : 'Активировать'}
            </button>
          </div>
          
          <div className="timer">
            <h4>Таймер: {timer} секунд</h4>
            <p>Таймер запускается при монтировании компонента</p>
          </div>
        </div>
        
        <div className="users-section">
          <h3>Управление пользователями:</h3>
          
          <div className="user-form">
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Введите имя пользователя"
              className="user-input"
            />
            <button 
              onClick={this.handleAddUser}
              className="btn btn-primary"
              disabled={!inputValue.trim()}
            >
              Добавить пользователя
            </button>
          </div>
          
          <div className="users-list">
            {users.length > 0 ? (
              <ul>
                {users.map(user => (
                  <li key={user.id} className="user-item">
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span>{user.role}</span>
                    </div>
                    <button 
                      onClick={() => this.handleRemoveUser(user.id)}
                      className="btn btn-small btn-danger"
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-list">Список пользователей пуст</p>
            )}
          </div>
        </div>
        
        <div className="lifecycle-info">
          <h3>Методы жизненного цикла:</h3>
          <ul>
            <li><strong>constructor()</strong> - инициализация состояния и привязка методов</li>
            <li><strong>componentDidMount()</strong> - вызывается после монтирования</li>
            <li><strong>componentDidUpdate()</strong> - вызывается после обновления</li>
            <li><strong>componentWillUnmount()</strong> - вызывается перед размонтированием</li>
            <li><strong>render()</strong> - обязательный метод, возвращает JSX</li>
          </ul>
          <p>Откройте консоль браузера для просмотра сообщений жизненного цикла</p>
        </div>
      </div>
    );
  }
}

export default ClassComponentExample;