import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../../image'
import { UserService } from '../../../../core/service/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.css']
})
export class UserImgComponent {
  id: string | undefined;
  selectedFile: File | null = null;
  imageData: Image | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })

    if (this.id) {
      this.userService.getImage(this.id).subscribe(imageData => {
        this.imageData = imageData
      })
    }
  }
  redirect() {
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }


  url: string | undefined;
  image: any;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện
    this.image = file;
    // Sử dụng FileReader để đọc nội dung tệp
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Nội dung của tệp được đọc sẽ nằm trong e.target.result
      this.url = e.target.result; // Lưu nội dung (data URL) vào biến url
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  saveImage(): void {
    const formData = new FormData();
    formData.append('file', this.image);

    this.url = undefined;

    if (this.imageData) {
      this.userService.updateImage(this.imageData?.code, formData).subscribe(
        (response) => {
          console.log('Image updated successfully', response);
          // Xử lý khi ảnh đã được cập nhật thành công
        },
        (error) => {
          console.error('Error updating image', error);
          // Xử lý khi gặp lỗi khi cập nhật ảnh
        }
      );
    }
  }

  closePopup(): void {
    // Implement code to close the popup here
    this.url = undefined
  }
}
