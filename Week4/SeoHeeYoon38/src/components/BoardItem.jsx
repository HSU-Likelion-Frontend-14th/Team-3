import React, { useState } from 'react';

const BoardItem = ({ post, deletePost, updatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const handleSave = () => {
    updatePost(post.id, editContent);
    setIsEditing(false);
  };

  return(
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #444' }}>
      {isEditing ? (
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#ddd' }}>{post.title}</h3>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{ width: '100%', minHeight: '60px', padding: '8px', backgroundColor: '#2c2c2e', color: '#fff', border: '1px solid #555', boxSizing: 'border-box' }}
          />
          <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
            <button onClick={handleSave} style={{ backgroundColor: '#555', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>저장</button>
            <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>취소</button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#ddd' }}>{post.title}</h3>
            <p style={{ margin: '0', fontSize: '13px', color: '#777' }}>{post.content}</p>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >수정</button>
            <button 
              onClick={() => deletePost(post.id)}
              style={{ backgroundColor: '#ff5252', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >삭제</button>
          </div>
        </>
      )}
    </li>
  )
}

export default BoardItem;