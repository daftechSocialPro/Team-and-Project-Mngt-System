import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './auth/auth.guard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { UsersComponent } from './pages/users/users.component';
import { TeamComponent } from './pages/team/team.component';
import { ProjectComponent } from './pages/project/project.component';
import { UserService } from './services/user.service';
import { ProjectDetailComponent } from './pages/project/project-detail/project-detail.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,canActivate: [AuthGuard],data:{permittedRoles:["Admin","Developer"]}, 
                 
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'employees',component:EmployeeComponent,canActivate: [AuthGuard],data:{permittedRoles:["Admin"]}},
                    { path: 'users',component:UsersComponent,canActivate: [AuthGuard],data:{permittedRoles:["Admin"]} },
                    { path: 'teams',component:TeamComponent,canActivate: [AuthGuard],data:{permittedRoles:["Developer","Admin"]}},
                    { path: 'projects',component:ProjectComponent,canActivate: [AuthGuard],data:{permittedRoles:["Developer","Admin"]} },
                    { path: 'projectdetail/:projectId',component:ProjectDetailComponent,canActivate: [AuthGuard],data:{permittedRoles:["Developer","Admin"]} },
                    
                    
                ]

            },
            
            
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            
            { path: '**', redirectTo: '/auth/login' },
            
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
