import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  id: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.userData$.subscribe(userData => {
      this.userData = userData; // Nhận dữ liệu từ DataService
    })
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if(id){
        console.log(id);
        this.userService.getCard(id).subscribe(cardData => {
          this.cardData = cardData;
          console.log(cardData);
          console.log(this.userData);
        })
      }
    });
  }
}
