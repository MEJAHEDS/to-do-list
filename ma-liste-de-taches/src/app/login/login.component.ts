// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {  Router } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,public router:Router) {}

  ngOnInit(): void {}

  login() {
    console.log("login");
    console.log(this.username);
    console.log(this.password);
    // Vérifiez les identifiants de l'utilisateur (simulé ici avec une condition simple)
    if (this.username === 'soufiane' && this.password === 'soufiane') {
      this.authService.login();
      this.router.navigate(['/list']);
    } else {
      console.log("Identifiants incorrects");
      // Gérez le cas où les identifiants sont incorrects (affichage d'un message d'erreur, etc.)
    }
  }
}
