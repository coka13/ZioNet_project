import AxiosFetch from "../axiosFetch.js";


const axiosInstance = new AxiosFetch();



export const addNewTodoController = async (req, res) => {
  try {
    // Get the new todo from request body
    const { task } = req.body;
    console.log('Adding new todo:', task);
    
    // Send a POST request to the first microservice to add the new todo
    const response = await axiosInstance.post(`${process.env.SERVICE1_URL}/api/todos/add`, { task });
    
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.json(response.data);
    }
  }catch (err) {  
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'An error occurred while adding new ToDo' });
  }
}


export const deleteTodoController = async (req, res) => {
  try {
    // Get the todo id from request
    const { id } = req.params;
    console.log('Deleting ToDo with id:', id);
    
    // Send a DELETE request to the first microservice to delete the ToDo with id
    const response = await axiosInstance.delete(`${process.env.SERVICE1_URL}/api/todos/deleteTodoByID/${id}`);
    
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'An error occurred while deleting ToDo' });
  }
};