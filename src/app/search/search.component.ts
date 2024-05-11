import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubUser } from '../GitHubUser';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl:'./search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
name:string =""
info:string =""
response?:GitHubUser|undefined;
constructor(private router: Router,private apiService:ApiService) {}
search(){
  this.apiService.getUser(this.name).subscribe(
    (user) => {
      this.response = user;
      console.log("sample1")
      console.log(user)
      if (this.response?.login !== undefined) {
        console.log(this.response.login);
        this.router.navigate([`${this.response?.login}`]);
      } else {
        console.log(this.response?.message);
        this.info = "User not found";
      }
    },
    (error) => {
      console.error("Error fetching user data:", error);
      this.info=error
   
    }
  );

  
}
}
