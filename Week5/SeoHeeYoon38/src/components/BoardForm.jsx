import React, { useState } from 'react';
/*이전 코드 업로드를 위한 주석*/
const BoardForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }
    const newPost = { id: Date.now(), title, content };
    addPost(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      <input 
        type="text" 
        placeholder="제목을 입력하세요" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ width: '100%', boxSizing: 'border-box', padding: '12px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', borderRadius: '4px' }} 
      />
      <textarea 
        placeholder="내용을 입력하세요" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        style={{ width: '100%', boxSizing: 'border-box', minHeight: '80px', padding: '12px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', borderRadius: '4px', resize: 'vertical' }} 
      />
      <button 
        type="submit" 
        style={{ width: '100%', boxSizing: 'border-box', padding: '12px', backgroundColor: '#555', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
      >
        추가하기
      </button>
    </form>
  );
};

export default BoardForm;