import './App.css';
import { TodoList } from './components/TodoList/index'
import { AddTodoItem } from './components/AddTodoItem/index'
import { useCallback, useEffect, useState } from "react"
import { useGetTodoList } from "./hooks/useGetTodoList"

function App() {
  const [todoList, setTodoList] = useState([])
  const [selectedTitle, setSelectedTitle] = useState(null)

  const selectTitle = (title) => {
    setSelectedTitle(title)
  }

  const getTodoList = useGetTodoList()

  const updateTodoList = useCallback(() => {
    getTodoList().then((result) => setTodoList(result.todos))
  }, [getTodoList])

  useEffect(() => {
    updateTodoList()
  }, [updateTodoList])

  return (
    <div className="App">
      <h1>Мои задачи:</h1>
      <TodoList todoList={todoList}
        updateTodoList={updateTodoList}
        selectTitle={selectTitle}
      />
      <br />
      <AddTodoItem
        updateTodoList={updateTodoList}
        selectedTitle={selectedTitle}
      />
    </div>
  );
}

export default App;
