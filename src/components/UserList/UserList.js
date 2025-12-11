import React, { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.css';

function UserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [sortBy, setSortBy] = useState('name');
  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Функция сортировки
  const getSortedUsers = () => {
    const usersCopy = [...users];
    
    switch(sortBy) {
      case 'name':
        return usersCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'experience':
        return usersCopy.sort((a, b) => {
          const expA = parseInt(a.experience);
          const expB = parseInt(b.experience);
          return expB - expA;
        });
      case 'rating':
        return usersCopy.sort((a, b) => b.rating - a.rating);
      default:
        return usersCopy;
    }
  };

  // Функция фильтрации
  const getFilteredUsers = () => {
    let filtered = getSortedUsers();
    
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => 
        user.role.toLowerCase().includes(filterRole.toLowerCase())
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  // Получаем уникальные роли для фильтра
  const uniqueRoles = ['all', ...new Set(initialUsers.map(user => user.role))];

  const handleReset = () => {
    setUsers(initialUsers);
    setSortBy('name');
    setFilterRole('all');
    setSearchTerm('');
  };

  return (
    <div className={styles.userList}>
      <div className={styles.controls}>
        <h3>Управление списком пользователей</h3>
        
        <div className={styles.filterGroup}>
          <label htmlFor="search">Поиск:</label>
          <input
            id="search"
            type="text"
            placeholder="Имя или навык..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="roleFilter">Фильтр по роли:</label>
          <select
            id="roleFilter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={styles.select}
          >
            {uniqueRoles.map((role, index) => (
              <option key={index} value={role}>
                {role === 'all' ? 'Все роли' : role}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Сортировка:</label>
          <div className={styles.sortButtons}>
            <button
              className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
              onClick={() => setSortBy('name')}
            >
              По имени
            </button>
            <button
              className={`${styles.sortButton} ${sortBy === 'experience' ? styles.active : ''}`}
              onClick={() => setSortBy('experience')}
            >
              По опыту
            </button>
            <button
              className={`${styles.sortButton} ${sortBy === 'rating' ? styles.active : ''}`}
              onClick={() => setSortBy('rating')}
            >
              По рейтингу
            </button>
          </div>
        </div>

        <button onClick={handleReset} className={styles.resetButton}>
          Сбросить фильтры
        </button>
      </div>

      <div className={styles.stats}>
        <p>Найдено пользователей: {filteredUsers.length} из {initialUsers.length}</p>
      </div>

      {filteredUsers.length === 0 ? (
        <div className={styles.noResults}>
          <p>Пользователи не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      ) : (
        <div className={styles.listContainer}>
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              name={user.name}
              role={user.role}
              experience={user.experience}
              skills={user.skills}
              description={user.description}
              avatarColor={user.avatarColor}
              isOnline={user.isOnline}
              rating={user.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;