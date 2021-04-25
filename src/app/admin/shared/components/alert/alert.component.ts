import { Subscription } from 'rxjs';
import { AlertService } from './../../alert.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public text!: string;
  public type = 'success';
  sub!: Subscription;

  constructor(
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.sub = this.alertSvc.alert$
    .subscribe( alert => {
      this.text = alert.text,
      this.type = alert.type

      const timeOut = setTimeout( () => {
        clearTimeout(timeOut)

        this.text = '';
      }, this.delay)
    })
    
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
