const CategoryController = {
    listAll: (req, res) => {
        res.send('Listado de categorias');
    },

    create: (req, res) => {
        res.send('Crear una categoria');
    },

    update: (req, res) => {
        res.send('Actualizar una categoria');
    },

    delete: (req, res) => {
        res.send('Borrar una categoria');
    }
}