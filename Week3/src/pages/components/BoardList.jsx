
import BoardItem from './BoardItem';

const BoardList = ({posts, onDelete}) => {
    if (posts.length === 0) {
        return (
        <div className= "board-page__box board-list">
            <h3> 게시글 목록</h3>
            <ul>
                <li>아직 작성된 글이 없습니다.</li>
            </ul>
        </div>
        );
    }


  return (
    <div className= "board-page__box board-list">
        <h3> 게시글 목록</h3>
        {posts.map((post) => (
            <BoardItem 
            key={post.id} 
            id={post.id} 
            title={post.title} 
            content={post.content} 
            onDelete={onDelete} />
        ))}   
    </div>
  );
};

export default BoardList
