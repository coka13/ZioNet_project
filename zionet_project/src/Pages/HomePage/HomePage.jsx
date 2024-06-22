import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = useQueryClient();

  // Fetch todos statistics by using the completedTodos microservice which is using DBservice microservice to fetch all todos
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

  // Fetch all todos by using the DBservice microservice
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


    // Change todo status (completed/incomplete) by using the ChangeTodoStatus microservice which is using DBservice microservice to update a todo status by id
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

  if (todosStatsLoading || allTodosLoading) {
    return <p>Loading...</p>;
  }

  if (todosStatsError) {
    return <p>{`Error fetching todos statistics: ${todosStatsError.message}`}</p>;
  }

  if (allTodosError) {
    return <p>{`Error fetching all todos: ${allTodosError.message}`}</p>;
  }

  return (
    <div>
      <h1>Todo list</h1>

      {todosStats && allTodos && (
        <div>
          <div>
            <p>Completed Todos: {todosStats.completedTodos}</p>
            <p>Incomplete Todos: {todosStats.incompleteTodos}</p>
          </div>
          <div>
            <h2>All Todos</h2>
            <ul>
              {allTodos.length > 0 ? (
                allTodos.map(todo => (
                  <li key={todo._id}>
                    <p>{todo.task}</p>
                    <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                    <button onClick={() => handleToggleCompleted(todo._id, todo.completed)}>
                      {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </button>
                  </li>
                ))
              ) : (
                <li>No todos found</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
