import './style.css'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { Loader } from '../Loader';

export const TodoList = ({ todoList, updateTodoList, selectTitle }) => {

    const deleteItem = useDeleteItem('http://localhost:3002/api/todos/delete', 'delete');
    const deleteTodoItem = async (id) => {
        await deleteItem(id)
        updateTodoList()
    }

    return <>
        {
            !todoList.length && <Loader />
        }
        {
            todoList.map((item) => <div className='todolist' key={item._id}>
                <span className='itemTitle' onClick={() => selectTitle(item)}>
                    {item.title}
                </span>
                <span className="deleteSpan" onClick={() => deleteTodoItem(item._id)}>Удалить</span>
            </div>)
        }
    </>
}