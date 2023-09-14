import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './http-interceptors/auth-header-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { TableModule } from 'primeng/table';
import { EmployeeComponent } from './pages/employee/employee.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UsersComponent } from './pages/users/users.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { ListboxModule } from 'primeng/listbox';
import { ProjectComponent } from './pages/project/project.component';
import { DataViewModule } from 'primeng/dataview';
import { AddProjectComponent } from './pages/project/add-project/add-project.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditProjectComponent } from './pages/project/edit-project/edit-project.component';



@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, LoadingComponent,EmployeeComponent, UsersComponent, AddEmployeeComponent, AddUserComponent, ProjectComponent, AddProjectComponent, EditProjectComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule ,
        ButtonModule,
        InputTextModule,
        ToastModule,
        TableModule,
        CardModule,
        AvatarModule,
        AvatarGroupModule,
        TagModule,
        NgbModalModule,
        NgbModule,
        DialogModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        ListboxModule,
        DataViewModule,
        MultiSelectModule,
        
        
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHeaderIneterceptor,
            multi: true,
          },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,  ConfirmationService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
