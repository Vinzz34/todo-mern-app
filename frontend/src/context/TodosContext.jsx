import { createContext, useReducer } from "react";

export const TodosContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const todosReducer = (state,action) => {
    switch(action.type){
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos : [action.payload,...state.todos]
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter(todo => todo._id!==action.payload._id)
            }
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map(todo => {
                    if(todo._id === action.payload._id){
                        return {
                            ...todo,completed : !todo.completed
                        }
                    }
                    else{
                        return todo
                    }
                })
            }
        case 'CLEAR_TODOS':
            return {
                todos: state.todos.filter(todo => todo.completed === false)
            }
        default:
            return state

    }
}

// eslint-disable-next-line react/prop-types
export const TodosContextProvider = ({children}) => {

    const [state,dispatch] = useReducer(todosReducer,{todos: []})

    return(
        <TodosContext.Provider value={{...state,dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}