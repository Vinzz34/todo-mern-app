/* eslint-disable react/prop-types */
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const Header = ({darkMode,setDarkMode}) => {

  const {user} = useAuthContext()

  const {logout} = useLogout()

  const {pathname} = useLocation() 

  function handleMode(){
    setDarkMode(d => !d);
  }

  function handleClick(){
    logout()
  }

  return (
    <div className="mt-12 sm:mt-[72px] mb-9 flex justify-between items-center w-full">
      <Link to='/' className="text-white text-2xl sm:text-[40px] tracking-[10px] sm:tracking-[16px] font-bold">TODO</Link>
      <div className="flex items-center gap-4">
        <img className="cursor-pointer" src={`${darkMode ? sun : moon }`} onClick={handleMode} alt="mode" />
        {user && (
          <button onClick={handleClick} className="border-2 border-red-600 text-red-600 bg-red-600/10 dark:border-red-400 dark:text-red-400 dark:bg-red-400/10 px-2 rounded-md">Logout</button>
        )}
        {(!user && pathname == '/login') && (
          <Link className="border-2 border-green-300 text-green-300 bg-green-300/10 dark:border-green-500 dark:text-green-500 dark:bg-green-500/10 px-2 rounded-md" to='/signup'>Sign up</Link>
        )}
        {(!user && pathname == '/signup') && (
          <Link className="border-2 border-green-300 text-green-300 bg-green-300/10 dark:border-green-500 dark:text-green-500 dark:bg-green-500/10 px-2 rounded-md" to='/login'>Log in</Link>
        )}
      </div>
    </div>
  )
}

export default Header