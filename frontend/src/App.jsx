import { useEffect, useState } from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {

  const [darkMode,setDarkMode] = useState(true);

  const {user} = useAuthContext()

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if(savedMode){
      savedMode === "dark" ? setDarkMode(true) : setDarkMode(false);
    }
    else{
      window.matchMedia('(prefers-color-scheme:dark)').matches ? setDarkMode(true) : setDarkMode(false); 
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      event.matches ? setDarkMode(true) : setDarkMode(false);
    });
  },[]);


  useEffect(() => {
    if(darkMode){
      localStorage.setItem("mode","dark")
    }
    else{
      localStorage.setItem("mode","light")
    }
  },[darkMode]);

  return (
    <div className={`${darkMode ? "dark" : ""}  w-full h-screen sm:text-lg overflow-x-hidden px-6 bg-light-gray dark:bg-dark-blue bg-mobile-light dark:bg-mobile-dark sm:bg-desktop-light sm:dark:bg-desktop-dark bg-no-repeat bg-[length:100vw_30vh] sm:bg-[length:100vw_37.5vh]`}>
      <div className="max-w-[540px] mx-auto">
        <BrowserRouter>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App