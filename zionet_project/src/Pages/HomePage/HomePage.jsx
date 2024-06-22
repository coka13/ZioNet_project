import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

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
    <div className="todo-list">


      {todosStats && allTodos && (
        <div className="head">
           <h1>Todo list</h1>
          <div>
            <h6 className="green">Completed Todos: {todosStats.completedTodos}</h6>
            <h6 className="red">Incomplete Todos: {todosStats.incompleteTodos}</h6>
            
          </div>
            
            <ul class="list-group">
              {allTodos.length > 0 ? (
                allTodos.map((todo,index) => (
                  <li style={{display:"flex",flexDirection:"column",alignItems:"center",border:"solid"}} class="list-group-item" key={todo._id}>


                {todo.completed&& <h5 className="task" ><del> {todo.task}</del></h5>}
                {!todo.completed && <h5 className="task" >{todo.task}</h5>}
                    

                    <div className="todo">

                    <h6 className={todo.completed? "green" :"red"}> {todo.completed ? 'Completed' : 'Incomplete'}</h6>
                    </div>
                    <button type="button"  class={todo.completed ? "btn btn-danger btn-sm":"btn btn-success btn-sm"} onClick={() => handleToggleCompleted(todo._id, todo.completed)}>
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
