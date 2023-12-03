import { Route, Routes } from 'react-router-dom';
import './App.css';
import BarraSuperior from './components/BarraSuperior';
import AmplificadoresAgregar from './pages/AmplificadoresAgregar';
import AmplificadoresModificar from './pages/AmplificadoresModificar';
import AmplificadoresScreen from './pages/AmplificadoresScreen';
import Home from './pages/Home';
import AmplificadorAgregarFoto from './pages/AmplificadorAgregarFoto';
import AmplificadorAgregarFotos from './pages/AmplificadorAgregarFotos';
import UsuariosRegistrar from './pages/usuarios/UsuariosRegistrar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AppState>
        <Routes>
          <Route path="/" element={<BarraSuperior />}>
            <Route index element={<Home />} />
            <Route path='amplificadores'>
              <Route index element={ <AmplificadoresScreen />} />
              <Route path='agregar' element={ <AmplificadoresAgregar /> } />
              <Route path='modificar/:cl' element={ <AmplificadoresModificar /> } />
              <Route path='agregar/foto/:cl' element={<AmplificadorAgregarFoto />} />
              <Route path='agregar/fotos/:cl' element={<AmplificadorAgregarFotos />} />
            </Route>
            <Route path='usuariosregistrar' element= { <UsuariosRegistrar/> } />
          </Route>
        </Routes>
      </AppState>
    </div>
  );
}

const AppState = ({ children }) =>{
  return(
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

export default App;
