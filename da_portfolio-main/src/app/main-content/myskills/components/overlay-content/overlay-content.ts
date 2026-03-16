import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-content',
  imports: [TranslateModule],
  templateUrl: './overlay-content.html',
  styleUrl: './overlay-content.scss'
})
export class OverlayContent {
  constructor(private translate: TranslateService) {
  }
}
