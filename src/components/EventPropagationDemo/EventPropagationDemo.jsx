import React, { useState } from 'react';
import './EventPropagationDemo.css';

function EventPropagationDemo() {
  const [eventLog, setEventLog] = useState([]);
  const [stopPropagation, setStopPropagation] = useState(false);
  const [stopImmediate, setStopImmediate] = useState(false);
  const [preventDefault, setPreventDefault] = useState(false);

  const addToLog = (message, element, phase) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [{
      id: Date.now(),
      message,
      timestamp,
      element,
      phase
    }, ...prev].slice(0, 10));
  };

  const handleParentClick = (e) => {
    addToLog('Родительский клик', 'parent', 'capture');
  };

  const handleChildClick = (e) => {
    addToLog('Дочерний клик', 'child', 'capture');
    
    if (stopPropagation) {
      e.stopPropagation();
      addToLog('Остановлено распространение (stopPropagation)', 'child', 'info');
    }
    
    if (stopImmediate) {
      e.stopImmediatePropagation();
      addToLog('Немедленная остановка (stopImmediatePropagation)', 'child', 'warning');
    }
  };

  const handleBubbleParentClick = (e) => {
    addToLog('Родительский клик (всплытие)', 'parent', 'bubble');
  };

  const handleBubbleChildClick = (e) => {
    addToLog('Дочерний клик (всплытие)', 'child', 'bubble');
  };

  const handleLinkClick = (e) => {
    if (preventDefault) {
      e.preventDefault();
      addToLog('Предотвращено действие по умолчанию (preventDefault)', 'link', 'info');
    }
  };

  const clearLog = () => {
    setEventLog([]);
  };

  return (
    <div className="event-propagation-demo">
      <h3>🔍 Демонстрация событий и их распространения</h3>
      
      <div className="controls">
        <label className="control-item">
          <input
            type="checkbox"
            checked={stopPropagation}
            onChange={(e) => setStopPropagation(e.target.checked)}
          />
          stopPropagation()
        </label>
        
        <label className="control-item">
          <input
            type="checkbox"
            checked={stopImmediate}
            onChange={(e) => setStopImmediate(e.target.checked)}
          />
          stopImmediatePropagation()
        </label>
        
        <label className="control-item">
          <input
            type="checkbox"
            checked={preventDefault}
            onChange={(e) => setPreventDefault(e.target.checked)}
          />
          preventDefault()
        </label>
        
        <button onClick={clearLog} className="btn-clear-log">
          Очистить лог
        </button>
      </div>

      <div className="event-container">
        <div 
          className="event-parent"
          onClickCapture={handleParentClick}
          onClick={handleBubbleParentClick}
        >
          <div className="event-label">Родительский элемент</div>
          <div className="event-instruction">Кликните здесь (погружение → всплытие)</div>
          
          <div 
            className="event-child"
            onClickCapture={handleChildClick}
            onClick={handleBubbleChildClick}
          >
            <div className="event-label">Дочерний элемент</div>
            <div className="event-instruction">Кликните здесь (погружение → всплытие)</div>
          </div>
        </div>

        <div className="event-link-section">
          <a 
            href="https://reactjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="event-link"
          >
            Ссылка на React документацию
          </a>
          <div className="event-instruction">
            Кликните с preventDefault для отмены перехода
          </div>
        </div>
      </div>

      <div className="event-log">
        <h4>Лог событий (последние 10):</h4>
        {eventLog.length === 0 ? (
          <p className="empty-log">Кликайте по элементам, чтобы увидеть события</p>
        ) : (
          <div className="log-entries">
            {eventLog.map(log => (
              <div 
                key={log.id} 
                className={`log-entry ${log.phase} ${log.element}`}
              >
                <span className="log-timestamp">[{log.timestamp}]</span>
                <span className="log-message">{log.message}</span>
                <span className={`log-badge ${log.element}`}>
                  {log.element === 'parent' ? 'Родитель' : 
                   log.element === 'child' ? 'Дочерний' : 'Ссылка'}
                </span>
                <span className={`log-phase ${log.phase}`}>
                  {log.phase === 'capture' ? 'Погружение' : 
                   log.phase === 'bubble' ? 'Всплытие' : 'Действие'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="event-explanation">
        <h4>📚 Объяснение:</h4>
        <ul>
          <li>
            <strong>Погружение (Capture Phase):</strong> Событие спускается от корня к целевому элементу
          </li>
          <li>
            <strong>Всплытие (Bubble Phase):</strong> Событие поднимается от целевого элемента к корню
          </li>
          <li>
            <strong>stopPropagation():</strong> Останавливает дальнейшее распространение события
          </li>
          <li>
            <strong>preventDefault():</strong> Отменяет стандартное действие элемента
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EventPropagationDemo;