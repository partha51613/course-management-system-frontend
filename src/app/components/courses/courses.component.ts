import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  standalone: true
})


export class CoursesComponent {

    //Injection
    private ApiService = inject(ApiService);

  getCourses(){
    console.log('getCourses Clicked');

    const ENDPOINT = "/courses"
    this.ApiService.postData(ENDPOINT,null).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // getCourses(){
  //   console.log("HI")
  // }
}
