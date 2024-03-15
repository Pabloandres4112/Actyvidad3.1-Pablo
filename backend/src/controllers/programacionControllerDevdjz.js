import { pool } from "../database/conexion.js";
import {validationResult} from "express-validator"

// CRUD - Registrar
//cred
export const registrarProgramacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado } = req.body;

        const [usuarioExist] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [fk_id_usuario]);
        if (usuarioExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El usuario no existe, registre un usuario"
            });
        }
        
        const [actividadExist] = await pool.query('SELECT * FROM actividad WHERE id_actividad = ?', [fk_id_actividad]);
        if (actividadExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "La actividad no existe, registre una actividad"
            });
        }

        const [cultivoExist] = await pool.query('SELECT * FROM cultivo WHERE id_cultivo = ?', [fk_id_cultivo]);
        if (cultivoExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El cultivo no existe, registre un cultivo"
            });
        }

        const [result] = await pool.query("INSERT INTO programacion (fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado) VALUES (?,?,?,?,?,?)", [fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: 'Se registró con éxito'
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'No se registró'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};


// CRUD - Listar
export const listarProgramacion = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM programacion");

        if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'No hay ninguna asignación'
                });
            }
        } catch (error) {
        res.status(500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

// CRUD - Actualizar
export const actualizarProgramacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado } = req.body;

        // Verificar si el usuario existe
        const [usuarioExist] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [fk_id_usuario]);
        if (usuarioExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El usuario no existe, registre un usuario"
            });
        }

        // Verificar si la actividad existe
        const [actividadExist] = await pool.query('SELECT * FROM actividad WHERE id_actividad = ?', [fk_id_actividad]);
        if (actividadExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "La actividad no existe, registre una actividad"
            });
        }

        // Verificar si el cultivo existe
        const [cultivoExist] = await pool.query('SELECT * FROM cultivo WHERE id_cultivo = ?', [fk_id_cultivo]);
        if (cultivoExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "El cultivo no existe, registre un cultivo"
            });
        }

        // Actualizar la programación
        const [result] = await pool.query(
            `UPDATE programacion 
            SET fecha_inicio = ?, fecha_fin = ?, fk_id_usuario = ?, fk_id_actividad = ?, fk_id_cultivo = ?, estado = ? 
            WHERE id_programacion = ?`, 
            [fecha_inicio, fecha_fin, fk_id_usuario, fk_id_actividad, fk_id_cultivo, estado, id]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({
                status: 200,
                message: 'Se actualizó con éxito',
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'No se encontró la programación para actualizar'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};


// CRUD - Estado
export const estadoProgramacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const [oldTipoRecurso] = await pool.query("SELECT * FROM programacion WHERE id_programacion=?", [id]);

        const [result] = await pool.query( `UPDATE programacion SET estado = ${estado ? `'${estado}'` : `'${oldTipoRecurso[0].estado}'`} WHERE id_programacion=?`,
            [id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'El estado se realizó correctamente'
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'El estado no se realizo correctamente'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Error interno del servidor'
        });
    }
};
// CRUD -buscar
    export const buscarProgramacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("SELECT * FROM programacion WHERE id_programacion=?", [id]);
                        
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
            message: error.message || 'Error interno del servidor'
        });
    }
}




