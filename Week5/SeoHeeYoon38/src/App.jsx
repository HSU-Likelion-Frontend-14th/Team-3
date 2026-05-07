import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';
/*이전 코드 업로드를 위한 주석*/
function App() {
  // 가입된 사용자 목록을 저장하는 상태
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // 회원가입 완료 시 호출되어 registeredUsers에 추가해주는 함수
  const addUser = (newUser) => {
    setRegisteredUsers([...registeredUsers, newUser]);
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/signup" element={<Signup addUser={addUser} />} />
        <Route path="/login" element={<Login registeredUsers={registeredUsers} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;