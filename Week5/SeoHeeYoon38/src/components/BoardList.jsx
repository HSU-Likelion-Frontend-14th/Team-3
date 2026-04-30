import React from 'react';
/*코드 전체 업로드를 위한 주석*/
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