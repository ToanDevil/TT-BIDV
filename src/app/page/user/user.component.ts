import { Component, HostBinding, Input } from '@angular/core';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // @HostBinding("class") class: string = "user-container";
  // click option menu

  id: string | undefined;

  activeOption: string = 'option1';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // Kiểm tra nếu đã lưu giá trị activeOption trong Local Storage
    const storedOption = localStorage.getItem('activeOption');
    if (storedOption) {
      this.activeOption = storedOption;
    }
    this.activatedRoute.paramMap.subscribe(param => {
      console.log(param);
      this.id = (param as any).params['id'];
      // console.log(this.id)
    })
  }

  setActiveOption(option: string, url: string): void {
    this.activeOption = option;
    // Lưu giá trị activeOption vào Local Storage
    localStorage.setItem('activeOption', option);
    this.router.navigate(['/page/user/'+ this.id + url + this.id]);
    //  console.log(this.id)
  }

  isOptionActive(option: string): boolean {
    return this.activeOption === option;
  }

  //  getUserInfo(user : User) {
  //   this.router.navigate(['/page/user/user-info/'+ this.id])
  //  }
}
