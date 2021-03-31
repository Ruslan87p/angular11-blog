import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CreatePageComponent } from './admin/create-page/create-page.component';
import { EditPageComponent } from './admin/edit-page/edit-page.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { PostComponent } from './post-page/post/post.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { SharedModule } from './shared/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  {
      path: '',
      component: MainLayoutComponent,
      children: [
          {path: '', redirectTo: '/', pathMatch: 'full'},
          {path: '', component: HomePageComponent},
          {path: 'post/:id', component: PostPageComponent}
      ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/shared/admin.module').then(m => m.AdminModule)
  }
];


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardPageComponent,
    PostComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
