import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-section-divider',
  imports: [CommonModule],
  templateUrl: './section-divider.html',
  styleUrl: './section-divider.scss'
})
export class SectionDivider implements AfterViewInit {
  @Input() containerEl!: HTMLElement;
  @Input() align: 'left' | 'right' | 'both' = 'both';
  @Input() color: string = 'variables.$color_primary1';
  @Input() offset: number = 200;

  private resizeObserver?: ResizeObserver;
  private positionCheckInterval?: number;
  private lastRect?: DOMRect;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.updateLine();

  if (!this.containerEl) {
    console.log("empty!!");
    
  }

    this.resizeObserver = new ResizeObserver(() => this.updateLine());
    this.resizeObserver.observe(this.containerEl);

    this.lastRect = this.containerEl.getBoundingClientRect();
    this.positionCheckInterval = window.setInterval(() => {
      const newRect = this.containerEl.getBoundingClientRect();
      if (
        newRect.left !== this.lastRect!.left ||
        newRect.top !== this.lastRect!.top
      ) {
        this.lastRect = newRect;
        this.updateLine();
      }
    }, 200);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.positionCheckInterval) {
      clearInterval(this.positionCheckInterval);
    }
  }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => {
      requestAnimationFrame(() => this.updateLine());
    }, 0);
  }

  private updateLine() {
    if (!this.containerEl) return;

    const rect = this.containerEl.getBoundingClientRect();

    const leftLine = this.el.nativeElement.querySelector('.line-left');
    const rightLine = this.el.nativeElement.querySelector('.line-right');

    if (leftLine) {
      this.renderer.setStyle(leftLine, 'background-color', this.color);
      this.renderer.setStyle(leftLine, 'left', `-${rect.left}px`);
      this.renderer.setStyle(leftLine, 'width', `${rect.left}px`);
    }

    if (rightLine) {
      const rightOffset = window.innerWidth - rect.right + this.offset;
      this.renderer.setStyle(rightLine, 'left', `${this.containerEl.offsetWidth}px`);
      this.renderer.setStyle(rightLine, 'width', `${rightOffset}px`);
      this.renderer.setStyle(rightLine, 'background-color', this.color);
    }
  }

}
