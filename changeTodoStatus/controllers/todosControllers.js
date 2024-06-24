import AxiosFetch from "../axiosFetch.js";


const axiosInstance = new AxiosFetch();

export const changeStatusController = async (req, res) => {
  try {
    // Get parameters from request
    const { id } = req.params;
    const { completed } = req.body;

    console.log("Updating ToDo status with id:", id,completed);
    
    // Send a PUT request to the first microservice to update the ToDo status with id and new status
    const response = await axiosInstance.put(`${process.env.SERVICE1_URL}/api/todos/update-todo`,  { completed:completed,id:id } );

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
