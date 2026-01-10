import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly postsUrl = '/data/posts.json';

  private readonly posts$ = this.http.get<BlogPost[]>(this.postsUrl).pipe(
    map((posts) => posts.filter((post) => post.published)),
    map((posts) => posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
    shareReplay(1)
  );

  getPosts(): Observable<BlogPost[]> {
    return this.posts$;
  }

  getRecentPosts(limit: number = 3): Observable<BlogPost[]> {
    return this.posts$.pipe(map((posts) => posts.slice(0, limit)));
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.posts$.pipe(map((posts) => posts.find((post) => post.slug === slug)));
  }

  getPostsByTag(tag: string): Observable<BlogPost[]> {
    return this.posts$.pipe(map((posts) => posts.filter((post) => post.tags.includes(tag))));
  }
}
