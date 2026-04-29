import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Signup.scss';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitted } } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const onSubmit = (data) => {
    sessionStorage.setItem('signupUser', JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }));
    navigate('/login');
  };

  return (
    <section className="signup-page">
      <h2>👤 회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-page__form">

        <label className="signup-page__field">
          <span>아이디</span>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            {...register('username', { required: '아이디를 입력해주세요.' })}
          />
          {errors.username && <p className="signup-page__error">{errors.username.message}</p>}
        </label>

        <label className="signup-page__field">
          <span>이메일</span>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: { value: /@/, message: '이메일 형식이 올바르지 않습니다. (@ 포함)' },
            })}
          />
          {errors.email && <p className="signup-page__error">{errors.email.message}</p>}
        </label>

        <label className="signup-page__field">
          <span>비밀번호</span>
          <div className="signup-page__password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력하세요"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
              })}
            />
            <button
              type="button"
              className="signup-page__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          </div>
          {errors.password && <p className="signup-page__error">{errors.password.message}</p>}
        </label>

        <label className="signup-page__field">
          <span>비밀번호 확인</span>
          <div className="signup-page__password-wrap">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력하세요"
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: (v) => v === password || '비밀번호가 일치하지 않습니다.',
              })}
            />
            <button
              type="button"
              className="signup-page__toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              {showConfirmPassword ? '숨기기' : '보기'}
            </button>
          </div>
          {errors.confirmPassword && <p className="signup-page__error">{errors.confirmPassword.message}</p>}
        </label>

        {isSubmitted && Object.keys(errors).length > 0 && (
          <p className="signup-page__error signup-page__error--form">회원가입 실패: 입력값을 다시 확인해주세요.</p>
        )}

        <button type="submit">가입하기</button>
      </form>
    </section>
  );
}

export default Signup;
