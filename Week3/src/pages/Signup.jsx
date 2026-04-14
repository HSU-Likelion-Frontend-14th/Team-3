import { useNavigate } from 'react-router-dom';
import '../styles/pages/Signup.scss';
function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('가입이 완료되었습니다!');
    navigate('/');
  };

  return (
    <section className="signup-page">
      <h2>👤 회원가입</h2>
      <form onSubmit={handleSignup} className="signup-page__form">
        <input type="text" placeholder="아이디" required />
        <input type="password" placeholder="비밀번호" required />
        <button type="submit">가입하기</button>
      </form>
    </section>
  );
}

export default Signup;
