import { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const BarraSuperior = () => {

  const context = useContext(AuthContext);
	return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            AudioApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              {context.authState.auth ? (
                <NavDropdown title="Amplificadores" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/amplificadores">
                    Inicio
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/amplificadores/agregar">
                    Agregar
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet></Outlet>
      </div>
    </Container>
  );
}
 
export default BarraSuperior;