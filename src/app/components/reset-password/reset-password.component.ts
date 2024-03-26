import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ToastrModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.resetForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  reset() {
    let payload = {
      email: this.resetForm.get('email')?.value,
      pass: this.resetForm.get('password')?.value,
    };

    this._userService.resetPass(payload).subscribe(
      (res: any) => {
        if (res?.reset) {
          this._router.navigate(['/']);
          this._toastr.success('Successfully', 'Reset Password');
        }
      },
      (error) => {
        console.error('Error:', error);
        this._toastr.error('Error', error?.error?.message);
      }
    );
    
  }
}
