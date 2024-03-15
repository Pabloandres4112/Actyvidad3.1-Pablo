import {query} from 'express';
import { pool } from '../database/conexion.js';
import { validationResult } from 'express-validator';

export const listar = async (req,res) => {
    try{
    let sql = 'SELECT * FROM cultivo';
    const [result] = await pool.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    }else{
      res.status(404).json({'message': 'No se encontraron cultivos '});
    }
  } catch(error){
    res.status(500).json({'status':500,'message':'error en el sistema: '+error});
  }
  };
  
  export const registrar = async (req, res) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }
    const {fecha_inicio, cantidad_sembrada, fk_id_lote, fk_id_variedad, estado} = req.body;


    let checkSql = `SELECT COUNT(*) AS count FROM lotes WHERE id_lote = ?`;
    let checkSql2 = `SELECT COUNT(*) AS count FROM variedad WHERE id_variedad = ?`;
    const [checkResult] = await pool.query(checkSql, [fk_id_lote]);
    const [checkResult2] = await pool.query(checkSql2, [fk_id_variedad]);

    if (checkResult[0].count === 0) {
      return res.status(400).json({ status: 400, message: 'El valor de fk_id_lote no existe en la tabla lotes' });
    }
    if (checkResult2[0].count === 0) {
     return res.status(400).json({ status: 400, message: 'El valor de fk_id_variedad no existe en la tabla variedad' });
   }
  
    let sql =  `INSERT INTO cultivo (fecha_inicio, cantidad_sembrada, fk_id_lote, fk_id_variedad, estado) VALUES (?, ?, ?, ?, ?)`;
  
    const [rows] = await pool.query(sql,[fecha_inicio, cantidad_sembrada, fk_id_lote, fk_id_variedad, estado]);
    if (rows.affectedRows > 0) {
      res.status(200).json({'status':200,'message':'Registro exitoso de su cultivo'});
    }else{
      res.status(403).json({'status':403,'message':'Fallo el registro de su cultivo'});
    }
  } catch(error){
    res.status(500).json({'status':500,'message':'error en el sistema: '+error});
  }
  
  };
  
  

  export const actualizar = async (req, res) => {
    try {
        const { id_cultivo } = req.params;
        const { fecha_inicio, cantidad_sembrada, fk_id_lote, fk_id_variedad, estado, fk_id_tipo_recursos } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Verificar si el valor de existe en la tabla tipo_recursos
        let checkSql = `SELECT COUNT(*) AS count FROM lotes WHERE id_lote = ?`;
        let checkSql2 = `SELECT COUNT(*) AS count FROM variedad WHERE id_variedad = ?`;
        const [checkResult] = await pool.query(checkSql, [fk_id_lote]);
        const [checkResult2] = await pool.query(checkSql2, [fk_id_variedad]);

        if (checkResult[0].count === 0) {
            return res.status(400).json({ status: 400, message: 'El valor de fk_id_lote no existe en la tabla lotes' });
        }
        if (checkResult2[0].count === 0) {
            return res.status(400).json({ status: 400, message: 'El valor de fk_id_variedad no existe en la tabla variedad' });
        }

        // Verificar si el recurso existe
        const [cultivoExist] = await pool.query('SELECT * FROM cultivo WHERE id_cultivo = ?', [fk_id_variedad, fk_id_lote]);

        if (cultivoExist.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'El cultivo no existe. Registre primero un cultivo.'
            });
        }

        let sql = `
        UPDATE cultivo
        SET fecha_inicio = ?,
            cantidad_sembrada = ?,
            fk_id_lote = ?,
            fk_id_variedad = ?,
            estado = ?
        WHERE id_cultivo = ?
        `;

        const [rows] = await pool.query(sql, [fecha_inicio, cantidad_sembrada, fk_id_lote, fk_id_variedad, estado, id_cultivo]);

        if (rows.affectedRows > 0) {
            res.status(200).json({ status: 200, message: 'La información ha sido actualizada' });
        } else {
            res.status(404).json({ status: 404, message: 'No se pudo actualizar la información' });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error en el sistema: ' + error });
    }
};

  
  export const buscar = async (req, res) => {
    try {
        const { id_cultivo } = req.params;
        const [resultado] = await pool.query("SELECT * FROM cultivo WHERE id_cultivo=?", [id_cultivo]);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                mensaje: "No se encontró un cultivo con ese ID"
            });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error en el sistema: ' + error });
    }
};

export const desactivar = async (req, res) => {
    try {
        const { id_cultivo } = req.params;
        const [oldRecurso] = await pool.query("SELECT * FROM cultivo WHERE id_cultivo = ?", [id_cultivo]); 

        if (oldRecurso.length > 0) {
            const [result] = await pool.query(
                `UPDATE cultivo SET estado = 'inactivo' WHERE id_cultivo = ?`, [id_cultivo]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: 'Se desactivo con éxito',
                    result: result
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: 'No se encontró el cultivo para desactivar'
                });
            }
        } 
    } catch (error) {
            res.status(500).json({ status: 500, message: 'Error en el sistema: ' + error });
    }
}
