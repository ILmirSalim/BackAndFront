const TodosModel = require('../models/TodosModel')

class TodosController {

    async getTodos(req, res) {
        try {
            const todosData = await TodosModel.find({}, "title")
            res.status(200).json({ todos: todosData })
        } catch (e) {
            console.log('this is error', e.message)
            res.status(400).json({ message: e.message })
        }
    };

    async addTodo(req, res) {
        try {
            if (!req.body.title) {
                res.status(400).json({ message: 'Пожалуйста добавьте заголовок' })
            }

            const todoModel = new TodosModel({ title: req.body.title })

            await todoModel.save()
            res.status(200).json({ message: 'Элемент успешно добавлен' })
        } catch (error) {
            res.status(400).json({ message: 'Произошла ошибка при добавлении' })
        }
    };

    async deleteTodo(req, res) {
        try {
            if (!req.body.id) {
                res.status(400).json({ message: 'Пожалуйста укажите id заголовка' })
            }

            const { deletedCount } = await TodosModel.findByIdAndDelete({ _id: req.body.id })

            if (deletedCount === 0) {
                res.status(400).json({ massege: 'Удаление не произошло, пожалуйста проверьте id заголовка' })
            }

            res.status(200).json({ message: 'Элемент успешно удален' })
            
        } catch (error) {
            res.status(400).json({ massege: 'Произошла ошибка при удалении' })
        }
    }

    async updateTodo(req, res) {
        try {
            if (!req.body.id) {
                res.status(400).json({ message: 'Пожалуйста укажите id заголовка' })
            }

            const updateItem = await TodosModel.findByIdAndUpdate({_id: req.body.id}, {title: req.body.titleTwo}, {new: true});
            
            res.status(200).json({ message: 'Элемент успешно изменен' })
            
        } catch (error) {
            res.status(400).json({ massege: 'Произошла ошибка при удалении' })
        }
    }
}

module.exports = new TodosController()