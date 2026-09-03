function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          IconForge
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#generator">Generator</a>
          <a href="#how-it-works">How It Works</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar