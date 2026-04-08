import React from 'react';

const BoardItem = ({ post, deletePost }) => {
  return(
    <li style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 0', 
      borderBottom: '1px solid #444' // 사진의 얇은 밑줄
    }}>
      <div>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#ddd' }}>
          {post.title}
        </h3>
        <p style={{ margin: '0', fontSize: '13px', color: '#777' }}>
          {post.content}
        </p>
      </div>
      
      {/* 🚨 그토록 찾으시던 빨간색 삭제 버튼! */}
      <button 
        onClick={() => deletePost(post.id)}
        style={{
          backgroundColor: '#ff5252', 
          color: '#fff',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        삭제
      </button>
    </li>
  )
}

export default BoardItem;