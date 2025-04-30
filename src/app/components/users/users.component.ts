import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  // Pagination variables
  rowsPerPage = 5;
  currentPage = 1;
  offsetValue = 0;
  isHasMoreData = true;
  totalPages ?= 1;

  // Button enable/disable state
  isPreviousButtonDisabled = true;
  isNextButtonDisabled = false;
  
  //Variables
  usersData: any;

  //Injection
  private ApiService = inject(ApiService);

  calcOnPageChange() {
    this.offsetValue = (this.currentPage - 1) * this.rowsPerPage;
    this.getUserData()
  }

  ngOnInit(){
    this.getUserData();
  }
  getUserData(){
    const ENDPOINT = `/users?limit=${this.rowsPerPage}&offset=${this.offsetValue}`;
    this.ApiService.getData(ENDPOINT).subscribe({
      next: (response) => {
        console.log(response);
        this.usersData = response.data ?? [];
        
        //
        this.totalPages =  Math.ceil(response.totalCount / this.rowsPerPage);
        this.isPreviousButtonDisabled = this.currentPage === 1;
        this.isNextButtonDisabled = this.currentPage == this.totalPages;

      },
      error: (err) => {
        this.usersData = [];
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
