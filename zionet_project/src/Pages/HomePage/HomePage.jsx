import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

const HomePage = () => {
  const queryClient = useQueryClient();

  // Fetch todos statistics from service2
  const { data: todosStats, error: todosStatsError, isLoading: todosStatsLoading } = useQuery({
    queryKey: ['get-todos-stats'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3001/api/todos/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      } catch (error) {
        throw new Error(`Error fetching todos statistics: ${error.message}`);
      }
    },
  });

  // Fetch all todos from service1
  const { data: allTodos, error: allTodosError, isLoading: allTodosLoading } = useQuery({
    queryKey: ['get-all-todos'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3000/api/todos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      } catch (error) {
        throw new Error(`Error fetching all todos: ${error.message}`);
      }
    },
  });

  // Mutation to update todo status via service3
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      try {
        const response = await fetch(`http://localhost:3002/api/todos/status/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      } catch (error) {
        throw new Error(`Error updating todo status: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('get-all-todos');
      queryClient.invalidateQueries('get-todos-stats');
    },
  });

  const handleToggleCompleted = (id, currentStatus) => {
    updateTodoMutation.mutate({ id, completed: !currentStatus });
  };

  // Loading and error handling
  if (todosStatsLoading || allTodosLoading) {
    return <p>Loading...</p>;
  }

  if (todosStatsError) {
    return <p>{`Error fetching todos statistics: ${todosStatsError.message}`}</p>;
  }

  if (allTodosError) {
    return <p>{`Error fetching all todos: ${allTodosError.message}`}</p>;
  }

  // Display fetched data
  return (
    <div className="todo-list">
      {todosStats && allTodos && (
        <div className="head">
          <h1>Todo list</h1>
          <div>
            <h6 className="green">Completed Todos: {todosStats.completedTodos}</h6>
            <h6 className="red">Incomplete Todos: {todosStats.incompleteTodos}</h6>
          </div>
            
          <ul className="list-group">
            {allTodos.length > 0 ? (
              allTodos.map((todo) => (
                <li className="list-group-item" key={todo._id}>
                  <h5 className="task" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.task}</h5>
                  <div className="todo">
                    <h6 className={todo.completed ? "green" : "red"}>{todo.completed ? 'Completed' : 'Incomplete'}</h6>
                  </div>
                  <button type="button" className={todo.completed ? "btn btn-danger btn-sm" : "btn btn-success btn-sm"} onClick={() => handleToggleCompleted(todo._id, todo.completed)}>
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                </li>
              ))
            ) : (
              <li>No todos found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
