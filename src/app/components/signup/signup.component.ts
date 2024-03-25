import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TopbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  userId: any;
  isEdit: any;
  signupForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.signupForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required ,Validators.email]],
      password: ['',Validators.required],
      phone: ['',Validators.required],
      profession: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this._route.queryParams.subscribe((queryParams) => {
      this.isEdit = queryParams['edit'];

      if (this.isEdit && this.userId) {
        this.getUserById();
      }
    });
  }

  getUserById() {
    this._userService.getUserById(this.userId).subscribe((res: any) => {
      this.signupForm.controls['name'].patchValue(res?.user?.name);
      this.signupForm.controls['email'].patchValue(res?.user?.email);
      // this.signupForm.controls['password'].patchValue(res?.user?.password);
      this.signupForm.controls['phone'].patchValue(res?.user?.phone);
      this.signupForm.controls['profession'].patchValue(res?.user?.profession);
    });
  }

  signup(){
    let payload = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      phone: this.signupForm.get('phone')?.value,
      proff: this.signupForm.get('profession')?.value,
      pass: this.signupForm.get('password')?.value,
    }
    this._userService.signup(payload).subscribe((res: any)=>{
      if(res){
        this._router.navigate(['/'])
      }
    })
  }

  update(){
    let payload = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      phone: this.signupForm.get('phone')?.value,
      proff: this.signupForm.get('profession')?.value,
    }
    this._userService.updateUser(payload,this.userId).subscribe((res: any)=>{
      if(res){
        this._router.navigate(['/dashboard'])
      }
    })
  }
}
