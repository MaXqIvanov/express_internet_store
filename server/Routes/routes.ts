const Router = require('express')
const router = new Router()

const goodsController = require('../controllers/goodsController')
const basketController = require('../controllers/basketController')



router.get('/goods', goodsController.getAll )



router.get('/basket', basketController.getAll)
router.get('/basket/:id', basketController.getOne)
router.post('/basket', basketController.create)
router.put('/basket/:id', basketController.updates)
router.delete('/basket/:id', basketController.removes)

module.exports = router