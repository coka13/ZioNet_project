import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HomePage.css";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState(""); // State for new todo input

  // Fetch todos statistics from service2
  const { data: todosStats, error: todosStatsError, isLoading: todosStatsLoading } = useQuery({
    queryKey: ["get-todos-stats"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/api/todos/stats");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Fetch all todos from service1
  const { data: allTodos, error: allTodosError, isLoading: allTodosLoading } = useQuery({
    queryKey: ["get-all-todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Mutation to update todo status via service3
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const response = await fetch(
        `http://localhost:3001/api/todos/status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      queryClient.invalidateQueries("get-all-todos");
      queryClient.invalidateQueries("get-todos-stats");

      return response.json();
    },
  });

  // Mutation to delete a todo via service4
  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(
        `http://localhost:3001/api/todos/deleteTodo/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      queryClient.invalidateQueries("get-all-todos");
      queryClient.invalidateQueries("get-todos-stats");

      return response.json();
    },
  });

  const handleToggleCompleted = (id, currentStatus) => {
    updateTodoMutation.mutate({ id, completed: !currentStatus });
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  const handleSaveTodo = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/todos/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTodo }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      queryClient.invalidateQueries("get-all-todos");
      queryClient.invalidateQueries("get-todos-stats");

      setNewTodo(""); // Clear input after saving
      setShowModal(false);
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  };

  // Loading and error handling
  if (todosStatsLoading || allTodosLoading) {
    return <p>Loading...</p>;
  }

  if (todosStatsError) {
    return (
      <div className="todo-list">
        <h1>Todo list</h1>
        <p>{`Error fetching todos statistics: ${todosStatsError.message}`}</p>
      </div>
    );
  }

  if (allTodosError) {
    return (
      <div className="todo-list">
        <h1>Todo list</h1>
        <p>{`Error fetching all todos: ${allTodosError.message}`}</p>
      </div>
    );
  }

  // Display fetched data
  return (
    <div className="todo-list">
      {todosStats && allTodos && (
        <div className="head">
          <h1>Todo list</h1>
          {/* Button to open modal */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add new To-Do
          </button>
          <div>
            <h6 className="green">
              Completed Todos: {todosStats.completedTodos}
            </h6>
            <h6 className="red">
              Incomplete Todos: {todosStats.incompleteTodos}
            </h6>
          </div>

          <ul className="list-group">
            {allTodos.length > 0 ? (
              allTodos.map((todo) => (
                <li
                  className="list-group-item"
                  style={{ width: "250px" }}
                  key={todo._id}
                >
                  <h5
                    className="task"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.task}
                  </h5>
                  <div className="todo">
                    <h6 className={todo.completed ? "green" : "red"}>
                      {todo.completed ? "Completed" : "Incomplete"}
                    </h6>
                  </div>
                  <button
                    type="button"
                    className={
                      todo.completed
                        ? "btn btn-danger btn-sm"
                        : "btn btn-success btn-sm"
                    }
                    onClick={() =>
                      handleToggleCompleted(todo._id, todo.completed)
                    }
                  >
                    {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm delete-btn"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))
            ) : (
             <p>

               No todos found
             </p> 
            )}
          </ul>


          {/* Modal */}
          <div
            className={`modal ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add new To-Do</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSaveTodo}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new To-Do"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveTodo}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
