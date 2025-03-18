import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  
  //Pagination variables
  pageSize = 10;
  currentPage = 1;
  totalPages = 3;



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

  gotoNextPage(){
    if(this.currentPage==this.totalPages){
      return
    }
    else{
      this.currentPage = this.currentPage+1;
    }
  }

  gotoPrevPage(){
    if(this.currentPage===1){
      return
    }
    else{
      this.currentPage = this.currentPage-1;
    }
  }
}
