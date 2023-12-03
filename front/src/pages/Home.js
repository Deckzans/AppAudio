//Se usa el context Aqui
import { useContext, useState } from 'react';
//Importaciones
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';



const initialState = {
	email:'',
	password:'',
}

function Home() {
	const [usuario, setUsuario] = useState(initialState);
	const { email, password } = usuario;
	const navigate = useNavigate();

  //AuthContext 
	const context = useContext(AuthContext);

	const handleChange = (e) => {
		let { name, value } = e.target;
		setUsuario({...usuario, [name]:value});
	};

  
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:5000/usuarios/ingresar', usuario);
		if(response.data.resultado === 2) {
			context.signIn(response.data);
			setUsuario(initialState);
			navigate('/amplificadores');
		}
		
		console.log(response);
		
	};

	return (
    <Container>
      <Row>
        <Col>
        </Col>
        <Col className='mt-5'>
          <Form onSubmit={ handleSubmit }>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control id="email" name="email" type="email" placeholder="Enter email" value={ email } onChange={ handleChange } />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control id="password" name="password" type="password" placeholder="Password" value={ password } onChange={ handleChange } />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
		  <Link to="/usuariosregistrar">Registrarse</Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Home;