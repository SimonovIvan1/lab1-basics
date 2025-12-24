import React, { useState, useEffect } from 'react';
import './MultiStepForm.css';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    step2: {
      country: '',
      city: '',
      address: '',
      postalCode: ''
    },
    step3: {
      educationLevel: '',
      occupation: '',
      experience: '',
      skills: []
    }
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepTitles = [
    'Личная информация',
    'Адрес',
    'Образование и работа'
  ];

  const educationOptions = [
    'Среднее',
    'Среднее специальное',
    'Неоконченное высшее',
    'Высшее',
    'Магистратура',
    'Кандидат наук',
    'Доктор наук'
  ];

  const skillOptions = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'SQL',
    'Git',
    'TypeScript',
    'Docker',
    'AWS'
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch(stepNumber) {
      case 1:
        if (!formData.step1.firstName.trim()) {
          newErrors.firstName = 'Имя обязательно';
        }
        if (!formData.step1.lastName.trim()) {
          newErrors.lastName = 'Фамилия обязательна';
        }
        if (!formData.step1.email) {
          newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(formData.step1.email)) {
          newErrors.email = 'Email некорректен';
        }
        if (formData.step1.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.step1.phone)) {
          newErrors.phone = 'Некорректный номер телефона';
        }
        break;
        
      case 2:
        if (!formData.step2.country.trim()) {
          newErrors.country = 'Страна обязательна';
        }
        if (!formData.step2.city.trim()) {
          newErrors.city = 'Город обязателен';
        }
        break;
        
      case 3:
        if (!formData.step3.educationLevel) {
          newErrors.educationLevel = 'Уровень образования обязателен';
        }
        if (!formData.step3.occupation.trim()) {
          newErrors.occupation = 'Профессия обязательна';
        }
        break;
    }
    
    return newErrors;
  };

  const handleInputChange = (stepName, field, value) => {
    setFormData(prev => ({
      ...prev,
      [stepName]: {
        ...prev[stepName],
        [field]: value
      }
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const stepErrors = validateStep(step);
    setErrors(prev => ({ ...prev, ...stepErrors }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      step3: {
        ...prev.step3,
        skills: prev.step3.skills.includes(skill)
          ? prev.step3.skills.filter(s => s !== skill)
          : [...prev.step3.skills, skill]
      }
    }));
  };

  const nextStep = () => {
    const stepErrors = validateStep(step);
    
    if (Object.keys(stepErrors).length === 0) {
      setStep(prev => prev + 1);
      setErrors({});
      window.scrollTo(0, 0);
    } else {
      setErrors(stepErrors);
      Object.keys(stepErrors).forEach(field => {
        setTouched(prev => ({ ...prev, [field]: true }));
      });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrors({});
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = {
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3)
    };
    
    if (Object.keys(allErrors).length === 0) {
      setIsSubmitted(true);
      console.log('Форма отправлена:', formData);
      alert('Форма успешно отправлена!');
    } else {
      setErrors(allErrors);
      setStep(1);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step">
            <div className="form-group">
              <label>
                Имя*
                <input
                  type="text"
                  value={formData.step1.firstName}
                  onChange={(e) => handleInputChange('step1', 'firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  className={`form-input ${errors.firstName && touched.firstName ? 'error' : ''}`}
                  placeholder="Введите ваше имя"
                />
                {errors.firstName && touched.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </label>
              
              <label>
                Фамилия*
                <input
                  type="text"
                  value={formData.step1.lastName}
                  onChange={(e) => handleInputChange('step1', 'lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  className={`form-input ${errors.lastName && touched.lastName ? 'error' : ''}`}
                  placeholder="Введите вашу фамилию"
                />
                {errors.lastName && touched.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </label>
            </div>
            
            <div className="form-group">
              <label>
                Email*
                <input
                  type="email"
                  value={formData.step1.email}
                  onChange={(e) => handleInputChange('step1', 'email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                  placeholder="example@mail.com"
                />
                {errors.email && touched.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </label>
              
              <label>
                Телефон
                <input
                  type="tel"
                  value={formData.step1.phone}
                  onChange={(e) => handleInputChange('step1', 'phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && touched.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </label>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="form-step">
            <div className="form-group">
              <label>
                Страна*
                <input
                  type="text"
                  value={formData.step2.country}
                  onChange={(e) => handleInputChange('step2', 'country', e.target.value)}
                  onBlur={() => handleBlur('country')}
                  className={`form-input ${errors.country && touched.country ? 'error' : ''}`}
                  placeholder="Россия"
                />
                {errors.country && touched.country && (
                  <span className="error-message">{errors.country}</span>
                )}
              </label>
              
              <label>
                Город*
                <input
                  type="text"
                  value={formData.step2.city}
                  onChange={(e) => handleInputChange('step2', 'city', e.target.value)}
                  onBlur={() => handleBlur('city')}
                  className={`form-input ${errors.city && touched.city ? 'error' : ''}`}
                  placeholder="Москва"
                />
                {errors.city && touched.city && (
                  <span className="error-message">{errors.city}</span>
                )}
              </label>
            </div>
            
            <div className="form-group">
              <label>
                Адрес
                <input
                  type="text"
                  value={formData.step2.address}
                  onChange={(e) => handleInputChange('step2', 'address', e.target.value)}
                  className="form-input"
                  placeholder="ул. Примерная, д. 1"
                />
              </label>
              
              <label>
                Почтовый индекс
                <input
                  type="text"
                  value={formData.step2.postalCode}
                  onChange={(e) => handleInputChange('step2', 'postalCode', e.target.value)}
                  className="form-input"
                  placeholder="123456"
                />
              </label>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="form-step">
            <div className="form-group">
              <label>
                Уровень образования*
                <select
                  value={formData.step3.educationLevel}
                  onChange={(e) => handleInputChange('step3', 'educationLevel', e.target.value)}
                  onBlur={() => handleBlur('educationLevel')}
                  className={`form-select ${errors.educationLevel && touched.educationLevel ? 'error' : ''}`}
                >
                  <option value="">Выберите уровень</option>
                  {educationOptions.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.educationLevel && touched.educationLevel && (
                  <span className="error-message">{errors.educationLevel}</span>
                )}
              </label>
              
              <label>
                Профессия*
                <input
                  type="text"
                  value={formData.step3.occupation}
                  onChange={(e) => handleInputChange('step3', 'occupation', e.target.value)}
                  onBlur={() => handleBlur('occupation')}
                  className={`form-input ${errors.occupation && touched.occupation ? 'error' : ''}`}
                  placeholder="Frontend разработчик"
                />
                {errors.occupation && touched.occupation && (
                  <span className="error-message">{errors.occupation}</span>
                )}
              </label>
            </div>
            
            <label>
              Опыт работы (лет)
              <input
                type="number"
                min="0"
                max="50"
                value={formData.step3.experience}
                onChange={(e) => handleInputChange('step3', 'experience', e.target.value)}
                className="form-input"
                placeholder="3"
              />
            </label>
            
            <div className="skills-section">
              <label>Навыки:</label>
              <div className="skills-grid">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    className={`skill-chip ${formData.step3.skills.includes(skill) ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h3>✅ Форма успешно отправлена!</h3>
        <p>Ваши данные:</p>
        <pre className="submitted-data">
          {JSON.stringify(formData, null, 2)}
        </pre>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            setFormData({
              step1: { firstName: '', lastName: '', email: '', phone: '' },
              step2: { country: '', city: '', address: '', postalCode: '' },
              step3: { educationLevel: '', occupation: '', experience: '', skills: [] }
            });
          }}
          className="btn-reset"
        >
          Заполнить новую форму
        </button>
      </div>
    );
  }

  const progressPercentage = ((step - 1) / (stepTitles.length - 1)) * 100;

  return (
    <div className="multi-step-form">
      <h3>Многошаговая форма</h3>
      
      <div className="step-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="step-titles">
          {stepTitles.map((title, index) => (
            <div 
              key={index}
              className={`step-title ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'completed' : ''}`}
            >
              <span className="step-number">{index + 1}</span>
              {title}
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="form-container">
        {renderStep()}
        
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="btn-prev">
              ← Назад
            </button>
          )}
          
          {step < stepTitles.length ? (
            <button type="button" onClick={nextStep} className="btn-next">
              Далее →
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              Отправить форму
            </button>
          )}
        </div>
        
        <div className="form-progress">
          Шаг {step} из {stepTitles.length}
          <div className="completion-percentage">
            {Math.round(progressPercentage)}% заполнено
          </div>
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;