import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../core/service/data.service';
import { UserService } from '../core/service/user.service';
import { Image } from '../page/image'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  // click icon
  id: string = '41';
  activeIcon: string = 'Icon1';
  imageData: Image | undefined;
  search: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    // Kiểm tra nếu đã lưu giá trị activeIcon trong Local Storage
    const storedIcon = localStorage.getItem('activeIcon');
    if(storedIcon){
      this.activeIcon = storedIcon;
    } else {
      this.activeIcon = 'Icon1';
    }
    // this.activeRoute.paramMap.subscribe(param => {
    //   this.id = (param as any).params['id'];
    //   // console.log(this.id)
    // })
    this.dataService.imageUpdated$.subscribe(() => {
      this.userService.getImage(this.id).subscribe(imageData => {
        this.imageData = imageData;
      })
    })
    this.userService.getImage(this.id).subscribe(imageData => {
      this.imageData = imageData;
      console.log(this.imageData)
    })
  }


  setActiveIcon(Icon: string, url: string, check: string): void {
    this.activeIcon = Icon;
    // Lưu giá trị activeIcon vào Local Storage
    localStorage.setItem('activeIcon', Icon);
    if (check === '4') {
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

  onImageError() {
    // Thay thế ảnh bằng URL của ảnh mặc định khi xảy ra lỗi
    if(this.imageData){
      this.imageData.url = '/assets/images/avatar.jpg';
    }
  }
}
