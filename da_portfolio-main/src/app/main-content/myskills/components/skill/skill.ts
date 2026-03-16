import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skill',
  imports: [TranslateModule],
  templateUrl: './skill.html',
  styleUrl: './skill.scss'
})
export class Skill {
  @Input() skill = '';
  
  @ViewChild('element', { static: true }) elementRef!: ElementRef;
  isVisible = false;

  constructor(private translate: TranslateService) {
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    }, { threshold: 0.1 });

    observer.observe(this.elementRef.nativeElement);
  }
}
