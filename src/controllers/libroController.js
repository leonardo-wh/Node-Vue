const Libro = require('../models/libro');
const Joi = require('joi');

exports.getLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};

exports.createLibro = async (req, res) => {
    const { titulo, fecha_publicacion, portada, autores, editorId } = req.body;

    const schema = Joi.object({
        titulo: Joi.string().required().messages({
            'any.required': 'El título es un campo requerido',
            'string.empty': 'El título no puede estar vacío',
        }),
        fecha_publicacion: Joi.date().required().messages({
            'any.required': 'La fecha de publicación es un campo requerido',
            'date.base': 'La fecha de publicación debe ser una fecha válida',
        }),
        portada: Joi.string().required().messages({
            'any.required': 'La portada es un campo requerido',
            'string.empty': 'La portada no puede estar vacía',
        }),
        autores: Joi.array().items(Joi.string()).required().messages({
            'any.required': 'Debe seleccionar al menos un autor',
            'array.empty': 'Debe seleccionar al menos un autor',
        }),
        editorId: Joi.number().required().messages({
            'any.required': 'El ID del editor es un campo requerido',
            'number.base': 'El ID del editor debe ser un número',
        }),
    });

    try {
        await schema.validateAsync(req.body);

        const libro = await Libro.create({ titulo, fecha_publicacion, portada, editorId });

        // Establecer la relación con los autores
        await libro.setAutors(autores);

        res.json(libro);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al crear el libro', errors: error.details });
    }
};

exports.updateLibro = async (req, res) => {
    const { id } = req.params;
    const { titulo, fecha_publicacion, portada, autores, editorId } = req.body;

    const schema = Joi.object({
        titulo: Joi.string().required(),
        fecha_publicacion: Joi.date().required(),
        portada: Joi.string().required(),
        autores: Joi.array().items(Joi.string()).required(),
        editorId: Joi.number().required(),
    });

    try {
        await schema.validateAsync(req.body);

        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        libro.titulo = titulo;
        libro.fecha_publicacion = fecha_publicacion;
        libro.portada = portada;
        libro.editorId = editorId;
        await libro.save();
        await libro.setAutores(autores);

        res.json(libro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};

exports.deleteLibro = async (req, res) => {
    const { id } = req.params;

    try {
        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        await libro.destroy();
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
};