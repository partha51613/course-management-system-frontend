import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
  standalone: true,
})
export class CoursesComponent {
  courseData: any = [];

  // Pagination variables
  rowsPerPage = 7;
  currentPage = 1;
  offsetValue = 0;
  isHasMoreData = true;
  totalPages ?= 1;

  // Button enable/disable state
  isPreviousButtonDisabled = true;
  isNextButtonDisabled = false;

  // Injection
  private ApiService = inject(ApiService);

  ngOnInit() {
    this.calcOnPageChange();
  }

  calcOnPageChange() {
    this.offsetValue = (this.currentPage - 1) * this.rowsPerPage;
    this.getCourses()
    
  }

  getCourses() {
    const ENDPOINT = `/courses?limit=${this.rowsPerPage}&offset=${this.offsetValue}`;
    this.ApiService.getData(ENDPOINT).subscribe({
      next: (response) => {
        console.log(response);
        this.courseData = response.data ?? [];
        
        //
        this.totalPages =  Math.ceil(response.totalCount / this.rowsPerPage);
        this.isPreviousButtonDisabled = this.currentPage === 1;
        this.isNextButtonDisabled = this.currentPage == this.totalPages;

      },
      error: (err) => {
        this.courseData = [];
        console.log('Error fetching courses:', err);
      },
    });
  }

  gotoNextPage() {
    // if (this.isNextButtonDisabled) return;
    // Check if there's potentially another page
    
    this.currentPage++;
    this.calcOnPageChange()
  }

  gotoPrevPage() {
    // if (this.isPreviousButtonDisabled) return;
    this.currentPage--;
    this.calcOnPageChange()

  }
}
