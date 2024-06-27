import {   getTodosService} from "../services/todoServices.js";

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
