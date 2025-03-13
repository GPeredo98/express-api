const { Router } = require('express');
const router = Router();
const db = require('../config/database');


router.get('/lista', async (req, res) => {

    const productos = await db.query('SELECT * FROM productos');
    res.send({'data': productos, 'success': true, 'message': 'Lista de productos'});

})


router.get('/:id', async (req, res) => {

    const producto = await db.query('SELECT * FROM productos WHERE id = ?', req.params.id);
    res.send({'data': producto, 'success': true, 'message': 'Producto obtenido'});

})


router.post('/', (req, res) => {

    const nuevoProducto = req.body;

    db.query('INSERT INTO productos SET ?', [nuevoProducto], (err) => {
        if(!err) {
            res.send({'data': nuevoProducto, 'success': true, 'message': 'Producto agregado'});
        } else {
            res.send({'data': err.sqlMessage, 'success': false, 'message': 'Ocurrió un error al insertar el producto'});
        }
    });

});


router.put('/:id', async (req, res) => {
    
    const producto = await db.query('SELECT * FROM productos WHERE id = ?', req.params.id);

    if (producto.length > 0) {
        const productoEditado = req.body;
        db.query('UPDATE productos SET ? WHERE id = ?', [productoEditado, req.params.id], (err) => {
            if(!err) {
                res.send({'data': productoEditado, 'success': true, 'message': 'Producto editado'});
            } else {
                res.send({'data': err.sqlMessage, 'success': false, 'message': 'Ocurrió un error al editar el producto'});
            }
        });
    } else {
        res.send({'data': null, 'success': false, 'message': 'Producto no encontrado'})
    }

});


router.delete('/:id', async (req, res) => {

    const producto = await db.query('SELECT * FROM productos WHERE id = ?', req.params.id);

    if (producto.length > 0) {
        db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
            if(!err) {
                res.send({'data': producto, 'success': true, 'message': 'Producto eliminado'});
            } else {
                res.send({'data': err.sqlMessage, 'success': false, 'message': 'Ocurrió un error al eliminar el producto'});
            }
        });
    } else {
        res.send({'data': null, 'success': false, 'message': 'Producto no encontrado'})
    }

});


router.patch('/cambiar_estado/:id', async (req, res) => {
    
    const productos = await db.query('SELECT * FROM productos WHERE id = ?', req.params.id);

    if (productos.length > 0) {

        producto = productos[0];
        producto.disponible = !producto.disponible;

        db.query('UPDATE productos SET ? WHERE id = ?', [producto, req.params.id], (err) => {
            if(!err) {
                res.send({'data': producto, 'success': true, 'message': 'Estado cambiado'});
            } else {
                res.send({'data': err.sqlMessage, 'success': false, 'message': 'Ocurrió un error al editar el producto'});
            }
        });

    } else {
        res.send({'data': null, 'success': false, 'message': 'Producto no encontrado'})
    }

});

module.exports = router;