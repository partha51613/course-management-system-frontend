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
  pageLimit = 3;
  currentPage = 1;
  totalPages = 5; //need to work on totalpages
  offsetValue = 0;
  



  //Injection
  private ApiService = inject(ApiService);


  ngOnInit(){
    this.getCourses();
  }

  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     const limit = params['limit'] ? Number(params['limit']) : 10; // Default to 10
  //     const offset = params['offset'] ? Number(params['offset']) : 0; // Default to 0

  //     this.getCourses(limit, offset);
  //   });
  // }

  calcOffsetValue(){
    this.offsetValue = ( this.currentPage - 1)*this.pageLimit;
    console.log("LIMTT Value is : " +this.pageLimit)
    console.log("Offset Value is : " +this.offsetValue)
  }

  getCourses(){
    this.calcOffsetValue();
    const ENDPOINT = `/courses?limit=${this.pageLimit}&offset=${this.offsetValue}`;
    this.ApiService.getData(ENDPOINT).subscribe({
      next: (response) => {
        console.log("getCourses() response is" +JSON.stringify(response))
        this.courseData = response.data;
      },
      error: (err) => {
        console.log("err is" +err)
      }
    })
  }

  gotoNextPage(){
    if(this.currentPage!=this.totalPages){
      this.currentPage = this.currentPage+1;
    }
 
    this.getCourses();
  }

  gotoPrevPage(){
    if(this.currentPage>1){
      this.currentPage = this.currentPage-1;
    }
    this.getCourses();
  }
}
