import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

const initialState = {
	email:'',
	nombre:'',
	descripcion:'',
	foto:'',
	password:'',
	tipo:'',
}
function UsuariosRegistrar() {
	const [usuario, setUsuario] = useState(initialState);
	const {email, nombre, descripcion, foto, password, tipo} = usuario;
	const handleInputChange = (e)=> {
		let { name, value } = e.target;
		setUsuario({...usuario, [name]:value});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:5000/administradores/agregar', usuario);
		console.log(response);

		//console.log(usuario);
	}
	return (
    <Container>
      <Row>
        <Col>
          <p>Registrarse</p>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={ handleSubmit }>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control id="email" name="email" type="email" placeholder="Enter email" value={email} onChange={ handleInputChange } required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="nombre"
				name="nombre"
                type="text"
                placeholder="ingresa tu nombre"
				value={ nombre }
				onChange={ handleInputChange }
				required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                id="descripcion"
				name="descripcion"
                type="text"
                placeholder="ingresa tu descripcion"
				value={ descripcion }
				onChange={ handleInputChange }
				required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
				name="password"
                type="password"
                placeholder="Password"
				value={ password }
				onChange={ handleInputChange }
				required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de usuario</Form.Label>
              <Form.Select id = "tipo" name="tipo" aria-label="Default select example" value={ tipo } onChange={ handleInputChange } required>
                <option value="admin">Administrador</option>
                <option value="normal">Normal</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrar
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row></Row>
    </Container>
  );
}

export default UsuariosRegistrar;