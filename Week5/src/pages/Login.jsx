import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/Login.scss';

const isEmailValid = (value) => value.includes('@');

const readSignupUser = () => {
  try {
    const rawUser = sessionStorage.getItem('signupUser');
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
};

function Login() {
  const navigate = useNavigate();
  const savedUser = readSignupUser();
  const [form, setForm] = useState({
    email: savedUser?.email ?? '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [authError, setAuthError] = useState('');

  const loginErrors = {
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
  };

  const isLoginValid = !loginErrors.email && !loginErrors.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (authError) {
      setAuthError('');
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isLoginValid) {
      setSubmitAttempted(true);
      setAuthError('');
      return;
    }

    if (!savedUser) {
      setSubmitAttempted(true);
      setAuthError('회원가입 정보가 없습니다. 먼저 회원가입을 완료해주세요.');
      return;
    }

    if (savedUser.email !== form.email || savedUser.password !== form.password) {
      setSubmitAttempted(true);
      setAuthError('저장된 회원정보와 일치하지 않습니다.');
      return;
    }

    navigate('/');
  };

  return (
    <section className="login-page">
      <h2> 로그인</h2>
      <form onSubmit={handleLogin} className="login-page__form">
        <label className="login-page__field">
          <span>이메일</span>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={handleChange}
          />
          {(form.email.length > 0 || submitAttempted) && loginErrors.email && (
            <p className="login-page__error">{loginErrors.email}</p>
          )}
        </label>

        <label className="login-page__field">
          <span>비밀번호</span>
          <div className="login-page__password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="login-page__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
            >
              {showPassword ? '숨기기' : '보기'}
            </button>
          </div>
          {(form.password.length > 0 || submitAttempted) && loginErrors.password && (
            <p className="login-page__error">{loginErrors.password}</p>
          )}
        </label>

        {submitAttempted && !isLoginValid && (
          <p className="login-page__error login-page__error--form">로그인 실패: 입력값을 다시 확인해주세요.</p>
        )}

        {authError && <p className="login-page__error login-page__error--form">{authError}</p>}

        <button type="submit">로그인</button>
      </form>

      <div className="login-page__links">
        <Link to="/signup">가입된 계정이 없으신가요?</Link>
      </div>
    </section>

  );
}

export default Login;
