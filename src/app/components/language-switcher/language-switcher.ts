import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService, Locale } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-switcher',
  imports: [TranslatePipe],
  template: `
    <div class="relative">
      <button
        type="button"
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
        [attr.aria-label]="'language.switch' | translate"
        (click)="toggleDropdown()"
      >
        <span aria-hidden="true">{{ currentFlag }}</span>
        <span>{{ i18n.localeLabel() }}</span>
        <svg
          class="w-4 h-4 transition-transform"
          [class.rotate-180]="isOpen"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      @if (isOpen) {
        <ul
          class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
          role="listbox"
          [attr.aria-label]="'language.switch' | translate"
        >
          @for (locale of locales; track locale.code) {
            <li>
              <button
                type="button"
                role="option"
                [attr.aria-selected]="i18n.currentLocale() === locale.code"
                class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors"
                [class.bg-indigo-50]="i18n.currentLocale() === locale.code"
                [class.text-indigo-600]="i18n.currentLocale() === locale.code"
                (click)="selectLocale(locale.code)"
              >
                <span aria-hidden="true">{{ locale.flag }}</span>
                <span>{{ locale.label }}</span>
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  readonly i18n = inject(I18nService);

  isOpen = false;

  readonly locales = [
    { code: 'en-US' as Locale, label: 'English', flag: '🇺🇸' },
    { code: 'es-LA' as Locale, label: 'Español', flag: '🇲🇽' },
  ];

  get currentFlag(): string {
    return this.i18n.currentLocale() === 'en-US' ? '🇺🇸' : '🇲🇽';
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLocale(locale: Locale): void {
    this.i18n.setLocale(locale);
    this.isOpen = false;
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-language-switcher')) {
      this.isOpen = false;
    }
  }
}
