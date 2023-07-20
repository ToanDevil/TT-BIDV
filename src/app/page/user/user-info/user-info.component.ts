import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from 'src/app/core/service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userData: any;
  id: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if(id){
        console.log(id);
        this.userService.getUser(id).subscribe(userData => {
          console.log(userData);
        })
      }
    });
  }
}
