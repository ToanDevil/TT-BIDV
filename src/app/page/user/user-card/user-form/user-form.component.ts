import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from '../../user';
import { Card } from '../card';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  id : string | undefined;
  userData: User | undefined;
  cardData: Card | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(){
    // this.dataService.userData$.subscribe(cardData => {
    //   this.cardData = cardData; // Nhận dữ liệu từ DataService
    // })
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })
    this.dataService.userData$.subscribe(userData => {
      this.userData = userData; // Nhận dữ liệu từ DataService
      console.log(userData)
    })
    this.dataService.cardData$.subscribe(cardData => {
      this.cardData = cardData; // Nhận dữ liệu từ DataService
      console.log(cardData)
    })
  }
  //phương thức để cập nhật thông tin người dùng
  updateUser(): void {
    if(this.userData && this.id) {
      this.userService.updateUser(this.id, this.userData).subscribe(res => {
        //Xử lý kết quả cập nhật thành công
      })
    }
  }
// phương thức để cập nhật dữ liệu thông tin card
  updateCard(): void {
    if(this.cardData && this.userData?.code) {
      this.userService.updateCard(this.userData.code, this.cardData).subscribe(res => {
        // Xử lý kêts quả cập nhật thành công
      })
    }
  }
  
  saveData(): void {
    if (this.userData && this.cardData && this.id) {
      // cập nhật thông tin người dùng và thẻ thông qua userService
      this.userService.updateUser(this.id, this.userData).subscribe(res =>{
        console.log('Thông tin người dùng đã được cập nhật: ', res);
      });
      this.userService.updateCard(this.userData.code, this.cardData).subscribe(res => {
        console.log('Thông tin thẻ đã được cập nhật: ', res);
      })
      // this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
    }
  }
  
  redirect(){
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }
}
