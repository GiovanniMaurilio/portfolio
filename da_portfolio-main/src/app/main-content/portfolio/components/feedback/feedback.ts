import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SectionDivider } from '../../../../shared/section-divider/section-divider';

@Component({
  selector: 'app-feedback',
  imports: [TranslateModule, SectionDivider],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss'
})
export class Feedback {
  @Input() author = '';  
  @ViewChild('contentContainer', { static: true }) contentContainerRef!: ElementRef;
  
  constructor(private translate: TranslateService) {
  }
}
