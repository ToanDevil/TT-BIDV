import { Component } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-eval',
  templateUrl: './user-eval.component.html',
  styleUrls: ['./user-eval.component.css']
})
export class UserEvalComponent {
  users: any[] = [];
  userToDelete !: User;
  constructor (
    private userService: UserService
  ){}

  ngOnInit(){
    this.userService.getListUser().subscribe(
      (user) =>{
        this.users = user
      },
      (error) => {
        console.error('Error fetching users:', error)
      }
    )
  }
  evaluate(user: any) {
    // Xử lý đánh giá đồng nghiệp ở đây
    console.log('Đánh giá cho người dùng:', user);
  }

  delete(user: any){
    this.userToDelete = user;
    if(this.userToDelete.code){
      this.userService.deleteUser(this.userToDelete.code).subscribe(() => 
        {
          this.userService.getListUser().subscribe();
          console.log('Xóa người dùng này', user);
        }
      )
    }
  }
}
