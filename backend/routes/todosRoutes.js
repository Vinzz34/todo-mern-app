const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {createTodo,getTodos,deleteTodos,deleteTodo,updateTodo} = require('../controllers/todoController')

const router = express.Router()

router.use(requireAuth)

router.get('/',getTodos)

router.post('/',createTodo)

router.delete('/',deleteTodos)

router.delete('/:id',deleteTodo)

router.patch('/:id',updateTodo)

module.exports = router;