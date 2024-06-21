import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = useQueryClient();

  // Query for fetching todos statistics using completedTodos microservice
  // completedTodos is using DBservice microservice to fetch the todos and compute statistics
  const { data: todosStats, error: todosStatsError, isLoading: todosStatsLoading } = useQuery({
    queryKey: ['get-todos-stats'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/todos/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  });

  // Query for fetching all todos using DBservice microservice
  const { data: allTodos, error: allTodosError, isLoading: allTodosLoading } = useQuery({
    queryKey: ['get-all-todos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  });

  // Mutation for updating a todo's status using changeTodoStatus microservice
  // changeTodoStatus is using DBservice microservice to update the status
  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const response = await fetch(`http://localhost:3002/todos/status/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('get-all-todos');
      queryClient.invalidateQueries('get-todos-stats');
    },
  });

  // Handler for toggling todo completion status
  const handleToggleCompleted = (id, currentStatus) => {
    updateTodoMutation.mutate({ id, completed: !currentStatus });
  };

  return (
    <div>
      <h1>Todo list</h1>
      {(todosStatsLoading || allTodosLoading) && <p>Loading...</p>}

      {todosStatsError && <p>Error fetching todos statistics: {todosStatsError.message}</p>}
      {allTodosError && <p>Error fetching all todos: {allTodosError.message}</p>}

      {/* Display data when both queries are successful */}
      {todosStats && allTodos && (
        <div>
          <div>
            <p>Completed Todos: {todosStats.completedTodos}</p>
            <p>Incomplete Todos: {todosStats.incompleteTodos}</p>
          </div>
          <div>
            <h2>All Todos</h2>
            <ul>
              {allTodos.map(todo => (
                <li key={todo._id}>
                  <p>{todo.task}</p>
                  <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                  <button onClick={() => handleToggleCompleted(todo._id, todo.completed)}>
                    {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
