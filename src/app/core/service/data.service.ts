import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/page/user/user';
import { Card } from 'src/app/page/user/user-card/card';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private userDataSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  // userData$ = this.userDataSubject.asObservable();
  private userDataSubject: BehaviorSubject<User | undefined>;
  private cardDataSubject: BehaviorSubject<Card | undefined>;
  userData$: Observable<User | undefined>;
  cardData$: Observable<Card | undefined>;

  constructor() {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData') || 'null');
    this.userDataSubject = new BehaviorSubject<User | undefined>(userDataFromLocalStorage);
    this.userData$ = this.userDataSubject.asObservable();

    const cardDataFromLocalStorage = JSON.parse(localStorage.getItem('cardData') || 'null');
    this.cardDataSubject = new BehaviorSubject<Card | undefined>(cardDataFromLocalStorage);
    this.cardData$ = this.cardDataSubject.asObservable();
  }

  setUserData(userData: User): void {
    this.userDataSubject.next(userData);
    // lưu dữ liệu vào local storage
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  setCardData(cardData: Card): void {
    this.cardDataSubject.next(cardData);
    // lưu trữ dữ liệu vào local storage
    localStorage.setItem('cardData', JSON.stringify(cardData));
  }
}