import React from 'react'
import { toast } from 'react-toastify';

const FORM_VALIDATION_TOAST_ID = 'board-form-validation';

const BoardForm = ({ onAdd }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.warning('제목과 내용을 입력해주세요.', {
                toastId: FORM_VALIDATION_TOAST_ID,
                autoClose: 1200,
            });
            return;
        }
    const newPost = {
        id: Date.now(),
        title,
        content,
    };

    onAdd(newPost);
    setTitle('');
    setContent('');

    };

    return (
        <div>
            <form className="board-composer" onSubmit={handleSubmit}>
                <div className="board-composer__head">
                    <span className="board-composer__avatar">H</span>
                    <div>
                        <h3>새 게시글 작성</h3>
                        <p>자유롭게 글을 작성해보세요!</p>
                    </div>
                </div>

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

                <div className="board-composer__actions">
                    <span>작성된 글은 게시판에 바로 반영됩니다.</span>
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    );
}

export default BoardForm
