import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  user : User = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St',
    phone: 1234567890,
    code: 178812,
    tel: 3612301523,
  };
}
