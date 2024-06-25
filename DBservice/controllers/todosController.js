import { addTodoService,  deleteTodoByIDService,  getTodosService, updateTodoService } from "../services/todoServices.js";

// Get all todos
export const getTodosController = async (req, res) => {
  try {
    const todos = await getTodosService();
    if (!todos || todos.length === 0) {
      if(todos.length === 0){
        res.status(200).json({});
      }
      else{

        return res.status(404).json({ error: 'Todos not found' });
      }
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

// Add todo
export const addTodoController = async (req, res) => {
  try {
    const { task} = req.body;
    const todo = await addTodoService(task);
    if (!todo) {
      return res.status(400).json({ error: 'Invalid data' });
    } else {
      res.status(201).json(todo);
    }
  } catch (error) {
    console.error('Error adding Todo:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteTodoByIDController = async (req, res) => {
try{
    const { id } = req.params;
    const todo = await deleteTodoByIDService(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json({ message: 'Todo deleted' });
    }
  } catch (error) {
    console.error('Error deleting Todo:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}