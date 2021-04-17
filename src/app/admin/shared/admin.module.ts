import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { DashboardPageComponent } from '../dashboard-page/dashboard-page.component';
import { CreatePageComponent } from '../create-page/create-page.component';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { PostPageComponent } from 'src/app/post-page/post-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AuthGuardService } from './auth-guard.service';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    PostPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full'
          },
          {
              path: 'login',
              component: LoginPageComponent
          },
          {
              path: 'dashboard',
              component: DashboardPageComponent,
              canActivate: [AuthGuardService]
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: 'post/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuardService]
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuardService
  ]
})
export class AdminModule { }
