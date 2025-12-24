import React, { useState } from 'react';
import './DynamicFieldsForm.css';

function DynamicFieldsForm() {
  const [formData, setFormData] = useState({
    title: '',
    experience: [
      { id: 1, company: '', position: '', years: '' }
    ],
    education: [
      { id: 1, institution: '', degree: '', year: '' }
    ],
    skills: [{ id: 1, name: '', level: '3' }],
    references: [{ id: 1, name: '', contact: '' }]
  });

  const [errors, setErrors] = useState({});

  const addField = (fieldType) => {
    const newId = Date.now();
    let newField;

    switch(fieldType) {
      case 'experience':
        newField = { id: newId, company: '', position: '', years: '' };
        setFormData(prev => ({
          ...prev,
          experience: [...prev.experience, newField]
        }));
        break;
        
      case 'education':
        newField = { id: newId, institution: '', degree: '', year: '' };
        setFormData(prev => ({
          ...prev,
          education: [...prev.education, newField]
        }));
        break;
        
      case 'skills':
        newField = { id: newId, name: '', level: '3' };
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newField]
        }));
        break;
        
      case 'references':
        newField = { id: newId, name: '', contact: '' };
        setFormData(prev => ({
          ...prev,
          references: [...prev.references, newField]
        }));
        break;
    }
  };

  const removeField = (fieldType, id) => {
    if (window.confirm('Удалить это поле?')) {
      setFormData(prev => ({
        ...prev,
        [fieldType]: prev[fieldType].filter(item => item.id !== id)
      }));
    }
  };

  const handleFieldChange = (fieldType, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldType]: prev[fieldType].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));

    if (errors[`${fieldType}-${id}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${fieldType}-${id}-${field}`];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }
    
    formData.experience.forEach((exp, index) => {
      if (!exp.company.trim()) {
        newErrors[`experience-${exp.id}-company`] = 'Компания обязательна';
      }
      if (!exp.position.trim()) {
        newErrors[`experience-${exp.id}-position`] = 'Должность обязательна';
      }
    });
    
    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        newErrors[`education-${edu.id}-institution`] = 'Учреждение обязательно';
      }
    });
    
    formData.skills.forEach((skill, index) => {
      if (!skill.name.trim()) {
        newErrors[`skills-${skill.id}-name`] = 'Навык обязателен';
      }
    });
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      alert('Резюме успешно сохранено!');
      console.log('Данные формы:', formData);
    } else {
      setErrors(formErrors);
      alert('Пожалуйста, заполните все обязательные поля');
    }
  };

  const resetForm = () => {
    if (window.confirm('Вы уверены? Все данные будут удалены.')) {
      setFormData({
        title: '',
        experience: [{ id: 1, company: '', position: '', years: '' }],
        education: [{ id: 1, institution: '', degree: '', year: '' }],
        skills: [{ id: 1, name: '', level: '3' }],
        references: [{ id: 1, name: '', contact: '' }]
      });
      setErrors({});
    }
  };

  const renderLevelStars = (level) => {
    return '★'.repeat(level) + '☆'.repeat(5 - level);
  };

  return (
    <div className="dynamic-fields-form">
      <h3>📝 Динамическая форма резюме</h3>
      
      <form onSubmit={handleSubmit} className="dynamic-form">
        <div className="form-section">
          <label>
            Название резюме*
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Например: Frontend разработчик"
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </label>
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <h4>Опыт работы</h4>
            <button type="button" onClick={() => addField('experience')} className="btn-add-field">
              + Добавить место работы
            </button>
          </div>
          
          {formData.experience.map((exp, index) => (
            <div key={exp.id} className="dynamic-field-group">
              <div className="field-row">
                <label>
                  Компания*
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleFieldChange('experience', exp.id, 'company', e.target.value)}
                    placeholder="Название компании"
                    className={`form-input ${errors[`experience-${exp.id}-company`] ? 'error' : ''}`}
                  />
                  {errors[`experience-${exp.id}-company`] && (
                    <span className="error-message">{errors[`experience-${exp.id}-company`]}</span>
                  )}
                </label>
                
                <label>
                  Должность*
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleFieldChange('experience', exp.id, 'position', e.target.value)}
                    placeholder="Ваша должность"
                    className={`form-input ${errors[`experience-${exp.id}-position`] ? 'error' : ''}`}
                  />
                  {errors[`experience-${exp.id}-position`] && (
                    <span className="error-message">{errors[`experience-${exp.id}-position`]}</span>
                  )}
                </label>
                
                <label>
                  Годы
                  <input
                    type="text"
                    value={exp.years}
                    onChange={(e) => handleFieldChange('experience', exp.id, 'years', e.target.value)}
                    placeholder="2020-2023"
                    className="form-input"
                  />
                </label>
              </div>
              
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('experience', exp.id)}
                  className="btn-remove-field"
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <h4>Образование</h4>
            <button type="button" onClick={() => addField('education')} className="btn-add-field">
              + Добавить образование
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="dynamic-field-group">
              <div className="field-row">
                <label>
                  Учебное заведение*
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleFieldChange('education', edu.id, 'institution', e.target.value)}
                    placeholder="Университет или колледж"
                    className={`form-input ${errors[`education-${edu.id}-institution`] ? 'error' : ''}`}
                  />
                  {errors[`education-${edu.id}-institution`] && (
                    <span className="error-message">{errors[`education-${edu.id}-institution`]}</span>
                  )}
                </label>
                
                <label>
                  Степень
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleFieldChange('education', edu.id, 'degree', e.target.value)}
                    placeholder="Бакалавр, Магистр и т.д."
                    className="form-input"
                  />
                </label>
                
                <label>
                  Год окончания
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleFieldChange('education', edu.id, 'year', e.target.value)}
                    placeholder="2022"
                    className="form-input"
                  />
                </label>
              </div>
              
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('education', edu.id)}
                  className="btn-remove-field"
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <h4>Навыки</h4>
            <button type="button" onClick={() => addField('skills')} className="btn-add-field">
              + Добавить навык
            </button>
          </div>
          
          {formData.skills.map((skill, index) => (
            <div key={skill.id} className="dynamic-field-group">
              <div className="field-row">
                <label>
                  Название навыка*
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleFieldChange('skills', skill.id, 'name', e.target.value)}
                    placeholder="Например: React, JavaScript"
                    className={`form-input ${errors[`skills-${skill.id}-name`] ? 'error' : ''}`}
                  />
                  {errors[`skills-${skill.id}-name`] && (
                    <span className="error-message">{errors[`skills-${skill.id}-name`]}</span>
                  )}
                </label>
                
                <label>
                  Уровень владения
                  <div className="skill-level">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={skill.level}
                      onChange={(e) => handleFieldChange('skills', skill.id, 'level', e.target.value)}
                      className="level-slider"
                    />
                    <span className="level-stars">{renderLevelStars(parseInt(skill.level))}</span>
                    <span className="level-text">
                      {skill.level === '1' ? 'Начальный' :
                       skill.level === '2' ? 'Базовый' :
                       skill.level === '3' ? 'Средний' :
                       skill.level === '4' ? 'Продвинутый' : 'Эксперт'}
                    </span>
                  </div>
                </label>
              </div>
              
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('skills', skill.id)}
                  className="btn-remove-field"
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="dynamic-section">
          <div className="section-header">
            <h4>Рекомендации</h4>
            <button type="button" onClick={() => addField('references')} className="btn-add-field">
              + Добавить рекомендацию
            </button>
          </div>
          
          {formData.references.map((ref, index) => (
            <div key={ref.id} className="dynamic-field-group">
              <div className="field-row">
                <label>
                  Имя
                  <input
                    type="text"
                    value={ref.name}
                    onChange={(e) => handleFieldChange('references', ref.id, 'name', e.target.value)}
                    placeholder="Имя рекомендателя"
                    className="form-input"
                  />
                </label>
                
                <label>
                  Контакты
                  <input
                    type="text"
                    value={ref.contact}
                    onChange={(e) => handleFieldChange('references', ref.id, 'contact', e.target.value)}
                    placeholder="Email или телефон"
                    className="form-input"
                  />
                </label>
              </div>
              
              {formData.references.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField('references', ref.id)}
                  className="btn-remove-field"
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={resetForm} className="btn-reset">
            Сбросить форму
          </button>
          <button type="submit" className="btn-submit">
            Сохранить резюме
          </button>
        </div>
      </form>

      <div className="form-preview">
        <h4>Предпросмотр данных:</h4>
        <pre className="preview-data">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default DynamicFieldsForm;