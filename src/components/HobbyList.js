import React from 'react';

function HobbyList({ hobbies }) {
  return (
    <div className="hobby-list">
      <h4>Мои хобби:</h4>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

export default HobbyList;
