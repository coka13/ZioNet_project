import { getTodosService, updateTodoService } from "../services/todoServices.js";

// Get all todos
export const getTodosController = async (req, res) => {
  try {
    const todos = await getTodosService(); 
    if (!todos || todos.length === 0) {
      return res.status(404).json({ error: 'Todos not found' });
    } else {
      res.status(200).json(todos);
    }
  } catch (error) {
    console.error('Error retrieving Todos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update todo status by id
export const updateTodoController = async (req, res) => {
  console.log(req.body);
  try {
    const { id, completed } = req.body;
    const todo = await updateTodoService(id, completed);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo status updated' });
    }
  } catch (error) {
    console.error('Error updating Todo status:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
