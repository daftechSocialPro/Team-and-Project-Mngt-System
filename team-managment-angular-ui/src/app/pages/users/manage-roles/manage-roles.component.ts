import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {
  @Input() userId: string

  sourceRoles: any[] = [];
  targetRoles: any[] = [];
  teamId: any;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private userService: UserService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getUsersNotRoles()
    this.getUsersRoles()
    
  }

  getUsersRoles() {
    this.userService.getAssignedRoles(this.userId).subscribe({
      next: (res) => {
        this.sourceRoles = res.map(item => ({ value: item.name, label: item.name }));
        
      }
    })
  }
  getUsersNotRoles() {
    this.userService.getNotAssignedRoles(this.userId).subscribe({
      next: (res) => {
        this.targetRoles = res.map(item => ({ value: item.name, label: item.name }));
        
      }
    })
  }
  closeModal()
  {
    this.activeModal.close()
  }
}
