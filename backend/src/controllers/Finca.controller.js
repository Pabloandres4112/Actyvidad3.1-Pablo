import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

//crud listar
//crid
export const listarFinca = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM finca")

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                "Mensaje":"No hay fincas"
            })
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": "error en el sistema"
        })
    }
}
//crud Registrar
export const RegistroFinca = async (req, res) => {
    try {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json(errors);
            }
           
        const { nombre_finca, longitud, latitud } = req.body;


        const [result] = await pool.query("INSERT INTO finca (nombre_finca, longitud, latitud) VALUES (?, ?, ?)", [nombre_finca, longitud, latitud]);
        
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se registró la finca con éxito',
                result: result
            });
        } else {
            res.status(403).json({
                status: 403,
                message: 'No se registró la finca',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'error en el sistema'
        });
    }
}

//actualizar
export const ActualizarFinca = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { nombre_finca, longitud, latitud } = req.body;

        // Verifica si al menos uno de los campos está presente en la solicitud
        if (!nombre_finca && !longitud && !latitud) {
            return res.status(400).json({ message: 'Al menos uno de los campos (nombre_finca, longitud, latitud) debe estar presente en la solicitud para realizar la actualización.' });
        }

        console.log("Consulta SQL:", `SELECT * FROM finca WHERE id_finca=${id}`);

        const [oldFinca] = await pool.query("SELECT * FROM finca WHERE id_finca=?", [id]);

        const [result] = await pool.query(
            `UPDATE finca SET nombre_finca = ${nombre_finca ? `'${nombre_finca}'` : `'${oldFinca[0].nombre_finca}'`}, longitud = ${longitud ? `'${longitud}'` : `'${oldFinca[0].longitud}'`}, latitud = ${latitud ? `'${latitud}'` : `'${oldFinca[0].latitud}'`} WHERE id_finca = ?`,
            [id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: 'Se actualizó con éxito',
                result: result
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'No se encontró el registro para actualizar'
            });
        }
    } catch (error) {
        console.error("Error en la función Actualizar:", error);  
        return res.status(500).json({
            status: 500,
            message: error.message || "error en el sistema"
        });
    }
};

// CRUD - Buscar
export const BuscarFinca = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM finca WHERE id_finca =?", [id]);
                    
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron resultados para la búsqueda'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "error en el sistema"
        });
    }
};