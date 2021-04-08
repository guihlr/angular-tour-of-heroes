import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common'

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  // No componente hero-new iremos iniciaro heroi com um json em branco
  hero: Hero = {} as Hero;

  constructor(
    private location: Location
  ) { }

  onGoBack() {
    this.location.back();
  }

  onSaved() {
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.goBack();
  }

  ngOnInit(): void {
  }


}
