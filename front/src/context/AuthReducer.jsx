import { authInitialState } from './AuthContext';

// crear el reducer
export const authReducer = (state, action) => {
	switch(action.type) {
		case 'signIn':
			return {
				...state,
				auth: true,
				email: action.payload.email,
				nombre: action.payload.nombre,
				foto: action.payload.foto,
				token: action.payload.token,
			}
		case 'signOut':
			return {
				...authInitialState,
			}
		case 'cambiarFoto':
			return {
				...state,
				foto: action.payload.foto,
			}
		default:
			return state
	}
}