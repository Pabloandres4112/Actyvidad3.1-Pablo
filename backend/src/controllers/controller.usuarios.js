import {pool} from '../database/conexion.js'
import { validationResult } from "express-validator"

//nn
export const listarUsuarios = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM usuarios');
        if (result.length >  0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                status: 404,
                "message": 'El usuario no esta registrados'
            });
        }
    } catch (error) {
        res.status(500).json({
            status:  500,
            message: 'Error en el sistema'+error
        })
    }
}

export const buscarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [result] = await pool.query("SELECT * FROM usuarios WHERE id_usuario=?", [id_usuario]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                mensaje: "No se encontró un asuario con ese ID"
            });
        }
    } catch (error) {
        res.status(500).json({ 
            status: 500, 
            message: 'Error en el sistema: ' + error 
        });
    }
};

export const registrarUsuarios = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        const{nombre,apellido,correo,password,rol,estado} = req.body
        const[rows] = await pool.query(`INSERT INTO usuarios (nombre,apellido,correo,password,rol,estado) values (?, ?, ?, ?, ?,?)`, [nombre,apellido,correo,password,rol,estado])


        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 'Se registro con exito el usuario'+ nombre
            })
        }else{
            res.status(403).json({
                'status': 403,
                'message': 'No se registro el usuario'
            })
        }

    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': 'Error del servidor' + error
        })
    }
}
export const actualizarUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_usuario } = req.params;
        const { nombre, apellido, correo, password, rol, estado } = req.body;

        const [oldUsuario] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);

        if (oldUsuario.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado',
            });
        }

        const updatedUsuario = {
            nombre: nombre || oldUsuario[0].nombre,
            apellido: apellido || oldUsuario[0].apellido,
            correo: correo || oldUsuario[0].correo,
            password: password || oldUsuario[0].password,
            rol: rol || oldUsuario[0].rol,
            estado: estado || oldUsuario[0].estado,
        };

        const [result] = await pool.query(
            `UPDATE usuarios SET nombre=?, apellido=?, correo=?, password=?, rol=?, estado=? WHERE id_usuario = ?`,
            [updatedUsuario.nombre, updatedUsuario.apellido, updatedUsuario.correo, updatedUsuario.password, updatedUsuario.rol, updatedUsuario.estado, id_usuario]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                mensaje: "El usuario ha sido actualizado.",
            });
        } else {
            res.status(404).json({
                status: 404,
                mensaje: "No se pudo actualizar el usuario, inténtalo de nuevo.",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};

export const desactivarUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [result] = await pool.query("UPDATE usuarios SET estado='inactivo' WHERE id_usuario=?", [id_usuario]);
        
        if (result.affectedRows >  0) {
            res.status(200).json({
                status: 200,
                "mensaje": "El usuario con el id "+id_usuario+" ha sido desactivado."
            });
        } else {
            res.status(404).json({
                status: 404,
                "message": "No se pudo desactivar el usuario"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el sistema: '+error
        });
    }
}
