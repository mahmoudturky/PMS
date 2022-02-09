import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';


import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//import { ListComponent } from './projects/list/list.component';
//import { ListComponent } from './tasks/list/list.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsModule,
    TasksModule
    //RouterModule.forRoot([
    //  //{ path: '', component: HomeComponent, pathMatch: 'full' },
    //  //{ path: 'counter', component: CounterComponent },
    //  //{ path: 'fetch-data', component: FetchDataComponent },
    //  { path: 'tasks', component: ListComponent },
    //  { path: 'projects', component: ListComponent },

    //])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
