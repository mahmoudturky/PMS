import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from "../project";
import { ProjectsService } from "../projects.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id!: number;
  project!: Project;

  constructor(
    public projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['projectId'];
    this.projectsService.getProject(this.id).subscribe((data: Project) => {
      this.project = data;
    });
  }
}
