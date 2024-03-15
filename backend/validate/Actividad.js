import { check } from "express-validator";

//REGISTRAR
export const validarRR = [
        check('nombre_actividad').notEmpty().matches(/^[A-Za-zñÑ\s]+$/).withMessage('El campo de actividad solo debe contener letras y espacios').withMessage('El campo de actividad solo debe contener letras y espacios'),
        check('tiempo', 'El campo tiempo es obligatorio y debe tener el formato HH:MM:SS').not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
        check('observaciones', 'El campo de observaciones debe tener máximo 255 caracteres').optional().matches(/^[a-zA-Z]+[a-zA-Z0-9\s\S]{0,254}$/),    
        check('fk_id_variedad', 'El campo de identificación de variedad debe ser un número entero').isInt(),
        check('valor_actividad', 'El campo de valor de actividad debe ser un número').isInt().isNumeric(),

        check('estado', 'El campo de estado debe ser "activo" o "inactivo"').optional().isIn(['activo', 'inactivo'])
    ];
    
//ACTUALIZAR
//actu
export const validarRA = [
        check('nombre_actividad').optional().matches(/^[A-Za-zñÑ\s]+$/).withMessage('El campo de actividad solo debe contener letras'),
        check('tiempo', 'El campo de tiempo es obligatorio y debe tener el formato HH:MM:SS').optional().not().isEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
        check('observaciones', 'El campo de observaciones debe tener máximo 255 caracteres')
        .optional().matches(/^[a-zA-Z]+[a-zA-Z0-9\s\S]{0,254}$/),    
        check('fk_id_variedad', 'El campo de identificación de variedad debe ser un número enteros').optional().isNumeric(),
        check('valor_actividad', 'El campo de valor de actividad debe ser un número decimales').optional().isNumeric()
    ];
    