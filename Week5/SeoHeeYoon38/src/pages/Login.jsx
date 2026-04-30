import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
/*이전 코드 업로드를 위한 주석*/
function Login({ registeredUsers }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const isIdValid = userId.length >= 3;
  const isPwValid = password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 실제 가입된 유저인지 검사
    const foundUser = registeredUsers.find(
      (user) => user.userId === userId && user.password === password
    );

    if (foundUser) {
      console.log('[로그인 성공]:', userId);
      alert('로그인 성공! 환영합니다.');
      navigate('/');
    } else {
      // 가입되지 않았거나 비밀번호가 틀린 경우
      alert('등록되지 않은 사용자이거나 아이디/비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>로그인</h2>

      <form onSubmit={handleSubmit} style={{ border: '1px solid #444', padding: '30px', width: '400px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' }}>
        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>아이디</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          {userId.length > 0 && !isIdValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>아이디는 3자 이상 입력해 주세요.</span>}
        </div>

        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} />
          {password.length > 0 && !isPwValid && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>비밀번호는 6자 이상 입력해 주세요.</span>}
        </div>

        <button type="submit" style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '12px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}>로그인</button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
        계정이 없나요? <Link to="/signup" style={{ color: '#a78bfa', textDecoration: 'none' }}>회원가입</Link>
      </div>
    </div>
  );
}

export default Login;