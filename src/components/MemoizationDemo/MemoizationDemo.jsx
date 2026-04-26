// components/MemoizationDemo/MemoizationDemo.jsx
import React, { useState, useMemo, useCallback, memo } from 'react';
import './MemoizationDemo.css';

// 1. Компонент с React.memo - ДОЛЖЕН БЫТЬ ВЫНЕСЕН ОТДЕЛЬНО
const ExpensiveCalculation = memo(function ExpensiveCalculation({ number, onCalculate }) {
  console.log('🔁 ExpensiveCalculation перерендерился');

  // Имитация дорогой операции
  const calculate = () => {
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }
    return number * number;
  };

  const result = calculate();

  return (
    <div className="calculation-card">
      <h5>Expensive Calculation (React.memo)</h5>
      <div className="calculation-result">
        <span>Число: {number}</span>
        <span>Квадрат: {result}</span>
      </div>
      <button onClick={() => onCalculate(number)} className="btn-recalculate">
        🔄 Пересчитать
      </button>
      <p className="calculation-note">
        Мемоизирован - перерендеривается только при изменении пропсов
      </p>
    </div>
  );
});

// 2. Компонент без мемоизации
function SimpleCalculation({ number }) {
  console.log('🔄 SimpleCalculation перерендерился');

  const calculate = () => {
    return number * 2;
  };

  const result = calculate();

  return (
    <div className="calculation-card">
      <h5>Simple Calculation (без мемоизации)</h5>
      <div className="calculation-result">
        <span>Число: {number}</span>
        <span>Удвоенное: {result}</span>
      </div>
      <p className="calculation-note">
        Перерендеривается при каждом обновлении родителя
      </p>
    </div>
  );
}

// Основной компонент
function MemoizationDemo() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  // Считаем рендеры
  React.useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  // 3. useMemo для дорогих вычислений
  const expensiveList = useMemo(() => {
    console.log('🧮 useMemo: пересчет массива');
    return list.map(num => ({
      id: num,
      value: num * num,
      sqrt: Math.sqrt(num).toFixed(2),
      sin: Math.sin(num).toFixed(2)
    }));
  }, [list]);

  // 4. useCallback для стабильных функций
  const handleAddNumber = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setList(prev => [...prev, newNumber]);
  }, []);

  const handleRemoveNumber = useCallback((id) => {
    setList(prev => prev.filter(num => num !== id));
  }, []);

  const handleCalculate = useCallback((num) => {
    alert(`Результат вычисления: ${num * num}`);
  }, []);

  // Без useMemo (для сравнения)
  const regularList = list.map(num => ({
    id: num,
    value: num * num,
    sqrt: Math.sqrt(num).toFixed(2),
    sin: Math.sin(num).toFixed(2)
  }));

  const currentList = useMemoEnabled ? expensiveList : regularList;

  return (
    <div className="memoization-demo">
      <h3>⚡ ЛР12: Мемоизация и оптимизация</h3>
      
      <div className="demo-info">
        <p>
          <strong>Мемоизация</strong> - техника оптимизации, которая кэширует результаты вычислений 
          и повторно использует их при одинаковых входных данных.
        </p>
        <div className="render-counter">
          🔄 Количество рендеров: <strong>{renderCount}</strong>
        </div>
      </div>

      <div className="controls-section">
        <h4>Элементы управления:</h4>
        <div className="controls-grid">
          <div className="control-group">
            <label>Число для расчетов:</label>
            <div className="number-controls">
              <button onClick={() => setCount(prev => prev - 1)} className="btn-control">
                -
              </button>
              <span className="number-display">{count}</span>
              <button onClick={() => setCount(prev => prev + 1)} className="btn-control">
                +
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>Текст (не влияет на расчеты):</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Введите текст..."
              className="text-input"
            />
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useMemoEnabled}
                onChange={(e) => setUseMemoEnabled(e.target.checked)}
              />
              Использовать useMemo
            </label>
            <span className="hint">
              {useMemoEnabled ? '✅ useMemo включен' : '❌ useMemo выключен'}
            </span>
          </div>
        </div>
      </div>

      <div className="calculations-section">
        <h4>Сравнение компонентов:</h4>
        <div className="calculations-grid">
          <ExpensiveCalculation 
            number={count} 
            onCalculate={handleCalculate}
          />
          <SimpleCalculation number={count} />
        </div>
        
        <div className="console-note">
          <p>📝 Откройте консоль разработчика (F12) и посмотрите логи перерендеринга.</p>
          <p>При вводе текста перерендеривается только SimpleCalculation, а ExpensiveCalculation - нет.</p>
        </div>
      </div>

      <div className="list-section">
        <div className="list-header">
          <h4>Оптимизированный список:</h4>
          <button onClick={handleAddNumber} className="btn-add">
            + Добавить число
          </button>
        </div>
        
        <div className="list-stats">
          <span>Элементов: {list.length}</span>
          <span>useMemo: {useMemoEnabled ? 'ВКЛ' : 'ВЫКЛ'}</span>
          <span>Пересчеты: {useMemoEnabled ? 'НЕТ' : 'ДА'}</span>
        </div>

        <div className="items-grid">
          {currentList.map(item => (
            <div key={item.id} className="list-item">
              <div className="item-content">
                <span className="item-id">ID: {item.id}</span>
                <div className="item-values">
                  <span>Квадрат: {item.value}</span>
                  <span>Корень: {item.sqrt}</span>
                  <span>Sin: {item.sin}</span>
                </div>
              </div>
              <button 
                onClick={() => handleRemoveNumber(item.id)}
                className="btn-remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="explanations">
        <h4>📚 Техники оптимизации:</h4>
        <div className="explanation-cards">
          <div className="explanation-card">
            <h5>React.memo()</h5>
            <p>Запоминает компонент и перерендеривает только при изменении пропсов</p>
            <code>{`const Memoized = memo(Component);`}</code>
          </div>
          
          <div className="explanation-card">
            <h5>useMemo()</h5>
            <p>Кэширует результат вычислений между рендерами</p>
            <code>{`const value = useMemo(() => compute(a, b), [a, b]);`}</code>
          </div>
          
          <div className="explanation-card">
            <h5>useCallback()</h5>
            <p>Кэширует функцию между рендерами</p>
            <code>{`const fn = useCallback(() => {...}, [deps]);`}</code>
          </div>
          
          <div className="explanation-card">
            <h5>Когда использовать?</h5>
            <ul>
              <li>Дорогие вычисления</li>
              <li>Большие списки</li>
              <li>Ссылочная стабильность</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="performance-tips">
        <h4>💡 Советы по производительности:</h4>
        <ul>
          <li>Используйте React.memo для "чистых" компонентов</li>
          <li>useMemo для дорогих вычислений</li>
          <li>useCallback для функций в мемоизированных компонентах</li>
          <li>Избегайте мемоизации всего - это тоже имеет стоимость</li>
        </ul>
      </div>
    </div>
  );
}

export default MemoizationDemo;