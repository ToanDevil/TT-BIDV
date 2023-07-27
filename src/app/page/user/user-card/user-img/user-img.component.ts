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
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })
  }
  redirect(){
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    // Implement code to handle file upload here
    if (this.selectedFile) {
      console.log('File selected:', this.selectedFile);
      // You can send the selectedFile to the server for uploading or processing.
    }
  }

  saveImage(): void {
    // Implement code to save the uploaded image here
    if (this.selectedFile) {
      console.log('Image saved:', this.selectedFile);
      // You can perform any required operations with the uploaded image here.
    }
  }

  closePopup(): void {
    // Implement code to close the popup here
    console.log('Popup closed');
    // You can hide the popup or perform any additional actions when closing the popup.
  }
}
