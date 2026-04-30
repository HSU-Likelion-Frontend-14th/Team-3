import { useState } from "react";
import BoardForm from "../components/BoardForm";
import BoardList from "../components/BoardList";
import BoardItem from "../components/BoardItem";

function Board() {
  const [posts, setPosts] = useState([
    { id: 1, title: "첫 번째 글", content: "안녕하세요!" },
    { id: 2, title: "두 번째 글", content: "안녕하세요!" }
  ]);

  const addPost = (newPost) => setPosts([...posts, newPost]);
  const deletePost = (targetId) => setPosts(posts.filter((post) => post.id !== targetId));
  const updatePost = (targetId, nextContent) => {
    setPosts(posts.map((item) => item.id === targetId ? { ...item, content: nextContent } : item));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>자유 게시판</h2>
      
      {/* 게시글 작성 영역 박스 */}
      <div style={{ border: '1px solid #444', padding: '25px', marginBottom: '20px', backgroundColor: '#1a1a1c' }}>
        <h3 style={{ textAlign: 'center', fontSize: '18px', color: '#ccc', marginTop: 0, marginBottom: '20px' }}>
          게시글 작성 영역 (BoardForm)
        </h3>
        <BoardForm addPost={addPost}/>
      </div>

      {/* 게시글 목록 영역 박스 */}
      <div style={{ border: '1px solid #444', padding: '25px', backgroundColor: '#1a1a1c' }}>
        <h3 style={{ textAlign: 'center', fontSize: '18px', color: '#ccc', marginTop: 0, marginBottom: '20px' }}>
          게시글 목록 영역 (BoardList)
        </h3>
        {posts.length === 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ textAlign: 'center', color: '#888' }}>아직 작성된 글이 없습니다.</li>
          </ul>
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