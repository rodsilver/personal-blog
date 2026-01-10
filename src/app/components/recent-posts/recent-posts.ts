import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-recent-posts',
  imports: [DatePipe, RouterLink],
  template: `
    <section id="blog" class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Posts</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials, and lessons learned from my journey as a developer.
          </p>
        </div>

        @if (posts(); as postList) {
          <ul class="space-y-6">
            @for (post of postList; track post.slug) {
              <li>
                <article class="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <a [routerLink]="['/blog', post.slug]" class="block group">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div class="grow">
                        <h3
                          class="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2"
                        >
                          {{ post.title }}
                        </h3>
                        <p class="text-gray-600 mb-3">{{ post.excerpt }}</p>
                        <ul class="flex flex-wrap gap-2" aria-label="Post tags">
                          @for (tag of post.tags; track tag) {
                            <li class="px-2 py-1 bg-white text-gray-600 text-xs rounded border border-gray-200">
                              {{ tag }}
                            </li>
                          }
                        </ul>
                      </div>
                      <div
                        class="flex md:flex-col items-center md:items-end gap-2 text-sm text-gray-500 shrink-0"
                      >
                        <time [attr.datetime]="post.date">
                          {{ post.date | date: 'MMM d, yyyy' }}
                        </time>
                        <span class="md:hidden">&middot;</span>
                        <span>{{ post.readTime }}</span>
                      </div>
                    </div>
                  </a>
                </article>
              </li>
            } @empty {
              <li class="text-gray-500 text-center">No posts yet.</li>
            }
          </ul>
        }

        <div class="text-center mt-12">
          <a
            routerLink="/blog"
            class="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentPosts {
  private readonly blogService = inject(BlogService);
  readonly posts = toSignal(this.blogService.getRecentPosts(3));
}
