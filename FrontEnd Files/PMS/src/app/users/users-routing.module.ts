import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'users', redirectTo: 'users/list', pathMatch: 'full' },
  { path: 'users/list', component: ListComponent },
  { path: 'users/:userId/details', component: DetailsComponent },
  { path: 'users/create', component: CreateComponent },
  { path: 'users/:userId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
