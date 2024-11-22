import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../models/loginDTO';
import { lastValueFrom } from 'rxjs';
import { RegisterDTO } from '../models/registerDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  registerUsername : string = "";
  registerEmail : string = "";
  registerPassword : string = "";
  registerPasswordConfirm : string = "";

  loginUsername : string = "";
  loginPassword : string = "";

  constructor(public route : Router, public httpService:HttpClient) { }

  ngOnInit() {
  }

  async login() : Promise<void>{
    let loginDTO = new LoginDTO(this.loginUsername, this.loginPassword);
      let x = await lastValueFrom(this.httpService.post<any>("https://localhost:7000/api/Users/Login", loginDTO)); 
      console.log(x);     
      localStorage.setItem("token", x.token);  
      console.log("token");
      console.log(x.token);    
      sessionStorage.setItem('loginUsername', this.loginUsername)
      sessionStorage.setItem('userId', x.id)
      //console.log(x.id); 
      //console.log(this.loginUsername);
      //console.log(x.token); 
      
    this.route.navigate(["/play"]);
  }

  async register(): Promise<void>{

    let registerDTO = new RegisterDTO (
      this.registerUsername,
      this.registerEmail,
      this.registerPassword,
      this.registerPasswordConfirm);
  
    
    let x = await lastValueFrom(this.httpService.post<RegisterDTO>("https://localhost:7000/api/Users/Register", registerDTO));
    console.log(x);
    this.registerUsername = "";
      this.registerEmail = "";
      this.registerPassword = "";
      this.registerPasswordConfirm = "";
    
  }

}
