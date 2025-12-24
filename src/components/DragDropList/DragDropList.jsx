import React, { useState } from 'react';
import './DragDropList.css';

function DragDropList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Изучить React Hooks', completed: false },
    { id: 2, text: 'Создать компонент Drag&Drop', completed: true },
    { id: 3, text: 'Реализовать валидацию форм', completed: false },
    { id: 4, text: 'Написать тесты', completed: false },
    { id: 5, text: 'Оптимизировать производительность', completed: false }
  ]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const draggedIndex = tasks.findIndex(task => task.id === draggedTask.id);
    
    if (draggedIndex !== targetIndex) {
      const newTasks = [...tasks];
      const [removed] = newTasks.splice(draggedIndex, 1);
      newTasks.splice(targetIndex, 0, removed);
      setTasks(newTasks);
    }

    setDragOverIndex(null);
    setDraggedTask(null);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    setDragOverIndex(null);
    setDraggedTask(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: `Новая задача ${tasks.length + 1}`,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="drag-drop-container">
      <h3>Drag & Drop Список задач</h3>
      <p className="drag-instructions">
        Перетаскивайте задачи для изменения порядка. Кликните по задаче для отметки выполнения.
      </p>
      
      <div className="tasks-list">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''} ${
              dragOverIndex === index ? 'drag-over' : ''
            }`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, task)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            <div className="task-content">
              <span className="drag-handle">⋮⋮</span>
              <span className="task-text">{task.text}</span>
              <button 
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTask(task.id);
                }}
              >
                ×
              </button>
            </div>
            <div className="task-status">
              {task.completed ? '✓ Выполнено' : '◯ В процессе'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="task-controls">
        <button onClick={addTask} className="btn-add-task">
          + Добавить задачу
        </button>
        <div className="stats">
          Всего: {tasks.length} | Выполнено: {tasks.filter(t => t.completed).length}
        </div>
      </div>
      
      <div className="event-log">
        <h4>События Drag&Drop:</h4>
        <p>Перетащите задачу, чтобы увидеть события здесь</p>
      </div>
    </div>
  );
}

export default DragDropList;