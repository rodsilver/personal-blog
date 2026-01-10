import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe],
  template: `
    <section class="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="max-w-3xl">
          <p class="text-indigo-600 font-medium mb-4">
            {{ 'hero.greeting' | translate }} {{ 'hero.name' | translate }}
          </p>
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {{ 'hero.role' | translate }}
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            {{ 'hero.description' | translate }}
          </p>
          <div class="flex flex-wrap gap-4">
            <a
              routerLink="/blog"
              class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {{ 'hero.cta.blog' | translate }}
              <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              routerLink="/projects"
              class="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {{ 'hero.cta.projects' | translate }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
