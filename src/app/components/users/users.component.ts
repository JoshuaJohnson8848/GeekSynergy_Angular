import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private _userService: UserService, private _router: Router, private _cd: ChangeDetectorRef) {}
  users: any;
  deleteId: any;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe((res: any) => {
      if (res) {
        this.users = res.users;
      }
    });
  }

  edit(id: any) {
    this._router.navigate(['user', id], { queryParams: { edit: true } });
  }

  openModal(id: any){
    this.deleteId = id;
  }

  closeModal(){
    this.deleteId = '';
  }

  delete(){
    this._userService.deleteUser(this.deleteId).subscribe((res: any)=>{
      if(res?.deleted){;
        this.getUsers()
        this.closeModal();
      }
    })
  }
}
