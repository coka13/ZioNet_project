import axios from "axios";

export const changeStatusController = async (req, res) => {
  try {
    // Get parameters from request
    const { id } = req.params;
    const { completed } = req.body;

    console.log("Updating ToDo status with id:", id,completed);
    
    // Send a PUT request to the first microservice to update the ToDo status with id and new status
    const response = await axios.put("http://localhost:3000/api/todos/update-todo", {
      id: id,
      completed: completed,
    });

    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ error: 'An error occurred while updating ToDo status' });
  }
};
