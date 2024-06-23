import { Todo } from "../model.js";

export const getTodosService = ()=> Todo.find();
export const updateTodoService = (id, completed) => Todo.findByIdAndUpdate  (id, {completed:Boolean(completed)  });