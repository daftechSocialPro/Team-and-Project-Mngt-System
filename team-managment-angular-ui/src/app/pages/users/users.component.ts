import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  visible: boolean = false;
  users: any
  constructor(private userService: UserService, private commonService: CommonService) { }

  ngOnInit(): void {

    this.getUserList()
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getImage(url: string) {

    return this.commonService.createImgPath(url)
  }
  addUser() {
    this.visible = true
  }
  onUserAdded(event: any) {

    this.visible = false;
    this.getUserList()
  }
}
