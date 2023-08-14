import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from 'src/app/core/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userData: User | undefined;
  id: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private toastr : ToastrService,
  ) {
    this.profileForm = this.formBuilder.group({
      name: [this.userData?.name, Validators.required],
      email: [this.userData?.email, Validators.email],
      address: [this.userData?.address],
      phone: [this.userData?.phone, Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      tel: [this.userData?.tel, Validators.required, Validators.minLength(10), Validators.maxLength(10)]
    });
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe(userData => {
      this.userData = userData;
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        console.log(id);
        this.getUser(id);
      }
    });
  }
  //form thêm người dùng
  profileForm!: FormGroup;
  showForm: boolean = true;
  openForm() {
    this.showForm = false;
  }
  closeForm() {
    this.showForm = true;
  }

  saveData() {
    if (this.profileForm.invalid) {
      // Handle form validation errors
      return;
    }
    const userData = this.profileForm.value;


    this.userService.addUser(userData).subscribe(
      (response) => {
        console.log('User added successfully', response);
        this.showForm = true;
        this.toastr.success('Thêm thành công!');
        // Xử lý khi người dùng được thêm thành công
      },
      (error) => {
        console.error('Error adding user', error);
        // Xử lý khi gặp lỗi khi thêm người dùng
      },
    );
  }
}