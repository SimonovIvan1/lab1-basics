import React, { Component } from 'react';
import './LifecycleDemo.css';

class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    console.log('constructor() вызван');
    
    this.state = {
      phase: 'Инициализация',
      updates: 0,
      showChild: true,
      data: null,
      loading: true
    };
    
    this.toggleChild = this.toggleChild.bind(this);
    this.simulateUpdate = this.simulateUpdate.bind(this);
    this.simulateAPIRequest = this.simulateAPIRequest.bind(this);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps() вызван');
    return null;
  }
  
  componentDidMount() {
    console.log('componentDidMount() вызван');
    
    // Имитация загрузки данных
    this.simulateAPIRequest();
    
    // Обновляем фазу
    this.setState({ phase: 'Монтирование завершено' });
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate() вызван');
    console.log('Предыдущее состояние:', this.state);
    console.log('Следующее состояние:', nextState);
    
    // Разрешаем обновление, если изменилось более 2 свойств
    const changedProps = Object.keys(nextState).filter(key => 
      nextState[key] !== this.state[key]
    ).length;
    
    const shouldUpdate = changedProps >= 2;
    console.log('Обновление разрешено:', shouldUpdate);
    
    return shouldUpdate;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate() вызван');
    console.log('Предыдущее состояние:', prevState);
    console.log('Текущее состояние:', this.state);
    
    // Возвращаем снимок состояния
    return {
      previousPhase: prevState.phase,
      previousUpdates: prevState.updates
    };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate() вызван');
    console.log('Снимок:', snapshot);
    
    if (snapshot) {
      console.log(`Фаза изменилась: ${snapshot.previousPhase} → ${this.state.phase}`);
      console.log(`Обновления изменились: ${snapshot.previousUpdates} → ${this.state.updates}`);
    }
  }
  
  componentWillUnmount() {
    console.log('componentWillUnmount() вызван');
  }
  
  simulateAPIRequest() {
    this.setState({ loading: true });
    
    // Имитация запроса к API
    setTimeout(() => {
      this.setState({
        data: {
          id: 1,
          title: 'Данные загружены',
          content: 'Это имитация ответа от API',
          timestamp: new Date().toLocaleTimeString()
        },
        loading: false,
        phase: 'Данные загружены'
      });
    }, 2000);
  }
  
  simulateUpdate() {
    this.setState(prevState => ({
      updates: prevState.updates + 1,
      phase: `Обновление #${prevState.updates + 1}`
    }));
  }
  
  toggleChild() {
    this.setState(prevState => ({
      showChild: !prevState.showChild
    }));
  }
  
  render() {
    console.log('render() вызван');
    
    const { phase, updates, showChild, data, loading } = this.state;
    
    return (
      <div className="lifecycle-demo">
        <h2>Демонстрация жизненного цикла компонента</h2>
        <p>Откройте консоль браузера для просмотра сообщений</p>
        
        <div className="demo-controls">
          <div className="control-group">
            <h3>Текущее состояние:</h3>
            <div className="state-info">
              <div className="state-item">
                <span>Фаза:</span>
                <strong>{phase}</strong>
              </div>
              <div className="state-item">
                <span>Количество обновлений:</span>
                <strong>{updates}</strong>
              </div>
              <div className="state-item">
                <span>Дочерний компонент:</span>
                <strong>{showChild ? 'Показан' : 'Скрыт'}</strong>
              </div>
              <div className="state-item">
                <span>Загрузка данных:</span>
                <strong>{loading ? 'Загружается...' : 'Завершена'}</strong>
              </div>
            </div>
          </div>
          
          <div className="control-buttons">
            <button onClick={this.simulateUpdate} className="btn btn-primary">
              Имитировать обновление
            </button>
            <button onClick={this.toggleChild} className="btn btn-secondary">
              {showChild ? 'Скрыть дочерний компонент' : 'Показать дочерний компонент'}
            </button>
            <button onClick={this.simulateAPIRequest} className="btn btn-success">
              Загрузить данные (API)
            </button>
          </div>
        </div>
        
        <div className="data-section">
          <h3>Загруженные данные:</h3>
          {loading ? (
            <div className="loading">Загрузка...</div>
          ) : data ? (
            <div className="data-card">
              <h4>{data.title}</h4>
              <p>{data.content}</p>
              <small>Время загрузки: {data.timestamp}</small>
            </div>
          ) : (
            <p>Данные не загружены</p>
          )}
        </div>
        
        {showChild && (
          <div className="child-component">
            <h3>Дочерний компонент</h3>
            <p>Этот компонент будет размонтирован при нажатии кнопки выше</p>
            <p>В консоли увидите сообщение componentWillUnmount()</p>
          </div>
        )}
        
        <div className="methods-info">
          <h3>Методы жизненного цикла:</h3>
          <div className="methods-grid">
            <div className="method-card">
              <h4>Монтирование</h4>
              <ul>
                <li>constructor()</li>
                <li>getDerivedStateFromProps()</li>
                <li>render()</li>
                <li>componentDidMount()</li>
              </ul>
            </div>
            <div className="method-card">
              <h4>Обновление</h4>
              <ul>
                <li>getDerivedStateFromProps()</li>
                <li>shouldComponentUpdate()</li>
                <li>render()</li>
                <li>getSnapshotBeforeUpdate()</li>
                <li>componentDidUpdate()</li>
              </ul>
            </div>
            <div className="method-card">
              <h4>Размонтирование</h4>
              <ul>
                <li>componentWillUnmount()</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LifecycleDemo;