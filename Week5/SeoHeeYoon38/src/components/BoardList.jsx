import React from 'react';
/*이전 코드 업로드를 위한 주석*/
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