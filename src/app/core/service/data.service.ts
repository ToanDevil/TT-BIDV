import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/page/user/user';
import { Card } from 'src/app/page/user/user-card/card';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDataSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  userData$ = this.userDataSubject.asObservable();

  setUserData(userData: User): void {
    this.userDataSubject.next(userData);
  }

  private cardDataSubject: BehaviorSubject<Card | undefined> = new BehaviorSubject<Card | undefined>(undefined);
  cardData$ = this.cardDataSubject.asObservable();

  setCardData(cardData: Card): void {
    this.cardDataSubject.next(cardData)
  }
}