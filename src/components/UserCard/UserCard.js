import React, { useState } from 'react';
import styles from './UserCard.module.css';

function UserCard({ name, role, experience, skills, description, avatarColor }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.cardHeader}>
        <div 
          className={styles.avatar}
          style={{ backgroundColor: avatarColor }}
        >
          {getInitials(name)}
        </div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{name}</h3>
          <p className={styles.userRole}>{role}</p>
          <span className={styles.experience}>Опыт: {experience}</span>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.skills}>
          <h4>Навыки:</h4>
          <div className={styles.skillTags}>
            {skills.slice(0, isExpanded ? skills.length : 3).map((skill, index) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <button 
                className={styles.toggleButton}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Свернуть' : `+${skills.length - 3} ещё`}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <button className={styles.contactButton}>
          Написать сообщение
        </button>
        <button className={styles.detailsButton}>
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default UserCard;
