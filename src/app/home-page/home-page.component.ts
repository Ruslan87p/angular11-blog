import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private vcref: ViewContainerRef,
    private cfr: ComponentFactoryResolver) { }

    posts = ["Test One", "Test Two", "Test Three"];


  ngOnInit(): void {
  }

}
