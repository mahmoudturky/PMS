import { Component, OnInit } from '@angular/core';
import { Project } from "../project";
import { ProjectsService } from "../projects.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  projects: Project[] = [];

  constructor(public projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  deleteProject(id: number) {
    this.projectsService.deleteProject(id).subscribe(res => {
      this.projects = this.projects.filter(item => item.id !== id);
    });
  }

}
