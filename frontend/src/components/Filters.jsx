/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import useTodosContext from "../hooks/useTodosContext";
import useAuthContext from "../hooks/useAuthContext";

const Filters = ({status,setStatus}) => {

    const [count,setCount] = useState(0);

    const {user} = useAuthContext()

    const {todos,dispatch} = useTodosContext()
    
    useEffect(() => {
        setCount(todos.filter(todo => todo.completed === false).length)
    },[todos]);

    async function handleClear(){
        if(user){
            const response = await fetch('http://localhost:4000/api/todos/',{
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })

            if(response.ok){
                dispatch({type: "CLEAR_TODOS"})
            }

        }
    }

    function handleAll(){
        setStatus("all");
    }
    function handleActive(){
        setStatus("active");
    }
    function handleCompleted(){
        setStatus("completed");
    }

  return (
    <div>
        <div className={`sm:shadow-2xl text-base flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 bg-white dark:bg-dark-desatBlue text-light-grayishBlue dark:text-dark-darkGrayishBlue rounded-b-md`}>
            <p className="max-w-[100px] w-full">{count} items left</p>
            <div className=" hidden sm:flex items-center justify-center gap-4 bg-white dark:bg-dark-desatBlue font-bold text-light-grayishBlue dark:text-dark-darkGrayishBlue">
                <button onClick={handleAll} className={`${status === "all" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>All</button>
                <button onClick={handleActive} className={`${status === "active" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>Active</button>
                <button onClick={handleCompleted} className={`${status === "completed" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>Completed</button>
            </div>
            <button onClick={handleClear} className="hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300">Clear Completed</button>
        </div>
        <div className="sm:hidden shadow-2xl mt-4 px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-center gap-4 bg-white dark:bg-dark-desatBlue font-bold text-light-grayishBlue dark:text-dark-darkGrayishBlue rounded-md">
            <button onClick={handleAll} className={`${status === "all" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>All</button>
            <button onClick={handleActive} className={`${status === "active" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>Active</button>
            <button onClick={handleCompleted} className={`${status === "completed" ? "text-bright-blue" : ""} hover:text-light-darkGrayishBlue hover:dark:text-dark-lightGrayishBlueHover transition-colors duration-300`}>Completed</button>
        </div>
    </div>
  )
}

export default Filters