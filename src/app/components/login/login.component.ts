import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) { }
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  ngOnInit(): void {
  }
  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/welcome']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

}
