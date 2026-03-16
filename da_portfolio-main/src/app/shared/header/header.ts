import { Component, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

/**
 * Header component that allows the user to switch between different languages.
 * 
 * It displays language switch links and highlights the currently active language.
 * Uses `ngx-translate` for internationalization.
 */
@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  
  /** The currently active language code (e.g., 'en', 'de').  */
  currentLang: string = 'en';

  showMenu: boolean = false;

  private readonly iconMenuFrames = [
    '/icons/burger.svg',
    '/icons/burger-transition.svg',
    '/icons/close-transition.svg',
    '/icons/close.svg'
  ];

  iconMenu = this.iconMenuFrames[0];

  private frameTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Initializes the Header component and sets the current language
   * based on the TranslateService.
   * 
   * @param translate The translation service used for switching and retrieving languages.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
  }

  /** Clean up timers when the component is destroyed. */
  ngOnDestroy(): void {
    if (this.frameTimer) {
      clearTimeout(this.frameTimer);
    }
  }

  /**
   * Switches the application language.
   *
   * @param lang The language code to switch to (e.g., 'en', 'de').
   */
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    this.animateMenuIcon(this.showMenu);
  }

  /**
   * Plays the frame sequence—forward when opening (0→3),
   * backward when closing (3→0).
   */
  private animateMenuIcon(opening: boolean): void {
    // Clear any previous timer to avoid overlap.
    if (this.frameTimer) {
      clearTimeout(this.frameTimer);
    }

    const sequence = opening ? [0, 1, 2, 3] : [3, 2, 1, 0];
    let idx = 0;

    const advance = () => {
      this.iconMenu = this.iconMenuFrames[sequence[idx]];
      idx++;
      if (idx < sequence.length) {
        this.frameTimer = setTimeout(advance, 60); // 60 ms per frame
      } else {
        this.frameTimer = null; // finished
      }
    };

    advance(); // start!
  }
}
