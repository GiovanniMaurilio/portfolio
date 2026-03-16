import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  imports: [TranslateModule, CommonModule],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project {
  @Input() project = '';
  @Input() align: 'left' | 'right' = 'left';
  @Input() skills: string[] = [];

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
