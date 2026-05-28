import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop limit={1} />
    </BrowserRouter>
  );
}

export default App;
