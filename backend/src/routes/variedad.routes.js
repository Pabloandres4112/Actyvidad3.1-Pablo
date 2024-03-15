import { Router } from "express";
import { registrarVariedad, listarVariedades, actualizarVariedad,  buscarVariedad } from "../controllers/variedad.controller.js";
import { validarRegistroVariedad, validarActualizacionVariedad } from "../../validate/validarVariedad.js";

import {validarToken} from "../controllers/autenticacion.js";

const rutaDeVariedad = Router();
//rutas de variedad de cultivo
rutaDeVariedad.post("/registrarVariedad",validarToken, validarRegistroVariedad, registrarVariedad);
rutaDeVariedad.get("/listarVariedades",validarToken, listarVariedades);
rutaDeVariedad.put("/actualizarVariedad/:id",validarToken, validarActualizacionVariedad, actualizarVariedad);
rutaDeVariedad.get("/buscarVariedad/:id",validarToken, buscarVariedad);

export default rutaDeVariedad;
