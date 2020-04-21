import { Link } from 'gatsby'
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link to="/" className="navbar-brand">
      esrenll.github.io
    </Link>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/imas-def" className="nav-link">
          Imas Defense
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
