import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import '../styles/components/Header.scss';

function Header() {
  const navItems = [
    { to: '/', label: '홈', icon: 'material-symbols:home-rounded' },
    { to: '/board', label: '게시판', icon: 'material-symbols:forum-rounded' },
    { to: '/signup', label: '회원가입', icon: 'material-symbols:person-add-rounded' },
  ];

  return (
    <header className="header">
      <nav className="header__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'header__link header__link--active' : 'header__link'
            }
            aria-label={item.label}
          >
            <Icon className="header__link-icon" icon={item.icon} width="20" height="20" />
            <span className="header__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
