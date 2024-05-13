const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

// get all todos
const getTodos = async (req,res) => {
    
    const user_id = req.user._id

    const todos = await Todo.find({ user_id }).sort({createdAt : -1})
    res.status(200).json(todos)
}

// create new todo
const createTodo = async (req,res) => {
    const {text} = req.body

    try{
        const user_id = req.user._id
        const todo = await Todo.create({text,user_id})
        res.status(200).json(todo)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

// delete todos

const deleteTodos = async (req,res) => {
    
    try{
        const user_id = req.user._id

        const json = await Todo.deleteMany({user_id,completed: true})

        res.status(200).json(json)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

// delete a todo
const deleteTodo = async (req,res) => {

    const {id} = req.params

   if(!mongoose.isValidObjectId(id)){
    return res.status(404).json({error: "no such todo"})
   } 

    const todo = await Todo.findByIdAndDelete(id)

    if(!todo){
        return res.status(400).json({error: "no such todo"})
    }

    res.status(200).json(todo)
}

// update a todo
const updateTodo = async (req,res) => {

    const {id} = req.params
    const {completed} = req.body

   if(!mongoose.isValidObjectId(id)){
    return res.status(404).json({error: "no such todo"})
   } 

    const todo = await Todo.findByIdAndUpdate(id,{completed : completed})

    if(!todo){
        return res.status(400).json({error: "no such todo"})
    }

    res.status(200).json(todo)
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodos,
    deleteTodo,
    updateTodo
}