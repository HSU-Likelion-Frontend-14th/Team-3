import React from 'react';

const BoardList = ({ children }) => {
  return (
    <ul style={{ 
      listStyle: 'none', 
      padding: 0, 
      margin: 0, 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      {children}
    </ul>
  );
};

export default BoardList;