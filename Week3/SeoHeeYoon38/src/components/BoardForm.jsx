import React, { useState } from 'react';

const BoardForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요!');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content
    };

    addPost(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">추가하기</button>
    </form>
  );
};

export default BoardForm; 