import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-img',
  templateUrl: './user-img.component.html',
  styleUrls: ['./user-img.component.css']
})
export class UserImgComponent {
  id: string | undefined;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = (param as any).params['id']
    })
  }
  redirect(){
    this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
  }
}
