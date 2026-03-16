import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Aboutme } from './aboutme/aboutme';
import { Myskills } from "./myskills/myskills";
import { Portfolio } from './portfolio/portfolio';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-main-content',
  imports: [Hero, Aboutme, Myskills, Portfolio, Contact],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {

}
