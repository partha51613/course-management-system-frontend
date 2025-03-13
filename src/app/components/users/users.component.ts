import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usersData: any;
  //Injection
    private ApiService = inject(ApiService);


  ngOnInit(){
    this.getUserData();
  }
  getUserData(){
    const ENDPOINT = "/users"
    this.ApiService.getData(ENDPOINT).subscribe({
      next: (response) => {
        console.log(response)
        this.usersData = response.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
