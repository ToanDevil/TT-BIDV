import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from 'src/app/core/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';

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
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if(id){
        console.log(id);
        this.userService.getUser(id).subscribe(userData => {
          this.userData = userData;
          this.dataService.setUserData(userData);
          console.log(userData);
        })
      }
    });
  }
}
