import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  imports: [Header, Footer, RouterLink, DatePipe],
  template: `
    <app-header />
    <main id="main-content" class="min-h-screen py-20">
      <div class="max-w-3xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog</h1>
        <p class="text-xl text-gray-600 mb-12">
          Thoughts, tutorials, and lessons learned from my journey as a developer.
        </p>

        @if (posts(); as postList) {
          <ul class="space-y-8">
            @for (post of postList; track post.slug) {
              <li>
                <article class="group">
                  <a [routerLink]="['/blog', post.slug]" class="block">
                    <time
                      [attr.datetime]="post.date"
                      class="text-sm text-gray-500 mb-2 block"
                    >
                      {{ post.date | date: 'MMMM d, yyyy' }}
                    </time>
                    <h2
                      class="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2"
                    >
                      {{ post.title }}
                    </h2>
                    <p class="text-gray-600 mb-3">{{ post.excerpt }}</p>
                    <ul class="flex flex-wrap gap-2" aria-label="Post tags">
                      @for (tag of post.tags; track tag) {
                        <li
                          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {{ tag }}
                        </li>
                      }
                    </ul>
                  </a>
                </article>
              </li>
            } @empty {
              <li class="text-gray-500">No posts yet. Check back soon!</li>
            }
          </ul>
        } @else {
          <p class="text-gray-500">Loading posts...</p>
        }
      </div>
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly blogService = inject(BlogService);
  readonly posts = toSignal(this.blogService.getPosts());
}
