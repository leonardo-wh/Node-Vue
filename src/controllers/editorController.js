const Editor = require('../models/editor');
const Joi = require('joi');

exports.getEditores = async (req, res) => {
    try {
        const editores = await Editor.findAll();
        res.json(editores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los editores' });
    }
};

exports.createEditor = async (req, res) => {
    const { nombre, domicilio, ciudad, estado, pais, website } = req.body;

    const schema = Joi.object({
        nombre: Joi.string().required(),
        domicilio: Joi.string().required(),
        ciudad: Joi.string().required(),
        estado: Joi.string().required(),
        pais: Joi.string().required(),
        website: Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body);

        const editor = await Editor.create({ nombre, domicilio, ciudad, estado, pais, website });

        res.json(editor);
    } catch (error) {
        console.error(error);

        if (error.details) {
            const missingFields = error.details.map((detail) => detail.path.join('.'));
            res.status(400).json({ message: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        } else {
            res.status(500).json({ message: 'Error al crear el editor' });
        }
    }
};

exports.updateEditor = async (req, res) => {
    const { id } = req.params;
    const { nombre, domicilio, ciudad, estado, pais, website } = req.body;

    const schema = Joi.object({
        nombre: Joi.string().required(),
        domicilio: Joi.string().required(),
        ciudad: Joi.string().required(),
        estado: Joi.string().required(),
        pais: Joi.string().required(),
        website: Joi.string().required(),
    });

    try {
        await schema.validateAsync(req.body);

        const editor = await Editor.findByPk(id);
        if (!editor) {
            return res.status(404).json({ message: 'Editor no encontrado' });
        }

        editor.nombre = nombre;
        editor.domicilio = domicilio;
        editor.ciudad = ciudad;
        editor.estado = estado;
        editor.pais = pais;
        editor.website = website;
        await editor.save();

        res.json(editor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el editor' });
    }
};

exports.deleteEditor = async (req, res) => {
    const { id } = req.params;

    try {
        const editor = await Editor.findByPk(id);
        if (!editor) {
            return res.status(404).json({ message: 'Editor no encontrado' });
        }

        await editor.destroy();
        res.json({ message: 'Editor eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el editor' });
    }
};