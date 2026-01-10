import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="py-12 bg-gray-900 text-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 class="text-xl font-bold mb-4">Rodrigo</h2>
            <p class="text-gray-400">
              Software developer sharing knowledge and building cool things on the web.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a routerLink="/" class="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a routerLink="/blog" class="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a routerLink="/projects" class="text-gray-400 hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a routerLink="/about" class="text-gray-400 hover:text-white transition-colors">About</a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 class="text-lg font-semibold mb-4">Connect</h3>
            <ul class="flex gap-4">
              @for (link of socialLinks(); track link.name) {
                <li>
                  <a
                    [href]="link.url"
                    class="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="link.name"
                  >
                    <span class="text-2xl" aria-hidden="true">{{ link.icon }}</span>
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {{ currentYear }} Rodrigo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ]);
}
