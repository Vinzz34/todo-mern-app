/* eslint-disable react/prop-types */
import TodoItem from "../components/TodoItem"
import Filters from "../components/Filters"
import { useState,useEffect } from "react";
import { DragDropContext,Droppable } from "react-beautiful-dnd";
import useTodosContext from "../hooks/useTodosContext";
import useAuthContext from "../hooks/useAuthContext";

const TodoList = () => {

  const [status,setStatus] = useState("all");
  const [newTodos,setNewTodos] = useState([]);

  const {user} = useAuthContext()
  const {todos,dispatch} = useTodosContext()

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/todos`,{
        headers: {
          'Authorization' : `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      console.log(json)

      if(response.ok){
        dispatch({type: 'SET_TODOS',payload: json || []})
      }
    
    }

    if(user){
      fetchData()
    }
  },[dispatch,user])

  useEffect(() => {
      switch(status){
          case "active":
              setNewTodos(todos.filter(todo => todo.completed === false));
              break;
          case "completed":
              setNewTodos(todos.filter(todo => todo.completed === true));
              break;
          default:
              setNewTodos(todos);
      }
  },[todos,status]);

  function handleOnDragEnd(e){
    if(!e.destination) return;
    const orderedTodos = Array.from(newTodos);
    const [reorderedTodo] = orderedTodos.splice(e.source.index,1);
    orderedTodos.splice(e.destination.index,0,reorderedTodo);

    dispatch({type: "SET_TODOS",payload: orderedTodos})
  }

  return (
    <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-white dark:bg-dark-desatBlue rounded-t-md">
                        {newTodos.map((todo,index) => (
                            <TodoItem key={todo._id} index={index} id={todo._id} text={todo.text} completed={todo.completed} />
                        ))}
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <Filters status={status} setStatus={setStatus} /> 
    </div>
  )
}

export default TodoList