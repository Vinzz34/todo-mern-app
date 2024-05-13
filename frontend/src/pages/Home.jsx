import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
        <TodoForm />
        <TodoList />
        <Footer />
    </div>
  )
}

export default Home