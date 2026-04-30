import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup({ addUser }) {
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 실시간 유효성 검사
  const isIdValid = /^[a-zA-Z0-9]{4,20}$/.test(userId);
  const isEmailValid = email.includes('@');
  const isPwValid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password);
  const isConfirmValid = password === confirmPassword && confirmPassword !== '';

  const handleSignup = (e) => {
    e.preventDefault();

    if (isIdValid && isEmailValid && isPwValid && isConfirmValid) {
      // 통과 시: 정보 저장 후 로그인 페이지로
      addUser({ userId, password });
      console.log('[회원가입 완료]:', { userId, email });
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else {
      // 실패 시: 실패 메시지 띄우기
      alert('회원가입 실패: 모든 조건(아이디, 이메일, 비밀번호)을 올바르게 입력해 주세요!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>회원가입</h2>

      <form onSubmit={handleSignup} style={{ border: '1px solid #444', padding: '30px', width: '400px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' }}>
        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>아이디</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="영문·숫자 4~20자" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          {userId.length > 0 && !isIdValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>아이디는 영문·숫자 4~20자로 입력해 주세요.</span>}
        </div>

        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>이메일</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          {email.length > 0 && !isEmailValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>올바른 이메일 형식이 아닙니다.</span>}
        </div>

        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>비밀번호</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8자 이상, 영문+숫자" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '35px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '12px' }}>
            {showPassword ? '숨기기' : '보기'}
          </button>
          {password.length > 0 && !isPwValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 합니다.</span>}
        </div>

        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>비밀번호 확인</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 다시 입력" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          {confirmPassword.length > 0 && !isConfirmValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>비밀번호가 일치하지 않습니다.</span>}
        </div>

        <button type="submit" style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '12px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}>가입하기</button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
        이미 계정이 있나요? <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>로그인</Link>
      </div>
    </div>
  );
}

export default Signup;