import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { FeaturedProjects } from '../../components/featured-projects/featured-projects';
import { RecentPosts } from '../../components/recent-posts/recent-posts';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, About, FeaturedProjects, RecentPosts, Footer],
  template: `
    <app-header />
    <main id="main-content">
      <app-hero />
      <app-about />
      <app-featured-projects />
      <app-recent-posts />
    </main>
    <app-footer />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
