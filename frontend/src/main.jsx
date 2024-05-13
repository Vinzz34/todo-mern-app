import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodosContextProvider } from './context/TodosContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </AuthContextProvider>
)
