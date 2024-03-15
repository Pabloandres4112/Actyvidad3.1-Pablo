import { Router } from "express"
import  {actualizarUsuario, listarUsuarios, buscarUsuario, desactivarUsuario, registrarUsuarios} from '../controllers/controller.usuarios.js'

import {validarUsuario, validarUsu} from '../../validate/UsuariosValidatekvd.js'
import { validarToken } from '../controllers/autenticacion.js'

const rutaUsuario = Router();

rutaUsuario.get('/listarUsuario', validarToken,listarUsuarios);  
rutaUsuario.post('/registrarUsuario',validarUsuario,registrarUsuarios);
rutaUsuario.post('/desactivarUsuario/:id_usuario',validarToken, desactivarUsuario);
rutaUsuario.put('/actualizarUsuario/:id_usuario',validarToken, validarUsu,actualizarUsuario);
rutaUsuario.get('/buscarUsuarios/:id_usuario',validarToken, buscarUsuario);


export default rutaUsuario;
//rnn
