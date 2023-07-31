import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from '../../user';
import { Card } from '../card';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  id: string | undefined;
  userData: User | undefined;
  cardData: Card | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
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

  checkupdate: boolean = false;
  saveData(): void {
    if (this.userData && this.cardData && this.id && this.userData.code) {
      // cập nhật thông tin người dùng và thẻ thông qua userService
      console.log(this.userData)
      this.userService.updateUser(this.id, this.userData).subscribe(res =>{
        console.log('Thông tin người dùng đã được cập nhật: ', res);
        // Sử dụng thư viện thông báo ngx-toastr (cài đặt thư viện: npm install ngx-toastr)
      });
      this.userService.updateCard(this.userData.code, this.cardData).subscribe(res => {
        console.log('Thông tin thẻ đã được cập nhật: ', res);
      })
      this.toastr.success('Cập nhật thành công!');
      this.checkupdate = true;
      this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
    }
  }

  cancel(): void {
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }

  redirect() {
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }
}
