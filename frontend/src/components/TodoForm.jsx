/* eslint-disable react/prop-types */
import { useState } from "react";
import useTodosContext from "../hooks/useTodosContext";
import useAuthContext from "../hooks/useAuthContext";

const TodoForm = () => {

  const [input,setInput] = useState("");

  const {dispatch} = useTodosContext()

  const {user} = useAuthContext()

  async function handleFormSubmit(e){
    e.preventDefault();
    if(user){
      if(input.trim() !== ""){
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/todos`, {
          method: "POST",
          body: JSON.stringify({text:input}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${user.token}`
          }
        })

        const json = await response.json()

        if(response.ok){
          dispatch({type: 'CREATE_TODO',payload: json})
          setInput("")
        }
      }
    }
  }

  function handleInputChange(e){
    setInput(e.target.value);
  }

  return (
    <form className="mb-4 sm:mb-6 bg-white dark:bg-dark-desatBlue flex items-center gap-[12px] sm:gap-6 px-5 sm:px-6 py-[14px] sm:py-[18px] rounded-md" onSubmit={e => handleFormSubmit(e)}>
      <input className="w-5 h-5 appearance-none bg-transparent border-2 rounded-full border-light-lightGrayishBlue dark:border-dark-veryDarkGrayishBlue" type="checkbox" disabled />
      <input className="bg-transparent flex-1 w-full pt-1 outline-none text-light-darkGrayishBlue dark:text-dark-lightGrayishBlue placeholder:text-light-grayishBlue placeholder:dark:text-dark-darkGrayishBlue" placeholder="Create a new todo..." value={input} onChange={e => handleInputChange(e)} type="text" />
      <button className="hidden" type="submit"></button>
    </form>
  )
}

export default TodoForm