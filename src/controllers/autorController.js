const Autor = require('../models/autor');
const Joi = require('joi');

exports.getAutores = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los autores' });
    }
};

exports.createAutor = async (req, res) => {
    const { nombre, apellidos, email } = req.body;

    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellidos: Joi.string().required(),
        email: Joi.string().email().required(),
    });

    try {
        await schema.validateAsync(req.body);

        const autor = await Autor.create({ nombre, apellidos, email });

        res.json(autor);
    } catch (error) {
        console.error(error);

        if (error.details) {
            const missingFields = error.details.map((detail) => detail.path.join('.'));
            res.status(400).json({ message: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        } else {
            res.status(500).json({ message: 'Error al crear el autor' });
        }
    }
};

exports.updateAutor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, email } = req.body;

    const schema = Joi.object({
        nombre: Joi.string().required(),
        apellidos: Joi.string().required(),
        email: Joi.string().email().required(),
    });

    try {
        await schema.validateAsync(req.body);

        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        autor.nombre = nombre;
        autor.apellidos = apellidos;
        autor.email = email;
        await autor.save();

        res.json(autor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el autor' });
    }
};

exports.deleteAutor = async (req, res) => {
    const { id } = req.params;

    try {
        const autor = await Autor.findByPk(id);
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        await autor.destroy();
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el autor' });
    }
};