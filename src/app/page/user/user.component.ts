import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // @HostBinding("class") class: string = "user-container";
   // click option menu

   activeOption: string = 'option1';

   ngOnInit(): void {
     // Kiểm tra nếu đã lưu giá trị activeOption trong Local Storage
     const storedOption = localStorage.getItem('activeOption');
     if (storedOption) {
       this.activeOption = storedOption;
     }
   }
 
   setActiveOption(option: string): void {
     this.activeOption = option;
     // Lưu giá trị activeOption vào Local Storage
     localStorage.setItem('activeOption', option);
   }
 
   isOptionActive(option: string): boolean {
     return this.activeOption === option;
   }
}
