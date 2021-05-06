const router = require('express').Router()
const adminController = require('../controllers/adminController')
const {upload} = require('../middlewares/multer')

router.get('/', adminController.viewDashboard)
router.get('/category', adminController.viewCategory)
router.post('/category', adminController.addCategory)
router.put('/category', adminController.updateCategory)
router.delete('/category/:id', adminController.deleteCategory)
router.get('/bank', adminController.viewBank)
router.post('/bank', upload, adminController.addBank)
router.put('/bank', upload, adminController.updateBank)
router.get('/item', adminController.viewItem)
router.get('/booking', adminController.viewBooking)

module.exports = router