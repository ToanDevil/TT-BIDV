import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.css']
})
export class UserImgComponent {
  id: string | undefined;
  selectedFile: File | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })
  }
  redirect() {
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }


  url: string | undefined;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện

    // Sử dụng FileReader để đọc nội dung tệp
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Nội dung của tệp được đọc sẽ nằm trong e.target.result
      this.url = e.target.result; // Lưu nội dung (data URL) vào biến url
      console.log(this.url);
    };
    reader.readAsDataURL(file);
  }


  saveImage(): void {
    // Implement code to save the uploaded image here
    this.url = undefined
  }

  closePopup(): void {
    // Implement code to close the popup here
    this.url = undefined
  }
}
