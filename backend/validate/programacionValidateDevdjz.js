import { check } from "express-validator";

// Registrar Asignación
export const programacionC = [
    check('fk_id_usuario', 'El campo de clave foránea debe contener solo números naturales o el fk_id_usuario no existe').isInt(),
    check('fk_id_cultivo', 'El campo de clave foránea debe contener solo números naturales o el fk_id_cultivo no existe').isNumeric(),
    check('fk_id_actividad', 'El campo de clave foránea debe contener solo números naturales o el fk_id_actividad no existe').isInt(),
    check('fecha_inicio', 'La fecha de la programacion debe ser YYYY-MM-DD, y no puede contener letras y barras').not().isEmpty().optional().isLength({ max: 20 }).matches(/^\d{4}-\d{2}-\d{2}$/),
    check('fecha_fin', 'La fecha de la programacion debe ser YYYY-MM-DD, y no puede contener letras y barras').not().isEmpty().optional().isLength({ max: 20 }).matches(/^\d{4}-\d{2}-\d{2}$/),
    check('estado', 'El estado es obligatorio y solo puede ser "acabo", "noacabo", o "proceso"').isIn(['acabo', 'noacabo', 'proceso'])
];

// Actualizar Asignación
export const programacionA = [
    check('fk_id_usuario', 'El campo de clave foránea debe contener solo números naturales o el fk_id_usuario no existe').isNumeric(),
    check('fk_id_cultivo', 'El campo de clave foránea debe contener solo números naturales o el fk_id_cultivo no existe').isNumeric(),
    check('fk_id_actividad', 'El campo de clave foránea debe contener solo números naturales o el fk_id_actividad no existe').isNumeric(),
    check('fecha_inicio', 'La fecha de la programacion debe ser YYYY-MM-DD, y no puede contener letras y barras').not().isEmpty().optional().isLength({ max: 20 }).matches(/^\d{4}-\d{2}-\d{2}$/),
    check('fecha_fin', 'La fecha de la programacion debe ser YYYY-MM-DD, y no puede contener letras y barras').not().isEmpty().optional().isLength({ max: 20 }).matches(/^\d{4}-\d{2}-\d{2}$/),
    check('estado', 'El estado es obligatorio y solo puede ser "acabo", "noacabo", o "proceso"').isIn(['acabo', 'noacabo', 'proceso'])
];

//nn