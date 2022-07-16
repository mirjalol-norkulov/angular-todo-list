import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit {
  @Input() todo!: Todo;

  isEditing = false;
  todoText = '';
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  toggleDone(id: number) {
    this.todoService.toggleDone(id);
  }

  activateEdit() {
    this.isEditing = true;
    this.todoText = this.todo.text;
  }

  deactivateEdit() {
    this.isEditing = false;
  }

  save() {
    this.todoService.updateTodo(this.todo.id, { text: this.todoText });
    this.deactivateEdit();
    this.todoText = '';
  }

  remove() {
    this.todoService.removeTodo(this.todo.id);
  }
}
