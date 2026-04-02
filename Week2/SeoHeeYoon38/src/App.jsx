import Header from './components/Header';
import About from './components/About';
import HobbyList from './components/HobbyList';
import './App.scss';

function App() {
  return (
    <div className="page-wrapper">
      <Header />
      
      {/* HERO 섹션 */}
      <section className="hero">
        <div className="hero-text">
          안녕하세요!<br />
          제 이름은 윤서희 입니다.<br />
          소통하는 개발자가 되고 싶어요.
        </div>
      </section>

      <div className="content-bg">
        <About />
        <HobbyList />
      </div>
    </div>
  );
}

export default App;