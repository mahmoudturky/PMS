import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'tasks', redirectTo: 'tasks/list', pathMatch: 'full' },
  { path: 'tasks/list', component: ListComponent },
  { path: 'tasks/:taskId/details', component: DetailsComponent },
  { path: 'tasks/create', component: CreateComponent },
  { path: 'tasks/:taskId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
