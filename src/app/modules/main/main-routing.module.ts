import { AuthenticationComponent } from './../authentication/authentication.component';
import { MainComponent } from './main.component';
import { TodoComponent } from './todo/todo.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: AuthenticationComponent,
        loadChildren: () => import('./../authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'todos',
        component: TodoComponent,
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
