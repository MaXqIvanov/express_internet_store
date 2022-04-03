const Router = require('express')
const router = new Router()

const goodsController = require('../controllers/goodsController')
const basketController = require('../controllers/basketController')
const ordersController = require('../controllers/ordersController')
const UserController = require('../controllers/UserController')


// User
router.get('/users/:id', UserController.getOne)
router.post('/users', UserController.createNew)
router.post('/users/:id', UserController.setRaitingProod)





// Goods
router.get('/goods/:type', goodsController.getAll )
router.get('/goods/:id', goodsController.getOne)
router.post('/goods/:id', goodsController.setRaiting)


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