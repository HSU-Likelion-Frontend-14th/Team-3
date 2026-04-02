import './Header.scss';

const Header = () => {
  return (
    <nav className="nav">
      <div className="logo-box">
        <img src="/PORTFOLIO.svg" alt="PORTFOLIO." />
      </div>
      <ul className="nav-links">
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#hobby">HOBBY</a></li>
        <li><a href="#about">CONTACT</a></li>
      </ul>
    </nav>
  );
};

export default Header;