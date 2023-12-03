import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'

import { toast, ToastContainer } from "react-toastify";

const AmplificadoresAgregar = () => {
	const initialState = {
		clave:'',
		nombre:'',
		linea:'',
		modelo:'',
		marca:'',
		potencia:'',
		clase:'',
		canales:'',
		precio:'',
		color:'',
		cantidad:'',
		descripcion:'',
		foto:'',
	};
  const [ampli, setAmpli] = useState(initialState);
	const  { clave, nombre, linea, modelo, marca,	potencia,	clase, canales, precio, color, cantidad, 	descripcion } = ampli;

  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-access-token": context.authState.token,
      },
    }
    axios
      .post("http://localhost:5000/amplificador/agregar", ampli, config)
      .then(function (response) {
        // handle success
         console.log(response);
        const conteo = response.data.result.affectedRows;
        if(conteo>0) {
          setAmpli(initialState);
          notify(201);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  const handleChange = (event) => {
    const { name, value} = event.target;
    setAmpli({...ampli, [name]:value});
  }
  const notify = (num) => {
    if(num===201) {
      toast.success(
        'Amplificador agregado',
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose:1000,
          onClose: ()=> navigate('/amplificadores') 
        },
      )
    }


    
  }
  return (
    <Container>
      <Row>
        <Col><ToastContainer /></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicClave">
              <Form.Label>Clave</Form.Label>
              <Form.Control
                name="clave"
                type="text"
                placeholder="ingresa la clave"
                value={clave}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                placeholder="ingresa el Nombre"
                value={nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLinea">
              <Form.Label>Linea</Form.Label>
              <Form.Control
                name="linea"
                type="text"
                placeholder="ingresa la Linea"
                value={linea}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                name="modelo"
                type="text"
                placeholder="ingresa la Modelo"
                value={modelo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                name="marca"
                aria-label="Default select example"
                value={marca}
                onChange={handleChange}
              >
                <option>Seleccione la marca</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPotencia">
              <Form.Label>Potencia</Form.Label>
              <Form.Control
                name="potencia"
                type="text"
                placeholder="ingresa la potencia"
                value = { potencia }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicClase">
              <Form.Label>Clase</Form.Label>
              <Form.Control
                name="clase"
                type="text"
                placeholder="ingresa la Clase"
                value = { clase }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCanales">
              <Form.Label>Canales</Form.Label>
              <Form.Control
                name="canales"
                type="text"
                placeholder="ingresa los Canales"
                value = { canales }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                placeholder="ingresa el precio"
                value = { precio }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                name="color"
                type="text"
                placeholder="ingresa el Color"
                value = { color }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCantidadd">
              <Form.Label>Cantidadd</Form.Label>
              <Form.Control
                name="cantidad"
                type="number"
                placeholder="ingresa la Cantidadd"
                value = { cantidad }
                onChange = { handleChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescripcion">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                name="descripcion"
                type="text"
                placeholder="ingresa la Descripcion"
                value = { descripcion }
                onChange = { handleChange }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
 
export default AmplificadoresAgregar;