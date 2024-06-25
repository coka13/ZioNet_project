import AxiosFetch from "../axiosFetch.js";

const axiosInstance = new AxiosFetch();

export const completedTodos = async (req, res) => {
  console.log("Request received:", req.body);
  try {
    // Fetch all todos from the first microservice
    const response = await axiosInstance.get(
      `${process.env.SERVICE1_URL}/api/todos`
    );
    const todos = response.data;

    let stats;

    if (!Array.isArray(todos) || todos.length === 0) {
      // If todos is not an array or empty, set counts to 0
      stats = {
        completedTodos: 0,
        incompleteTodos: 0,
      };
    } else {
      // Calculate number of completed todos
      const completedCount = todos.filter((todo) => todo.completed).length;

      // Calculate number of incomplete todos
      const incompleteCount = todos.filter((todo) => !todo.completed).length;

      stats = {
        completedTodos: completedCount,
        incompleteTodos: incompleteCount,
      };
    }

    console.log("Stats computed:", stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching ToDo statistics" });
  }
};
