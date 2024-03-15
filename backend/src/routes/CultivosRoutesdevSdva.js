import { Router } from "express";
import {registrar,  actualizar,  buscar, listar, desactivar } from '../controllers/CultivosControllerdevSdva.js';
import { validacionCultivosA, validacionCultivosR } from "../../validate/CultivosValidatedevSdva.js";
import { validarToken } from "../controllers/autenticacion.js"; 


const rutaCultivos = Router();

rutaCultivos.get('/listar', validarToken, listar);
rutaCultivos.post('/registrar', validarToken, validacionCultivosR, registrar);
rutaCultivos.get('/buscar/:id_cultivo',validarToken, buscar); 
rutaCultivos.put('/actualizar/:id_cultivo', validarToken, validacionCultivosA, actualizar);
rutaCultivos.post('/desactivar/:id_cultivo',validarToken, desactivar);


export default rutaCultivos;