import { createContext, useReducer } from "react";
import { authReducer } from './AuthReducer'

export const authInitialState = {
	auth: false,
	email:'',
	nombre:'',
	tipo:'',
	foto:'',
	token:'',
}

// creamos el contexto
export const AuthContext = createContext({});

// crear el estado global
export const AuthProvider = ({children})=>{
	const [authState, dispatch] = useReducer(authReducer, authInitialState);
	const signIn = (administrador) =>{
		dispatch({type:'signIn', payload:administrador})
	}
	const signOut = () => {
		dispatch({type:'signOut'});
	}
	const cambiarFoto = (foto) => {
		dispatch({type:'cambiarFoto', payload:foto});
	}
	return (
		<AuthContext.Provider
			value={{
				authState,
				signIn,
				signOut,
				cambiarFoto,
			}}
		>
			{ children }
		</AuthContext.Provider>
	)
}