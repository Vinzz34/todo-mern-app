import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

const useTodosContext = () => {
    const context = useContext(TodosContext)

    if(!context){
        throw new Error("useTodosContext must be used inside TodosContextProvider")
    }

    return context
}

export default useTodosContext
