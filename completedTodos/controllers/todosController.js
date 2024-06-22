import axios from 'axios';
export const completedTodos = async (req, res) => {
    console.log('Request received:', req.body);
    try {
      // Fetch all todos from the first microservice
      const response = await axios.get('http://localhost:3000/api/todos');
      const todos = response.data;
  
      if (!Array.isArray(todos)) {
        throw new Error('Unexpected response format');
      }
  
      // Calculate number of completed todos
      const completedCount = todos.filter(todo => todo.completed).length;
      
      // Calculate number of incomplete todos
      const incompleteCount = todos.filter(todo => !todo.completed).length;
  
      const stats = {
        completedTodos: completedCount,
        incompleteTodos: incompleteCount,
      };
  
      console.log('Stats computed:', stats);
      res.status(200).json(stats);
  
    } catch (error) {
      console.error('Error occurred:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching ToDo statistics' });
    }
  };