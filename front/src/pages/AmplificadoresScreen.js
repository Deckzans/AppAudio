import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup, Table, Modal} from "react-bootstrap";
import { LogoNodejs, Pencil, Trash, Camera, Images } from 'react-ionicons';
import { Link } from "react-router-dom";

const intialStateModal = {
  show:false,
  clave:'',
  marca:'',
  modelo:'',
  foto:'',
}
const AmplificadoresScreen = () => {
	useEffect(() => {
		traerAmplificadores();		
	}, []);

  const [amplificadores, setAmplificadores] = useState([]);
  const {  clave, marca, modelo, foto } = amplificadores;
  const [modal, setModal] = useState(intialStateModal);
  
	function traerAmplificadores() {
    axios
      .get("http://localhost:5000/amplificadores")
      .then(function (response) {
        // handle success
        setAmplificadores(response.data);
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  const handleBuscar = (e) => {
    e.preventDefault();
    // console.log(e.target[1].value);
    const nombre = e.target[1].value;
    axios
    .get(`http://localhost:5000/amplificadores/${nombre}`)
    .then(function (response) {
      // handle success
      setAmplificadores(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
  const handleClose = () => {
    setModal(intialStateModal);
  }
  const handleAbrir = (clave, nombre, marca, modelo) => {
    setModal({
      show:true,
      clave,
      nombre,
      marca,
      modelo,
    });
  }
  const handleEliminar = (clave) => {

    axios
      .get(`http://localhost:5000/amplificador/eliminar/${clave}`)
      .then(function (response) {
        // handle success
        // console.log(response.data);
        if(response.data.result.affectedRows>0) {
            alert(`${response.data.mensaje}`);
            traerAmplificadores();
            setModal(intialStateModal);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }
	
	return (
    <>
      <h1>Amplificadores</h1>
      <LogoNodejs
        color={"#00000"}
        height="250px"
        width="250px"
        onClick={() => alert("Hi!")}
      />
      <Form onSubmit={handleBuscar}>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" name="nombre" type="submit">
            Buscar
          </Button>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {amplificadores.map((amplificador) => (
            <tr key={amplificador.clave}>
              <td>{amplificador.clave}</td>
              <td>{amplificador.nombre}</td>
              <td>{amplificador.marca}</td>
              <td>{amplificador.modelo}</td>
              <td>{amplificador.precio}</td>
              <td>
                <Button
                  as={Link}
                  to={`/amplificadores/modificar/${amplificador.clave}`}
                  style={{ backgroundColor: "#fff" }}
                >
                  <Pencil
                    color={"#900"}
                    title={"modificar"}
                    height="25px"
                    width="25px"
                  />
                </Button>
                <Button
                onClick={ () => handleAbrir(amplificador.clave, amplificador.nombre, amplificador.marca, amplificador.modelo) }
                 style={{ backgroundColor: "#fff" }}>
                  <Trash
                    color={"#900"}
                    title={"Eliminar"}
                    height="25px"
                    width="25px"
                  />
                </Button>
                <Button
                  as={Link}
                  to={`/amplificadores/agregar/foto/${amplificador.clave}`}
                 style={{ backgroundColor: "#fff" }}>
                  <Camera
                    color={"#900"}
                    title={"foto principal"}
                    height="25px"
                    width="25px"
                  />
                </Button>
                <Button
                 as={Link}
                 to={`/amplificadores/agregar/fotos/${amplificador.clave}`}
                 style={{ backgroundColor: "#fff" }}>
                  <Images
                    color={"#900"}
                    title={"album"}
                    height="25px"
                    width="25px"
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={ modal.show } onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ modal.nombre }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.clave} {modal.marca} {modal.modelo}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={()=> handleEliminar(modal.clave)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default AmplificadoresScreen;