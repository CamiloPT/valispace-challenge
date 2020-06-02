import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { PostsListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'admin', component: UserListComponent},
  { path: 'admin/create', component: UserComponent},
  { path: 'admin/edit/:id', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
