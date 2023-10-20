import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  visible: boolean = false;
  users: any
  constructor(private userService: UserService, private commonService: CommonService, private modalSerivce: NgbModal, ) { }

  ngOnInit(): void {

    this.getUserList()
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (err) => {
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
  manageRoles(userId){
    let modalRef= this.modalSerivce.open(ManageRolesComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.userId = userId
    modalRef.result.then(()=>{this.getUserList()})
  }
}
