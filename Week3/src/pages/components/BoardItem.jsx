const BoardItem = ({id , title, content, onDelete}) => {
    const handleDelete = () => {
        const shouldDelete = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
        if (shouldDelete) {
            onDelete(id);
        }
    };

  return (
    <article className="board-item">
        <div className="board-item__avatar">H</div>
        <div className="board-item__body">
            <div className="board-item__meta">
                <strong>익명</strong>
                <span>{new Date(id).toLocaleString()}</span>
            </div>
            <div className="board-item__main">
                <h3> {title}</h3>
                <p>{content}</p>
                <button type="button" className="board-item__delete" onClick={handleDelete}>
                    삭제
                </button>
            </div>
        </div>
    </article>
    );
};

export default BoardItem
