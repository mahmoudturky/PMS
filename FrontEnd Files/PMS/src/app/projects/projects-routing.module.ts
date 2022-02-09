import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'projects', redirectTo: 'projects/list', pathMatch: 'full' },
  { path: 'projects/list', component: ListComponent },
  { path: 'projects/:projectId/details', component: DetailsComponent },
  { path: 'projects/create', component: CreateComponent },
  { path: 'projects/:projectId/edit', component: EditComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
