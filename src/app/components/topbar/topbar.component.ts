import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ToastrModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(private _router: Router, private _toastr: ToastrService){}

  logout(){
    localStorage.clear();
    this._router.navigate(['/']);
    this._toastr.success('Logged Out','Successfully')
  }
}
