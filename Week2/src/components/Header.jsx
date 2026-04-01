import React from 'react'
import '../styles/components/Header.scss'

function Header() {
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'HOBBY', href: '#hobby' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <header className="site-header">
      <div className="inner header-inner">
        <a className="logo" href="#top">
          PORTFOLIO.
        </a>
        <nav className="main-nav" aria-label="주요 메뉴">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
