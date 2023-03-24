import { useEffect, useState} from "react"
import { useAddItem } from '../../hooks/useAddItem'

export const AddTodoItem = ({ updateTodoList, selectedTitle }) => {
    const [title, setTitle] = useState('')
    const [titleTwo, setTitleTwo] = useState('')
    const addItem = useAddItem('http://localhost:3002/api/todos/add', 'POST', title);

    const updateTitle = async() => {
        
        try {
            const res = await fetch(`http://localhost:3002/api/todos/update`, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    titleTwo
                })
            })

            if (res.status !== 200) {
                const json = await res.json()
                alert(json.message)
                return
            }
            updateTodoList()
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addItem()
        updateTodoList()
    }
    
    useEffect(() => {
        if (selectedTitle) {
            setTitle(selectedTitle.title)
        }
    }, [selectedTitle])

    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <button type="submit">Добавить</button>
        </form>
        <input className="inputTwo" type="text"
            placeholder="Введите новое значение для изменения"
            value={titleTwo}
            onChange={(e) => setTitleTwo(e.target.value)}
        />
        <button onClick={updateTitle}>Отправить новое значение</button>
    </>
    )
}