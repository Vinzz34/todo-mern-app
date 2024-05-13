import { useState } from "react"
import useSignup from "../hooks/useSignup"

const Signup = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {signup,error,isLoading} = useSignup()


  async function handleSubmit(e){
    e.preventDefault()

    await signup(email,password)
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-desatBlue dark:text-dark-lightGrayishBlue mt-16 p-6 shadow-2xl leading-none rounded-md">
        <h2 className="text-2xl font-medium">Sign up</h2>

        <div className="mt-6 grid gap-2">
          <label>Email:</label>
          <input className="border-2 rounded-md p-2 border-gray-300 dark:border-dark-veryDarkGrayishBlue2 outline-none leading-none dark:bg-dark-veryDarkGrayishBlue2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mt-2 grid gap-2">
          <label>Password:</label>
          <input className="border-2 rounded-md p-2 border-gray-300 dark:border-dark-veryDarkGrayishBlue2 outline-none leading-none dark:bg-dark-veryDarkGrayishBlue2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="mt-6 bg-green-700 hover:bg-green-600 transition-colors duration-300 text-white dark:text-dark-lightGrayishBlue p-3 rounded-md disabled:bg-gray-400" disabled={isLoading} type="submit">Sign up</button>

      </form>

      {error && (
        <div className="mt-4 p-3 border-2 rounded-md border-red-400 bg-red-400/25 text-red-500 leading-none">{error}</div>
      )}
    </div>
  )
}

export default Signup