import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const DELETE_SUCCESS_TOAST_ID = 'board-delete-success';

let activeConfirmToastId = null;

const BoardItem = ({id , title, content, onDelete}) => {
    const [showDeleteLockNotice, setShowDeleteLockNotice] = useState(false);
    const noticeTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (noticeTimerRef.current) {
                clearTimeout(noticeTimerRef.current);
            }
        };
    }, []);

    const showInlineDeleteLockNotice = () => {
        setShowDeleteLockNotice(true);

        if (noticeTimerRef.current) {
            clearTimeout(noticeTimerRef.current);
        }

        noticeTimerRef.current = setTimeout(() => {
            setShowDeleteLockNotice(false);
            noticeTimerRef.current = null;
        }, 1400);
    };

    const handleDelete = () => {
        const confirmToastId = `board-delete-confirm-${id}`;

        if (
            activeConfirmToastId &&
            toast.isActive(activeConfirmToastId) &&
            activeConfirmToastId !== confirmToastId
        ) {
            showInlineDeleteLockNotice();
            return;
        }

        if (toast.isActive(confirmToastId)) {
            return;
        }

        toast.dismiss(DELETE_SUCCESS_TOAST_ID);
        activeConfirmToastId = confirmToastId;

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
                                toast.success('게시글이 삭제되었습니다.', {
                                    toastId: DELETE_SUCCESS_TOAST_ID,
                                    autoClose: 1000,
                                });
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
                toastId: confirmToastId,
                className: 'board-toast',
                autoClose: false,
                closeOnClick: false,
                onClose: () => {
                    if (activeConfirmToastId === confirmToastId) {
                        activeConfirmToastId = null;
                    }
                },
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
                <div className="board-item__delete-wrap">
                    {showDeleteLockNotice ? (
                        <div className="board-item__inline-warning" role="status" aria-live="polite">
                            이미 삭제 확인이 진행 중입니다. 현재 작업을 먼저 완료해 주세요.
                        </div>
                    ) : null}
                    <button type="button" className="board-item__delete" onClick={handleDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    </article>
    );
};

export default BoardItem
