import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  toggleLogout : boolean = true;

  constructor(public route: Router) { }

  logout(){

    // ██ Supprimer le token juste ici ! ██

    localStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("pseudo");

    let darkScreen : HTMLElement | null = document.querySelector("#darkScreen");
    if(darkScreen == null) return;
    darkScreen.style.visibility = this.toggleLogout ? "visible" : "hidden";

    let logoutBox : HTMLElement | null = document.querySelector("#logoutBox");
    if(logoutBox == null) return;
    logoutBox.style.opacity = this.toggleLogout ? "1" : "0";
    logoutBox.style.top = this.toggleLogout ? "50%" : "48%";

    this.toggleLogout = !this.toggleLogout;

    this.route.navigate(["/login"]);
  }

}
