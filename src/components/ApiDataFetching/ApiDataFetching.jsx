// components/ApiDataFetching/ApiDataFetching.jsx
import React, { useState, useEffect } from 'react';
import './ApiDataFetching.css';

function ApiDataFetching() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({ title: '', body: '' });
  const [method, setMethod] = useState('GET');

  // Базовый URL API
  const API_URL = 'https://jsonplaceholder.typicode.com';

  // Функция для GET запроса
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/posts?_limit=5`);
      if (!response.ok) throw new Error('Ошибка сети');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Функция для POST запроса
  const createPost = async () => {
    if (!postData.title.trim() || !postData.body.trim()) {
      setError('Заполните все поля');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          body: postData.body,
          userId: 1,
        }),
      });
      
      if (!response.ok) throw new Error('Ошибка при создании');
      const result = await response.json();
      
      // Добавляем новый пост в начало списка
      setData(prev => [result, ...prev]);
      setPostData({ title: '', body: '' });
      
      alert('Пост успешно создан!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Функция для DELETE запроса
  const deletePost = async (id) => {
    if (!window.confirm('Удалить этот пост?')) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Ошибка при удалении');
      
      // Удаляем пост из списка
      setData(prev => prev.filter(post => post.id !== id));
      alert('Пост успешно удален!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="api-data-fetching">
      <h3>🔗 ЛР10: Работа с API</h3>
      
      <div className="api-controls">
        <div className="method-selector">
          <h4>Выберите метод HTTP:</h4>
          <div className="method-buttons">
            <button 
              className={`method-btn ${method === 'GET' ? 'active' : ''}`}
              onClick={() => setMethod('GET')}
            >
              GET (получить данные)
            </button>
            <button 
              className={`method-btn ${method === 'POST' ? 'active' : ''}`}
              onClick={() => setMethod('POST')}
            >
              POST (создать данные)
            </button>
            <button 
              className={`method-btn ${method === 'DELETE' ? 'active' : ''}`}
              onClick={() => setMethod('DELETE')}
            >
              DELETE (удалить данные)
            </button>
          </div>
        </div>

        <button onClick={fetchData} className="btn-refresh" disabled={loading}>
          {loading ? 'Загрузка...' : '🔄 Обновить данные'}
        </button>
      </div>

      {method === 'POST' && (
        <div className="post-form">
          <h4>Создать новый пост:</h4>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            placeholder="Заголовок поста"
            className="form-input"
            disabled={loading}
          />
          <textarea
            name="body"
            value={postData.body}
            onChange={handleInputChange}
            placeholder="Текст поста"
            className="form-textarea"
            rows="4"
            disabled={loading}
          />
          <button onClick={createPost} className="btn-submit" disabled={loading}>
            {loading ? 'Создание...' : '📝 Создать пост'}
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          ⚠️ Ошибка: {error}
        </div>
      )}

      <div className="data-display">
        <h4>Полученные данные ({data.length} постов):</h4>
        
        {loading && method === 'GET' ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Загрузка данных с сервера...</p>
          </div>
        ) : (
          <div className="posts-list">
            {data.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <h5>{post.title}</h5>
                  {method === 'DELETE' && (
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="btn-delete"
                      disabled={loading}
                    >
                      🗑️ Удалить
                    </button>
                  )}
                </div>
                <p className="post-body">{post.body}</p>
                <div className="post-footer">
                  <span className="post-id">ID: {post.id}</span>
                  <span className="post-user">User ID: {post.userId || 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="api-info">
        <h4>📚 Информация о работе с API:</h4>
        <ul>
          <li><strong>GET:</strong> Получение данных с сервера (чтение)</li>
          <li><strong>POST:</strong> Отправка данных на сервер (создание)</li>
          <li><strong>DELETE:</strong> Удаление данных с сервера</li>
          <li>Используется: <code>fetch()</code>, <code>async/await</code></li>
          <li>API: JSONPlaceholder (тестовый REST API)</li>
        </ul>
      </div>
    </div>
  );
}

export default ApiDataFetching;