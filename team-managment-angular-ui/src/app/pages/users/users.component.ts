import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

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
    let modalRef= this.modalSerivce.open(AddUserComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{this.getUserList()})
  }
  
  manageRoles(userId){
    let modalRef= this.modalSerivce.open(ManageRolesComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.userId = userId
    modalRef.result.then(()=>{this.getUserList()})
  }
  editUser(user){
    let modalRef= this.modalSerivce.open(EditUserComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.user1 = user
    modalRef.result.then(()=>{this.getUserList()})
  }

}
