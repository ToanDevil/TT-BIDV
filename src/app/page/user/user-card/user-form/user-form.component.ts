import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/service/data.service';
import { User } from '../../user';
import { Card } from '../card';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  id : string | undefined;
  userData: User | undefined;
  cardData: Card | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ){}

  ngOnInit(){
    // this.dataService.userData$.subscribe(cardData => {
    //   this.cardData = cardData; // Nhận dữ liệu từ DataService
    // })
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })
    this.dataService.userData$.subscribe(userData => {
      this.userData = userData; // Nhận dữ liệu từ DataService
      console.log(userData)
    })
    this.dataService.cardData$.subscribe(cardData => {
      this.cardData = cardData; // Nhận dữ liệu từ DataService
      console.log(cardData)
    })
  }

  
  redirect(){
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }
}
