const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ctrl = require('../controllers/student.controller')

// public: none
// protected: list/get
router.get('/', auth, ctrl.list)
router.get('/count', auth, ctrl.count)
router.get('/:id', auth, ctrl.get)

// authenticated writes (no admin restriction)
router.post('/', auth, ctrl.create)
router.put('/:id', auth, ctrl.update)
router.delete('/:id', auth, ctrl.remove)

module.exports = router
