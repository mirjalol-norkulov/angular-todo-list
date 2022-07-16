import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { filter, from, Observable } from 'rxjs';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoText = '';
  filter = 'all';

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}

  onEnter() {
    if (this.todoText) {
      this.todoService.addTodo(this.todoText);
      this.todoText = '';
    }
  }

  toggleDone(id: number) {
    this.todoService.toggleDone(id);
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  @computed get todos() {
    switch (this.filter) {
      case 'completed':
        return this.todoService.todos.filter((todo) => todo.done);
      case 'active':
        return this.todoService.todos.filter((todo) => !todo.done);
      default:
        return this.todoService.todos;
    }
  }

  @computed get leftTodosCount() {
    return this.todoService.todos.filter((todo) => !todo.done).length;
  }

  @computed get hasCompleted() {
    return this.todoService.todos.some((todo) => todo.done);
  }
}
