import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Skill } from './components/skill/skill';
import {
  OverlayModule,
  OverlayRef,
  OverlayPositionBuilder,
  Overlay
} from '@angular/cdk/overlay';
import { OverlayContent } from './components/overlay-content/overlay-content';
import { ComponentPortal } from '@angular/cdk/portal';
import { RouterLink } from '@angular/router';
import { SectionDivider } from '../../shared/section-divider/section-divider';

@Component({
  selector: 'app-myskills',
  imports: [TranslateModule, Skill, OverlayModule, RouterLink, SectionDivider ],
  templateUrl: './myskills.html',
  styleUrl: './myskills.scss'
})
export class Myskills {
  @ViewChild('target') targetRef!: ElementRef;
  @ViewChild('contentContainer', { static: true }) contentContainerRef!: ElementRef;

  private overlayRef: OverlayRef | null = null;

  constructor(private translate: TranslateService, 
            private overlay: Overlay,
            private positionBuilder: OverlayPositionBuilder,
            private viewContainerRef: ViewContainerRef,
  ) {
    
  }

  showTooltip() {
    if (this.overlayRef) return;

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.targetRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: 8
        }
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new ComponentPortal(OverlayContent, this.viewContainerRef);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);

    const overlayElement = this.overlayRef.overlayElement;
    overlayElement.addEventListener('mouseleave', () => this.hideTooltip());
    overlayElement.addEventListener('mouseenter', () => clearTimeout(this.hideTimeout));
    overlayElement.addEventListener('click', () => this.hideTooltip());
  }

  private hideTimeout: any;

  hideTooltip() {
    this.hideTimeout = setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
    }, 200); 
  }
}
