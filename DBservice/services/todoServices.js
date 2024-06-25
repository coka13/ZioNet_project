import { Todo } from "../model.js";

export const getTodosService = ()=> Todo.find();
export const updateTodoService = (id, completed) => Todo.findByIdAndUpdate  (id, {completed:Boolean(completed)  });
export const addTodoService = (task) => Todo.create({task:task,completed:false});
export const deleteTodoByIDService = (id) => Todo.findByIdAndDelete(id);