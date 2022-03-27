const Router = require('express')
const router = new Router()

const goodsController = require('../controllers/goodsController')
const basketController = require('../controllers/basketController')
const ordersController = require('../controllers/ordersController')

// Goods
router.get('/goods', goodsController.getAll )
router.get('/goods/:id', goodsController.getOne)



// Orders

// router.get('/orders', ordersController.getAll)
router.post('/orders', ordersController.create)

// Baskets
router.get('/basket', basketController.getAll)
router.get('/basket/:id', basketController.getOne)
router.post('/basket', basketController.create)
router.put('/basket/:id', basketController.updates)
router.delete('/basket/:id', basketController.removes)

module.exports = router