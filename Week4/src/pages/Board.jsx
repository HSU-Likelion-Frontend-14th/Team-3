import { useState } from 'react';
import BoardList from './components/BoardList';
import BoardForm from './components/BoardForm';
import '../styles/pages/Board.scss';


function Board() {
  // 💡 실습 1. 여기에 가짜 데이터 상태(useState)를 만들게 됩니다.
  const [posts, setPosts] = useState([]);

 
  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleEditPost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };




  return (
    <section className="board-page">
      <h2>게시판</h2>
      <BoardForm onAdd={handleAddPost} />
      <BoardList posts={posts} onDelete={handleDeletePost} onUpdate={handleEditPost} />
    </section>
  );
}

export default Board;
