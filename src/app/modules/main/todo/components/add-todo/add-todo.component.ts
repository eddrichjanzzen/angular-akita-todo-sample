import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../../state/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;
  @Output() todoAdded = new EventEmitter<void>();

  constructor(
    private todoService: TodoService) { 
    this.addTodoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      deadline: new FormControl(''),
      completed: new FormControl(false)
    })
  }

  onClickAddTodo(){
    if(this.addTodoForm.valid){
      this.todoService.addTodo(this.addTodoForm.value);

      this.addTodoForm.patchValue({
        title: ""
      });

      this.todoAdded.next();
    }
  }


  ngOnInit(): void {
  }

}
