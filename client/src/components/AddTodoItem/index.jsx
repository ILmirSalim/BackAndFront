import { useEffect, useState } from "react"
import { useAddItem } from '../../hooks/useAddItem'
import { useUpdateItem } from '../../hooks/useUpdateItem'
import './style.css'

export const AddTodoItem = ({ updateTodoList, selectedTitle }) => {
    const [title, setTitle] = useState('')
    const [titleTwo, setTitleTwo] = useState('')
    const [id, setId] = useState('')

    const addItem = useAddItem('http://localhost:3002/api/todos/add', 'POST', title);
    const updateItem = useUpdateItem('http://localhost:3002/api/todos/update', "put", titleTwo)

    const updateTitle = async (id) => {
        await updateItem(id)
        updateTodoList()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await addItem()
        setTimeout(() => updateTodoList(), 100)
    }

    useEffect(() => {
        if (selectedTitle) {
            setTitle(selectedTitle.title)
            setId(selectedTitle._id)
        }
    }, [selectedTitle])

    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <button className="buttonSubmit" type="submit">Добавить значение</button>
        </form>
        <input className="inputTwo" type="text"
            placeholder="Введите новое значение для изменения"
            value={titleTwo}
            onChange={(e) => setTitleTwo(e.target.value)}
        />
        <button className="buttonSubmit" onClick={() => updateTitle(id)}>Отправить новое значение</button>
    </>
    )
}