import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from '../user';
import { Card } from './card';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  userData: User | undefined;
  cardData: Card | undefined;
  id: string | undefined;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router : Router
  ) { }

  redirect(check: string){
    if(check === 'edit-profile'){
      this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/' + this.id])
    }
    else{
      this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/'+ this.id])
    }
  }

  ngOnInit() {
    this.dataService.userData$.subscribe(userData => {
      this.userData = userData; // Nhận dữ liệu từ DataService
    })
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = (paramMap as any).params['id']
      console.log(this.id)
      if(this.id){
        this.userService.getCard(this.id).subscribe(cardData => {
          this.cardData = cardData;
          this.dataService.setCardData(cardData);
          console.log(cardData);
          console.log(this.userData);
        })
      }
    });
  }
}
