import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, TranslatePipe],
  template: `
    <section id="about" class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {{ 'about.title' | translate }}
            </h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ 'about.description' | translate }}
            </p>
            <a
              routerLink="/about"
              class="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
            >
              {{ 'about.subtitle' | translate }}
              <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ 'about.skills.title' | translate }}
            </h3>
            <ul class="grid grid-cols-2 gap-3">
              @for (skill of skills(); track skill.name) {
                <li class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span class="text-2xl" aria-hidden="true">{{ skill.icon }}</span>
                  <span class="text-gray-700 font-medium">{{ skill.name }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly skills = signal<Skill[]>([
    { name: 'TypeScript', icon: '📘' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
  ]);
}
