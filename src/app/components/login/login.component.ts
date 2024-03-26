import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterOutlet, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    let payload = {
      email: this.loginForm.get('email')?.value,
      pass: this.loginForm.get('password')?.value
    }

    this._userService.login(payload).subscribe((res)=>{
      if(res){
        let token = res?.token;
        let userId = res?.userId;

        localStorage.setItem('token',token);
        localStorage.setItem('userId',userId);

        this._toastr.success('Successfully', 'Logged In');
        
        this._router.navigate(['/dashboard']);
      }
    },
    (error)=>{
      console.error('Error:', error);
      this._toastr.error('Error', error?.error?.message);
    }
    )
  }
}
