import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/service/user.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
   // click icon
  id : string = '1';
  activeIcon: string = 'Icon1';

  ngOnInit(): void {
   // Kiểm tra nếu đã lưu giá trị activeIcon trong Local Storage
    const storedIcon = localStorage.getItem('activeIcon');
    if (storedIcon) {
     this.activeIcon = storedIcon;
    }
  }
 
  setActiveIcon(Icon: string): void {
    this.activeIcon = Icon;
    // Lưu giá trị activeIcon vào Local Storage
    localStorage.setItem('activeIcon', Icon);
  }
 
  isIconActive(Icon: string): boolean {
   return this.activeIcon === Icon;
  }
}
