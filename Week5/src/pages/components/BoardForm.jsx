import { useForm } from 'react-hook-form';

const BoardForm = ({ onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    const newPost = { id: Date.now(), ...data };
    onAdd(newPost);
    reset();
  };

  return (
    <form className="board-composer" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        {...register('title', { required: '제목을 입력해주세요.' })}
      />
      {errors.title && <p className="board-composer__error">{errors.title.message}</p>}

      <textarea
        placeholder="내용을 입력하세요"
        {...register('content', { required: '내용을 입력해주세요.' })}
      />
      {errors.content && <p className="board-composer__error">{errors.content.message}</p>}

      <button type="submit">등록</button>
    </form>
  );
};

export default BoardForm;
