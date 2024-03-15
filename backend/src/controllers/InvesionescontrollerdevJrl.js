import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

//nn
export const listarInversiones = async (req, res) => {
    try {
        const [listar] = await pool.query('SELECT * FROM inversiones');

        if (listar.length > 0) {
            res.status(200).json(listar);
        } else {
            res.status(400).json({
                status: 400,
                message: 'no hay ninguna inversion'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'error en el servidor',
        });
    }
};

export const registrarInversiones = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array() 
            });
        }

        const { fk_id_programacion, egresos } = req.body;

        // Verificar si el fk_id_programacion existe
        const [loteExist] = await pool.query('SELECT * FROM programacion WHERE id_programacion = ?', [fk_id_programacion]);

        if (loteExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'la programacion no existe. Registre primero una programacion.'
            });
        }

        const [Registrar] = await pool.query('INSERT INTO inversiones (fk_id_programacion, egresos) VALUES (?, ?)', [fk_id_programacion, egresos]);

        if (Registrar.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se registró correctamente'
            });
        } else {
            res.status(400).json({
                status: 400,
                message: 'Campo obligatorio'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};


export const BuscarInversiones = async (req, res) => {
    try {
        const { id_Inversiones } = req.params;
        const consultar = 'SELECT * FROM inversiones WHERE id_inversiones LIKE ?';
        const [resultado] = await pool.query(consultar, [`%${id_Inversiones}%`]);

        if (resultado.length > 0) {
            return res.status(200).json({ resultado });
        } else {
            res.status(404).json({
                status: 404,
                message: "No se encontraron resultados ",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "error en el servidor ",
        });
    }
};

export const actualizarInversiones = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const {id_Inversiones} = req.params
        const { fk_id_programacion, egresos } = req.body;

        // Verificar si el fk_id_programacion existe
        const [loteExist] = await pool.query('SELECT * FROM programacion WHERE id_programacion = ?', [fk_id_programacion]);

        if (loteExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'la programacion no existe. Registre primero una programacion.'
            });
        }
        if (!fk_id_programacion && !egresos) {
            return res.status(400).json({
                message: 'Se requiere uno de los campos para actualizar.'
            });
        }

        const [addInversiones] = await pool.query('SELECT * FROM inversiones WHERE id_inversiones=?', [id_Inversiones]);

        if (addInversiones.length === 0) {
            return res.status(400).json({ status: 400, message: 'inversion no encontrada.' });
        }

        const UpdateValue = {
            fk_id_programacion: fk_id_programacion || addInversiones[0].fk_id_programacion,
            egresos: egresos || addInversiones[0].egresos,
        };

        const updateQuery = 'UPDATE inversiones SET  fk_id_programacion=?, egresos=? WHERE id_inversiones=?';

        const [Actualiza] = await pool.query(updateQuery, [UpdateValue.fk_id_programacion, UpdateValue.egresos, id_Inversiones]);

        if (Actualiza.affectedRows > 0) {
            res.status(200).json({
                mensaje: 'Ha sido actualizado.'
            });
        } else {
            res.status(400).json({
                status: 400,
                message: 'No se encontraron resultados para la actualización.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error en el servidor.',
            error: error.message
        });
    }
};

/*
export const eliminarProduccion = async (req, res) => {
    try {
        // Obtiene el ID de la producción desde el header
        const id_produccion = req.headers['id_produccion'];

        // Verifica si se proporcionó el ID
        if (!id_produccion) {
            return res.status(400).json({
                status: 400,
                message: 'Se requiere proporcionar el ID de la producción en el header'
            });
        }

        // Realiza la consulta para eliminar la producción con el ID proporcionado
        const [result] = await pool.query('DELETE FROM produccion WHERE id_produccion = ?', [id_produccion]);

        // Verifica si se eliminó correctamente
        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se eliminó la producción con éxito'
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró ninguna producción con el ID proporcionado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor'
        });
    }
};
*/