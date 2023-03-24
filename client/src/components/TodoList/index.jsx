import './style.css'
import { useDeleteItem } from '../../hooks/useDeleteItem'

export const TodoList = ({ todoList, updateTodoList, selectTitle }) => {
    
    const deleteItem = useDeleteItem('http://localhost:3002/api/todos/delete', 'delete');
    const deleteTodoItem = (title) => {
        deleteItem(title)
        updateTodoList()
    }

    return <>
        {
            !todoList.length && <div>Loading...</div>
        }
        {
            todoList.map((item) => <div className='todolist' key={item._id}>
                <span onClick={()=>selectTitle(item)}>
                    {item.title}
                </span>
                <span className="deleteSpan" onClick={()=>deleteTodoItem(item.title)}>Удалить</span>
                <span className="deleteSpan">Удалить два</span>
                </div>)
        }
    </>
}