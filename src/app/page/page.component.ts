import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/service/user.service';
import { Image } from '../page/image'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  // click icon
  id: string = '1';
  activeIcon: string = 'Icon1';
  imageData: Image | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Kiểm tra nếu đã lưu giá trị activeIcon trong Local Storage
    const storedIcon = localStorage.getItem('activeIcon');
    if (storedIcon) {
      this.activeIcon = storedIcon;
    }
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    //   //console.log(this.id); // Kiểm tra xem id đã nhận được từ URL hay không
    // });
    this.userService.getImage(this.id).subscribe(imageData => {
      this.imageData = imageData;
      console.log(this.imageData)
    })
  }


  setActiveIcon(Icon: string, url: string, check: string): void {
    this.activeIcon = Icon;
    // Lưu giá trị activeIcon vào Local Storage
    localStorage.setItem('activeIcon', Icon);
    if (check === '1') {
      this.router.navigate(['/page/user/' + this.id + '/' + url + '/' + this.id]);
    }
    else {
      this.router.navigate([url]);
    }
    console.log(this.id)
  }

  isIconActive(Icon: string): boolean {
    return this.activeIcon === Icon;
  }
}
