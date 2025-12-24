import React, { useState } from 'react';
import './ComplexStateObject.css';

function ComplexStateObject() {
  const [userProfile, setUserProfile] = useState({
    personalInfo: {
      name: '',
      age: '',
      email: '',
      phone: ''
    },
    address: {
      country: 'Россия',
      city: '',
      street: '',
      building: '',
      apartment: ''
    },
    preferences: {
      theme: 'light',
      notifications: true,
      newsletter: false,
      language: 'ru'
    },
    education: [
      { id: 1, institution: '', year: '', degree: '' }
    ]
  });

  const updatePersonalInfo = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateAddress = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const togglePreference = (field) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: !prev.preferences[field]
      }
    }));
  };

  const addEducation = () => {
    const newId = userProfile.education.length + 1;
    setUserProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: newId, institution: '', year: '', degree: '' }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setUserProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  return (
    <div className="complex-state">
      <h3>Сложный объект состояния: Профиль пользователя</h3>
      
      <div className="state-section">
        <h4>Личная информация</h4>
        <div className="form-group">
          <input 
            value={userProfile.personalInfo.name}
            onChange={(e) => updatePersonalInfo('name', e.target.value)}
            placeholder="Имя"
            className="form-input"
          />
          <input 
            value={userProfile.personalInfo.age}
            onChange={(e) => updatePersonalInfo('age', e.target.value)}
            placeholder="Возраст"
            type="number"
            className="form-input"
          />
          <input 
            value={userProfile.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="Email"
            type="email"
            className="form-input"
          />
        </div>
      </div>

      <div className="state-section">
        <h4>Адрес</h4>
        <div className="form-group">
          <input 
            value={userProfile.address.city}
            onChange={(e) => updateAddress('city', e.target.value)}
            placeholder="Город"
            className="form-input"
          />
          <input 
            value={userProfile.address.street}
            onChange={(e) => updateAddress('street', e.target.value)}
            placeholder="Улица"
            className="form-input"
          />
          <input 
            value={userProfile.address.building}
            onChange={(e) => updateAddress('building', e.target.value)}
            placeholder="Дом"
            className="form-input"
          />
        </div>
      </div>

      <div className="state-section">
        <h4>Настройки</h4>
        <div className="preferences">
          <label className="preference-item">
            <input 
              type="checkbox"
              checked={userProfile.preferences.notifications}
              onChange={() => togglePreference('notifications')}
            />
            Уведомления
          </label>
          <label className="preference-item">
            <input 
              type="checkbox"
              checked={userProfile.preferences.newsletter}
              onChange={() => togglePreference('newsletter')}
            />
            Рассылка
          </label>
          <select 
            value={userProfile.preferences.theme}
            onChange={(e) => setUserProfile(prev => ({
              ...prev,
              preferences: { ...prev.preferences, theme: e.target.value }
            }))}
            className="form-select"
          >
            <option value="light">Светлая тема</option>
            <option value="dark">Темная тема</option>
            <option value="auto">Авто</option>
          </select>
        </div>
      </div>

      <div className="state-section">
        <h4>Образование</h4>
        {userProfile.education.map((edu) => (
          <div key={edu.id} className="education-item">
            <input 
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
              placeholder="Учебное заведение"
              className="form-input"
            />
            <input 
              value={edu.year}
              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
              placeholder="Год окончания"
              className="form-input"
            />
            <input 
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              placeholder="Степень"
              className="form-input"
            />
          </div>
        ))}
        <button onClick={addEducation} className="btn-add">
          + Добавить образование
        </button>
      </div>

      <div className="state-preview">
        <h4>Предпросмотр состояния:</h4>
        <pre className="preview-code">
          {JSON.stringify(userProfile, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ComplexStateObject;