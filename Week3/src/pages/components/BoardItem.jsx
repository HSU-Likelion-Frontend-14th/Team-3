import { toast } from 'react-toastify';

const BoardItem = ({id , title, content, onDelete}) => {
    const handleDelete = () => {
        toast(
            ({ closeToast }) => (
                <div className="board-toast__content">
                    <p className="board-toast__title">정말 이 게시글을 삭제하시겠습니까?</p>
                    <div className="board-toast__actions">
                        <button
                            type="button"
                            className="board-toast__confirm"
                            onClick={() => {
                                onDelete(id);
                                closeToast();
                            }}
                        >
                            삭제
                        </button>
                        <button type="button" className="board-toast__cancel" onClick={closeToast}>
                            취소
                        </button>
                    </div>
                </div>
            ),
            {
                className: 'board-toast',
                autoClose: false,
                closeOnClick: false,
            },
        );
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
