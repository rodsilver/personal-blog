import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Locale = 'en-US' | 'es-LA';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'preferred-locale';

  readonly currentLocale = signal<Locale>(this.getInitialLocale());
  readonly translations = signal<Translations>({});
  readonly isLoading = signal(true);

  readonly localeLabel = computed(() => {
    return this.currentLocale() === 'en-US' ? 'English' : 'Español';
  });

  constructor() {
    this.loadTranslations(this.currentLocale());
  }

  private getInitialLocale(): Locale {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Locale;
      if (stored === 'en-US' || stored === 'es-LA') {
        return stored;
      }
    }

    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language;
      if (browserLang.startsWith('es')) {
        return 'es-LA';
      }
    }

    return 'en-US';
  }

  async setLocale(locale: Locale): Promise<void> {
    if (locale === this.currentLocale()) return;

    this.isLoading.set(true);
    await this.loadTranslations(locale);
    this.currentLocale.set(locale);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, locale);
    }
  }

  private async loadTranslations(locale: Locale): Promise<void> {
    try {
      const translations = await firstValueFrom(
        this.http.get<Translations>(`/data/i18n/${locale}.json`)
      );
      this.translations.set(translations);
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      this.translations.set({});
    } finally {
      this.isLoading.set(false);
    }
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: string | Translations = this.translations();

    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }
}
