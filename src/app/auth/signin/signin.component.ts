import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.signInForm=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-z-A-Z]{6,}/)]]//comme ca le password va contenir au moins 6 caracteres
    });
  }
  onSubmit(){
    const email=this.signInForm.get('email').value;
    const password=this.signInForm.get('password').value;
    this.authService.signInUser(email,password).then(
      ()=>{//si tous ce passe bien
        this.router.navigate(['/books']);
      },
      (error)=>{
        this.errorMessage=error;
      }
    );
  }

}
