import { Link } from 'react-router-dom';
/*이전 코드 업로드를 위한 주석*/
function Header() {
  return (
    <header style={{ padding: '20px', display: 'flex', gap: '15px' }}>
      <Link to="/" style={{ color: '#a78bfa', textDecoration: 'none' }}>홈</Link>
      <Link to="/board" style={{ color: '#a78bfa', textDecoration: 'none' }}>게시판</Link>
      <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>로그인</Link>
      <Link to="/signup" style={{ color: '#a78bfa', textDecoration: 'none' }}>회원가입</Link>
    </header>
  );
}

export default Header;