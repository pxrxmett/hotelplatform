import React from 'react'

const Navigation = () => {
  const currentPath = window.location.pathname

  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="images/logo.png" alt="Talaysai" className="w-12" />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={currentPath === "/"}>Home</NavLink>
          <NavLink href="/rooms">Rooms</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <button 
            className="bg-blue-500 text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Book now
          </button>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children, active }) => (
  <a 
    href={href}
    className={`${
      active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
    } transition-colors duration-200`}
  >
    {children}
  </a>
)

export default Navigation