import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Signup.scss';

const isEmailValid = (value) => value.includes('@');

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const signupErrors = {
    username: form.username.length === 0 ? '아이디를 입력해주세요.' : '',
    email:
      form.email.length === 0
        ? '이메일을 입력해주세요.'
        : !isEmailValid(form.email)
          ? '이메일 형식이 올바르지 않습니다. (@ 포함)'
          : '',
    password:
      form.password.length === 0
        ? '비밀번호를 입력해주세요.'
        : form.password.length < 8
          ? '비밀번호는 8자 이상이어야 합니다.'
          : '',
    confirmPassword:
      form.confirmPassword.length === 0
        ? '비밀번호 확인을 입력해주세요.'
        : form.password !== form.confirmPassword
          ? '비밀번호가 일치하지 않습니다.'
          : '',
  };

  const isSignupValid =
    !signupErrors.username && !signupErrors.email && !signupErrors.password && !signupErrors.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!isSignupValid) {
      setSubmitAttempted(true);
      return;
    }

    console.log('회원가입 데이터:', form);
    navigate('/login');
  };

  return (
    <section className="signup-page">
      <h2>👤 회원가입</h2>
      <form onSubmit={handleSignup} className="signup-page__form">
        <label className="signup-page__field">
          <span>아이디</span>
          <input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
            value={form.username}
            onChange={handleChange}
          />
          {(form.username.length > 0 || submitAttempted) && signupErrors.username && (
            <p className="signup-page__error">{signupErrors.username}</p>
          )}
        </label>

        <label className="signup-page__field">
          <span>이메일</span>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={handleChange}
          />
          {(form.email.length > 0 || submitAttempted) && signupErrors.email && (
            <p className="signup-page__error">{signupErrors.email}</p>
          )}
        </label>

        <label className="signup-page__field">
          <span>비밀번호</span>
          <div className="signup-page__password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
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
          {(form.password.length > 0 || submitAttempted) && signupErrors.password && (
            <p className="signup-page__error">{signupErrors.password}</p>
          )}
        </label>

        <label className="signup-page__field">
          <span>비밀번호 확인</span>
          <div className="signup-page__password-wrap">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.confirmPassword}
              onChange={handleChange}
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
          {(form.confirmPassword.length > 0 || submitAttempted) && signupErrors.confirmPassword && (
            <p className="signup-page__error">{signupErrors.confirmPassword}</p>
          )}
        </label>

        {submitAttempted && !isSignupValid && (
          <p className="signup-page__error signup-page__error--form">회원가입 실패: 입력값을 다시 확인해주세요.</p>
        )}

        <button type="submit">가입하기</button>
      </form>
    </section>
  );
}

export default Signup;
