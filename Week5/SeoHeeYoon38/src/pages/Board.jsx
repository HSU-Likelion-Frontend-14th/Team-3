import { useState, useEffect } from "react";
import BoardForm from "../components/BoardForm";
import BoardList from "../components/BoardList";
import BoardItem from "../components/BoardItem";

function Board() {
  // 1. 초기 로드 시 localStorage에서 데이터 불러오기
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("session3-board-posts");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("session3-board-posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => setPosts([...posts, newPost]);
  const deletePost = (targetId) => setPosts(posts.filter((post) => post.id !== targetId));
  const updatePost = (targetId, nextContent) => {
    setPosts(posts.map((item) => item.id === targetId ? { ...item, content: nextContent } : item));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>자유 게시판</h2>
      
      <div style={{ border: '1px solid #444', padding: '25px', marginBottom: '20px', backgroundColor: '#1a1a1c' }}>
        <h3 style={{ textAlign: 'center', fontSize: '18px', color: '#ccc', marginTop: 0, marginBottom: '20px' }}>게시글 작성 영역</h3>
        <BoardForm addPost={addPost}/>
      </div>

      <div style={{ border: '1px solid #444', padding: '25px', backgroundColor: '#1a1a1c' }}>
        <h3 style={{ textAlign: 'center', fontSize: '18px', color: '#ccc', marginTop: 0, marginBottom: '20px' }}>게시글 목록 영역</h3>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>아직 작성된 글이 없습니다.</p>
        ) : (
          <BoardList>
            {posts.map((post) => (
              <BoardItem key={post.id} post={post} deletePost={deletePost} updatePost={updatePost}/>
            ))}
          </BoardList>
        )}
      </div>
    </div>
  );
}

export default Board;