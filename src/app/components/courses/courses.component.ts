import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  standalone: true
})


export class CoursesComponent {

  courseData: any;

    //Injection
    private ApiService = inject(ApiService);


  ngOnInit(){
    this.getCourses();
  }

  getCourses(){
    const ENDPOINT = "/courses"
    this.ApiService.getData(ENDPOINT).subscribe({
      next: (response) => {
        console.log(response)
        this.courseData = response.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
