import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SectionDivider } from '../../../../shared/section-divider/section-divider';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, RouterLink, SectionDivider],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  @ViewChild('contentContainer', { static: true }) contentContainerRef!: ElementRef;
  
  constructor(private translate: TranslateService) {
      }
}
