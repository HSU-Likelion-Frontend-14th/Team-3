import { useState } from "react";
import BoardForm from "../components/BoardForm";
import BoardList from "../components/BoardList";
import BoardItem from "../components/BoardItem";

function Board() {
  // 💡 실습 1. 여기에 가짜 데이터 상태(useState)를 만들게 됩니다.
  const [posts, setPosts] = useState([
    { id: 1, title: "첫번째 글", content: "안녕하세요." },
    { id: 2, title: "두번째 글", content: "안녕하세요." }
  ]);
  const addPost=(newPost)=>{
    setPosts([...posts, newPost]);
  }
  const deletePost=(targetId)=>{
    const filterPost= posts.filter((post)=>post.id !== targetId)
    setPosts(filterPost);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 자유 게시판</h2>
      {/* 💡 실습 2. 입력 폼 컴포넌트(BoardForm)가 들어갈 자리 */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>게시글 작성 영역 (BoardForm)</h3>
        <BoardForm addPost={addPost}/>
      </div>

      {/* 💡 실습 3. 게시글 목록 컴포넌트(BoardList & BoardItem)가 들어갈 자리 */}
      <div style={{ padding: '10px', border: '1px solid #ccc' }}>
        <h3>게시글 목록 영역 (BoardList)</h3>
        {posts.length === 0 ? (
          <ul>
            <li>아직 작성된 글이 없습니다.</li>
          </ul>
        ) : (
          <BoardList>
            {posts.map((post) => (
              <BoardItem key={post.id} post={post} deletePost={deletePost}/>
            ))}
          </BoardList>
        )}
      </div>
    </div>
  );
}

export default Board;