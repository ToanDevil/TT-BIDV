import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/page/user/user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDataSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  userData$ = this.userDataSubject.asObservable();

  setUserData(userData: User): void {
    this.userDataSubject.next(userData);
  }
}