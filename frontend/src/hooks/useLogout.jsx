import useAuthContext from "./useAuthContext"
import useTodosContext from "./useTodosContext"

const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: todosDispatch} = useTodosContext()
    
    const logout = () => {

        //remove user from localstorage
        localStorage.removeItem('user')

        dispatch({type: "LOGOUT"})
        todosDispatch({type: "SET_TODOS",payload: null})
    }

    return {logout}
}

export default useLogout