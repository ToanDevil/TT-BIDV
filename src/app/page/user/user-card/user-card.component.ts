import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { UserService } from 'src/app/core/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from '../user';
import { Card } from './card';
import { Image } from '../../image'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  userData: User | undefined;
  cardData: Card | undefined;
  imageData: Image | undefined;
  userForm!: FormGroup;
  code: string | undefined;
  id!: string;
  showForm: boolean = true;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) { }

  // redirect(check: string){
  //   if(check === 'edit-profile'){
  //     this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/' + this.id])
  //   }
  //   else{
  //     this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/'+ this.id])
  //   }
  // }

  private initForm() {
    this.userForm = this.formBuilder.group({
      name: [this.userData?.name || '', Validators.required],
      tel: [this.userData?.tel || '', Validators.required],
      phone: [this.userData?.phone || '', Validators.required],
      email: [this.userData?.email || '', Validators.required],
      address: [this.userData?.address || '', Validators.required],
      nickname: [this.cardData?.nickname || '', Validators.required],
      forte: [this.cardData?.forte || '', Validators.required],
      unit: [this.cardData?.unit || '', Validators.required],
      department: [this.cardData?.department || '', Validators.required],
      position: [this.cardData?.position || '', Validators.required],
      title: [this.cardData?.title || '', Validators.required],
    })
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = (paramMap as any).params['id'];
      this.getUser(this.id);
      this.initForm();
      console.log(this.id)
      if (this.id) {
        this.getCard(this.id)

        this.userService.getImage(this.id).subscribe(imageData => {
          this.imageData = imageData
          this.initForm();
        })
      }
    });
  }
  getCard(id: string) {
    this.userService.getCard(id).subscribe(cardData => {
      this.cardData = cardData;
      this.dataService.setCardData(cardData);
      console.log(cardData);
      console.log(this.userData);
    })
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe(userData => {
      this.userData = userData;
    })
  }
  onImageError() {
    // Thay thế ảnh bằng URL của ảnh mặc định khi xảy ra lỗi
    if (this.imageData) {
      this.imageData.url = '/assets/images/avatar.jpg';
    }
  }

  saveData() {
    if (this.userData && this.cardData && this.id && this.userData.code) {

      // Update user information
      const updatedUser = {
        ...this.userData,
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        address: this.userForm.get('address')?.value,
        phone: this.userForm.get('phone')?.value,
        tel: this.userForm.get('tel')?.value,
      };

      this.userService.updateUser(this.id, updatedUser).subscribe(() => {
        this.getUser(this.id)
      });

      // Update card information
      const updatedCard = {
        ...this.cardData,
        position: this.userForm.get('position')?.value,
        forte: this.userForm.get('forte')?.value,
        department: this.userForm.get('department')?.value,
        nickname: this.userForm.get('nickname')?.value,
        unit: this.userForm.get('unit')?.value,
        title: this.userForm.get('title')?.value,
      };

      this.userService.updateCard(this.userData.code, updatedCard).subscribe(() => {
        this.getCard(this.id)
      });
      this.showForm = true;
      this.toastr.success('Cập nhật thành công!');
      // window.location.reload();
    }
  }

  openForm() {
    this.showForm = false;
  }

  closeForm() {
    this.showForm = true;
  }

  cancel(): void {
    this.showForm = false;
  }
}
