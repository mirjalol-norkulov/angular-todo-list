import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {}

  addTodo(todoText: string) {
    this.todos.push({
      id: this.todos.length + 1,
      text: todoText,
      done: false,
    });
  }

  toggleDone(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      this.todos[index].done = !this.todos[index].done;
    }
  }

  updateTodo(id: number, payload: Partial<Todo>) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index] = { ...this.todos[index], ...payload };
  }

  removeTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.done);
    return this.todos;
  }
}
