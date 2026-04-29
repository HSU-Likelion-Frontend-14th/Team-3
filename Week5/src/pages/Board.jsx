import { useState } from "react";
import BoardList from "./components/BoardList";
import BoardForm from "./components/BoardForm";
import "../styles/pages/Board.scss";

function Board() {
  // 💡 실습 1. 여기에 가짜 데이터 상태(useState)를 만들게 됩니다.
  // useState 초기값을 localStorage에서 읽기
  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("posts") || "[]");
  });

  const persistPosts = (nextPosts) => {
    localStorage.setItem("posts", JSON.stringify(nextPosts));
    return nextPosts;
  };

  // 삭제할 때도 localStorage 동기화
  const handleDeletePost = (postId) => {
    setPosts((prev) => {
      const updated = prev.filter((p) => p.id !== postId);
      return persistPosts(updated);
    });
  };

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => {
      const updated = [newPost, ...prevPosts];
      return persistPosts(updated);
    });
  };

  const handleEditPost = (postId, updatedPost) => {
    setPosts((prev) => {
      const updatedPosts = prev.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post,
      );

      return persistPosts(updatedPosts);
    });
  };

  return (
    <section className="board-page">
      <h2>게시판</h2>
      <BoardForm onAdd={handleAddPost} />
      <BoardList
        posts={posts}
        onDelete={handleDeletePost}
        onUpdate={handleEditPost}
      />
    </section>
  );
}

export default Board;
