import { Component, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from '../user';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-eval',
  templateUrl: './user-eval.component.html',
  styleUrls: ['./user-eval.component.css']
})
export class UserEvalComponent {
  users: any[] = [];
  userToDelete !: User;
  currentPage: number = 1; // Trang hiện tại, mặc định là trang đầu tiên
  itemsPerPage: number = 5; // Số hàng hiển thị trên mỗi trang
  totalPage!: number;
  sortedUsers: any[] = [];
  sortAscending: boolean = true;
  idUser!: number;

  userToEval !: User;
  statusFormEval : boolean = false;
  // statusUser!: number;


  constructor (
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ){}
  @Input() searchValue: string = '';
  searchResult: string = '';

  ngOnChanges() {
    // Thực hiện tìm kiếm với dữ liệu trong this.searchValue
    this.searchResult = 'Kết quả tìm kiếm với: ' + this.searchValue;
  }

  ngOnInit(){
    this.userService.getListUser().subscribe(
      (user) =>{
        this.users = user
        this.totalPage = this.getTotalPages();
        this.sortUsers();
      },
      (error) => {
        console.error('Error fetching users:', error)
      }
    )
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idUser = (paramMap as any).params['id']
      console.log(this.idUser)
    })
  }
  evaluate(user: any) {
    this.statusFormEval = true;
    // Xử lý đánh giá đồng nghiệp ở đây
    console.log('Đánh giá cho người dùng:', user);
    this.userToEval = user;
  }

  delete(user: any) {
    this.userToDelete = user;
    if (this.userToDelete.code) {
      this.userService.deleteUser(this.userToDelete.code).subscribe(() => {
        // Sau khi xóa thành công, cập nhật lại danh sách người dùng
        this.userService.getListUser().subscribe((updatedUsers) => {
          this.users = updatedUsers;
          this.totalPage = this.getTotalPages();
          this.sortUsers();
          console.log('Xóa người dùng này', user);
        });
      });
    }
  }
  // Cập nhật trạng thái người dùng
  status(user:any){
    if(user.status === 1){
      user.status = 2
    }
    else{
      user.status = 1
    }
    this.userService.updateUser(user.id, user).subscribe(() => {
      this.userService.getListUser().subscribe()
    })
  }

  confirmDelete(user: any) {
    const result = confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (result) {
      this.delete(user);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  // Hàm để chuyển đến trang tiếp theo
  nextPage() {
    if(this.users.length % this.itemsPerPage !== 0){
      this.currentPage++;
    }
  }

  // Hàm để quay lại trang trước
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  // sắp xếp user theo thứ tự a-z z-a
  sortUsers() {
    if (this.sortAscending) {
      this.sortedUsers = this.users.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.sortedUsers = this.users.slice().sort((a, b) => b.name.localeCompare(a.name));
    }
  }
  
  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortUsers();
  }

  closeFormEval(){
    this.statusFormEval = false;
  }
}
