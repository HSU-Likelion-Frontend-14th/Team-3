import './About.scss';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">ABOUT</h2>
      
      <div className="about-content">
        <div className="profile-card">
          <img src="/프로필.jpg" className="profile-avatar" alt="프로필" />
          <div className="profile-name">윤서희</div>
          <ul className="profile-info">
            <li><span>📞</span><span>010-8440-3811</span></li>
            <li><span>✉️</span><span>helensh@naver.com</span></li>
            <li><span>📍</span><span>서울특별시 강서구</span></li>
          </ul>
        </div>

        <div className="about-info-area">
          <div className="info-box">
            <h3>EDUCATION</h3>
            <p>한성대학교 컴퓨터공학부<br/>2025.03~2029.02</p>
          </div>
          <div className="info-box">
            <h3>SKILLS</h3>
            <p>Python<br/>C, C++, C#<br/>Unity, 언리얼엔진<br/>JavaScript</p>
          </div>
          <div className="info-box">
            <h3>WORK</h3>
            <p>프론트엔드 개발자</p>
          </div>
          <div className="info-box">
            <h3>ACTIVITIES</h3>
            <p>멋쟁이사자처럼 14기<br/>Teamodd 운영진</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;