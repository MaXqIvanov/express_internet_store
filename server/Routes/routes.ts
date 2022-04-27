const Router = require('express')
const router = new Router()

const goodsController = require('../controllers/goodsController')
const basketController = require('../controllers/basketController')
const ordersController = require('../controllers/ordersController')
const UserController = require('../controllers/UserController')
const adminController = require('../controllers/adminController')
const messagesController = require('../controllers/messagesController')

const authMiddleware = require('../middleware/authMiddleware')
// User
router.get('/users/:email', UserController.getOne)  
router.post('/users/auth', UserController.auth)
router.post('/users/regist', UserController.createNew)
router.post('/users/:id', UserController.setRaitingProod)
router.get('/activate/:link', UserController.setActivated)
// Messages
router.get('/messages/:id', messagesController.getAll)
router.post('/messages/:id', messagesController.createNewPost)
router.post('/messages/delete/:id',messagesController.deletePost)
router.post('/messages/send/telegram', messagesController.sendTelegram)

// Goods
router.get('/goods/:type', goodsController.getAll )
router.post('/goods', goodsController.create)
router.post('/goods/:id', goodsController.setRaiting)
router.post('/goods/delete/:id', goodsController.deleteOne)


// Orders

// router.get('/orders', ordersController.getAll)
router.post('/orders', ordersController.create)

// Baskets
router.get('/basket', basketController.getAll)
router.get('/basket/:id', basketController.getOne)
router.post('/basket', basketController.create)
router.put('/basket/:id', basketController.updates)
router.delete('/basket/:id', basketController.removes)

//ADMIN_PANEL
router.post('/admin/:id',authMiddleware, adminController.getAll)




module.exports = router
