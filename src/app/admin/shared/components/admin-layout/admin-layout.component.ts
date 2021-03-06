import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    public authSvc: AuthService
    ) { }

  @ViewChild('sidenav') sidenav: any;

  ngOnInit(): void {
  }

  logOut(event: Event) {
    event.preventDefault();
    console.log(event);
    this.authSvc.logOut();
    this.router.navigate(['/admin', 'login']);
  }

  public onToggleSidenav = () => {
    this.sidenav.toggle();
  }

}
