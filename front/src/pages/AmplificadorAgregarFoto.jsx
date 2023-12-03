import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image, Card } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

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
const initialStateFile = {
	arch:'',
	clave:'',
	foto:'',
}
const AmplificadorAgregarFoto = () => {
	const { cl } = useParams();
	const [ampli, setAmpli] = useState(initialState);
	const  { clave, nombre, linea, modelo, marca,	potencia,	clase, canales, precio, color, cantidad, 	descripcion, foto } = ampli;
	const [archivo, setArchivo] = useState(initialStateFile);
	const { arch } = archivo;
	const navigate = useNavigate();

	useEffect(() => {
		traerAmplificador(cl);
	}, [])
	const traerAmplificador = (cl) => {
		axios.get(`http://localhost:5000/amplificador/traer/${cl}`)
		.then(function (response) {
			// handle success
			// console.log(response);
			setAmpli(response.data[0]);
			setArchivo({
				...archivo, clave:response.data[0].clave, foto:response.data[0].foto
			});
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
	}
	const handleChange = (event)=> {
		setArchivo({
			...archivo,
			arch: event.target.files[0]
		})
	}
	const handleCancelar = ()=>{
		setAmpli(initialState);
		setArchivo(initialStateFile);
		navigate('/amplificadores');
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if(archivo.arch==='') {
			return(
				alert('no se ha seleccionado archivo')
			)
		}
		const formData =  new FormData();
		formData.append('clave', archivo.clave);
		formData.append('foto', archivo.foto);
		formData.append('imagen', archivo.arch);

		// llamar el backend
		axios
      .post("http://localhost:5000/amplificador/foto/subir", formData)
      .then(function (response) {
        // handle success
        // console.log(response);
		if(response.status===200) {
			setAmpli(initialState);
			setArchivo(initialStateFile);
			notify(200);
		}
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
	}
	const notify = (num) => {
		if(num===200) {
		  toast.success(
			'Se ha actualizado el avatar',
			{
			  position: toast.POSITION.TOP_CENTER,
			  autoClose:1000,
			  onClose: ()=> navigate('/amplificadores') 
			},
		  )
		}else {
			toast.success(
			  'No se ha actualizado el avatar',
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
			<Col>
				<ToastContainer />
			</Col>
		</Row>
		<Row>
			<Col>
			<p className="h1">Avatar amplificador</p>
			</Col>
		</Row>
		<Row>
			<Col>
			{/* imagen actual */}
			<p className="h4">Avatar actual</p>
			<Image
				style={{width:'70%', height:'70%', verticalAlign:'center'}}
				src={`http://localhost:5000/img/avatar/${foto}`}
			/>			
			</Col>
			<Col>
			{/* imagen nueva */}
			<Card style={{width:'100%'}}>
				<Card.Body>
					<Card.Title>
						{nombre}
					</Card.Title>
					<Card.Text style={{backgroundColor:"rgba(133,181,240,0.5)", borderRadius:10}}>
						<br/>
						Clave: {clave}
						<br />
						Linea: {linea}
						<br />
						Modelo:{modelo}
						<br />
						Marca:{marca}
						<br />
						Potencia: {potencia}
						<br />
						Clase: {clase}
						<br />
						Canales: {canales}
						<br />
						Precio: {precio}
						<br />
						Color: {color}
						<br />
						Cantidad:{cantidad}
						<br />
						Descripción: {descripcion}
						<br /><br />
					</Card.Text>
				</Card.Body>
			</Card>
			</Col>
		</Row>
		<Row>
			<Col>
				<p className="h4">Avatar nuevo</p>
				{
					arch!=='' ? (<Image src={URL.createObjectURL(arch)} style={{width:'70%', height:'70%', verticalAlign:'center'}} />) : (<p>Selecciona imagen</p>)
				}
			</Col>
			<Col>
				<Form onSubmit={  handleSubmit }>
					<Form.Group controlId = 'name'>
						<Form.Label className='h4'>Selecciona un nuevo avatar</Form.Label>
						<Form.Control
							accept='image/*'
							title='selecciona'
							type='file'
							name='imagen'
							className='mb-3'
							onChange={ handleChange }
						/>
					</Form.Group>
					<Button
						className='ms-3'
						variant='outline-primary'
						title='subir'
						type='submit'
					>
						guardar
					</Button>
					<Button
						className='ms-3'
						variant='outline-primary'
						title='cancelar'
						onClick={ handleCancelar }
					>
						Cancelar
					</Button>
				</Form>
			</Col>
		</Row>

	</Container>
  )
}
export default AmplificadorAgregarFoto;