import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  imports: [Header, Footer, RouterLink, DatePipe],
  template: `
    <app-header />
    <main id="main-content" class="min-h-screen py-20">
      <article class="max-w-3xl mx-auto px-6">
        @if (post(); as postData) {
          <header class="mb-12">
            <a
              routerLink="/blog"
              class="text-indigo-600 hover:text-indigo-700 transition-colors mb-6 inline-block"
            >
              &larr; Back to Blog
            </a>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {{ postData.title }}
            </h1>
            <div class="flex items-center gap-4 text-gray-500">
              <time [attr.datetime]="postData.date">
                {{ postData.date | date: 'MMMM d, yyyy' }}
              </time>
              <span>&middot;</span>
              <span>{{ postData.readTime }}</span>
            </div>
            <ul class="flex flex-wrap gap-2 mt-4" aria-label="Post tags">
              @for (tag of postData.tags; track tag) {
                <li class="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full">
                  {{ tag }}
                </li>
              }
            </ul>
          </header>

          <div class="prose prose-lg max-w-none" [innerHTML]="formattedContent()"></div>
        } @else if (loading()) {
          <p class="text-gray-500">Loading post...</p>
        } @else {
          <div class="text-center py-12">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p class="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
            <a
              routerLink="/blog"
              class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Blog
            </a>
          </div>
        }
      </article>
    </main>
    <app-footer />
  `,
  styles: `
    .prose h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .prose h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    .prose p {
      color: #374151;
      margin-bottom: 1rem;
      line-height: 1.75;
    }
    .prose ul {
      list-style-type: disc;
      list-style-position: inside;
      margin-bottom: 1rem;
      color: #374151;
    }
    .prose ol {
      list-style-type: decimal;
      list-style-position: inside;
      margin-bottom: 1rem;
      color: #374151;
    }
    .prose li {
      margin-bottom: 0.5rem;
    }
    .prose code {
      background-color: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-family: ui-monospace, monospace;
      color: #4f46e5;
    }
    .prose pre {
      background-color: #111827;
      color: #f3f4f6;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin-bottom: 1rem;
    }
    .prose pre code {
      background-color: transparent;
      padding: 0;
      color: #f3f4f6;
    }
    .prose strong {
      font-weight: 600;
      color: #111827;
    }
    .prose a {
      color: #4f46e5;
      text-decoration: underline;
    }
    .prose a:hover {
      color: #4338ca;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPost {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);

  readonly post = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => this.blogService.getPostBySlug(params.get('slug') ?? ''))
    )
  );

  readonly loading = computed(() => this.post() === undefined);

  readonly formattedContent = computed(() => {
    const postData = this.post();
    if (!postData) return '';
    return this.parseMarkdown(postData.content);
  });

  private parseMarkdown(content: string): string {
    return (
      content
        // Code blocks (must be before inline code)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        // Numbered lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // Paragraphs
        .replace(/\n\n/g, '</p><p>')
        // Wrap in paragraph tags
        .replace(/^(.+)$/gm, (match) => {
          if (
            match.startsWith('<h') ||
            match.startsWith('<ul') ||
            match.startsWith('<ol') ||
            match.startsWith('<pre') ||
            match.startsWith('<li') ||
            match.startsWith('</p>')
          ) {
            return match;
          }
          return `<p>${match}</p>`;
        })
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<h[23]>)/g, '$1')
        .replace(/(<\/h[23]>)<\/p>/g, '$1')
        .replace(/<p>(<ul>)/g, '$1')
        .replace(/(<\/ul>)<\/p>/g, '$1')
        .replace(/<p>(<pre>)/g, '$1')
        .replace(/(<\/pre>)<\/p>/g, '$1')
    );
  }
}
