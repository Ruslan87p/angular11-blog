import { NgModule, Provider } from '@angular/core';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/shared/auth.interceptor';
import { SharedService } from './shared/shared/shared.service';
import { SearchPipe } from './admin/shared/search.pipe';
import { registerLocaleData } from '@angular/common';
import ilLocale from '@angular/common/locales/en-IL';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// локализация даты в админке в постах
registerLocaleData(ilLocale, 'il')

const INTERCEPTOR_PROVIDER: Provider = {
  // токен который характеризует интерсепторы
  provide: HTTP_INTERCEPTORS,
  // чтобы не контачили интерсепторы, если будет добавлен новый то выполнится последовательно
  multi: true,
  // параметр со значением интерсептора
  useClass: AuthInterceptor
}

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
    HomePageComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      // useHash: false
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [INTERCEPTOR_PROVIDER, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
