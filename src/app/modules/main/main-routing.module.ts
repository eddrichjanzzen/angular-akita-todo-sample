import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthenticationComponent } from './../authentication/authentication.component';
import { MainComponent } from './main.component';
import { TodoComponent } from './todo/todo.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { UnAuthGuard } from 'src/app/core/guards/un-auth.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: AuthenticationComponent,
        loadChildren: () => import('./../authentication/authentication.module').then(m => m.AuthenticationModule),
        canActivate: [UnAuthGuard]
      },
      {
        path: '',
        component: NavbarComponent,
        children : [
          {
            path: 'todos',
            component: TodoComponent,
            loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
          },
          {
            path: 'profile',
            component: ProfileComponent,
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
          }
        ],
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
