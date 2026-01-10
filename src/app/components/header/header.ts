import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcher],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        <a routerLink="/" class="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
          {{ 'hero.name' | translate }}
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <ul class="flex items-center gap-8">
            @for (link of navLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-indigo-600"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                >
                  {{ link.labelKey | translate }}
                </a>
              </li>
            }
          </ul>
          <app-language-switcher />
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-2">
          <app-language-switcher />
          <button
            type="button"
            class="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-menu"
            (click)="toggleMobileMenu()"
          >
            <span class="sr-only">{{ mobileMenuOpen() ? 'Close menu' : 'Open menu' }}</span>
            @if (mobileMenuOpen()) {
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            } @else {
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      @if (mobileMenuOpen()) {
        <div id="mobile-menu" class="md:hidden bg-white border-b border-gray-100">
          <ul class="px-6 py-4 space-y-4">
            @for (link of navLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-indigo-600"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="block text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                  (click)="closeMobileMenu()"
                >
                  {{ link.labelKey | translate }}
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </header>

    <!-- Spacer for fixed header -->
    <div class="h-16" aria-hidden="true"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly i18n = inject(I18nService);
  readonly mobileMenuOpen = signal(false);

  readonly navLinks = [
    { path: '/', labelKey: 'nav.home', exact: true },
    { path: '/blog', labelKey: 'nav.blog', exact: false },
    { path: '/projects', labelKey: 'nav.projects', exact: false },
    { path: '/about', labelKey: 'nav.about', exact: false },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
