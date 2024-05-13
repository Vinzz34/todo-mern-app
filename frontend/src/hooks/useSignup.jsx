import { useState } from "react"
import useAuthContext from "./useAuthContext"

const useSignup = () => {
    
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)

    const {dispatch} = useAuthContext()

    async function signup(email,password){
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/user/signup`,{
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            // save user to localStorage
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type: "LOGIN",payload: json})
        }

        setIsLoading(false)
    }

    return {signup,error,isLoading}
}

export default useSignup