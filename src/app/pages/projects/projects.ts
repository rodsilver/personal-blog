import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-projects',
  imports: [Header, Footer],
  template: `
    <app-header />
    <main id="main-content" class="min-h-screen py-20">
      <div class="max-w-5xl mx-auto px-6">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Projects</h1>
        <p class="text-xl text-gray-600 mb-12">
          A collection of projects I've built and contributed to.
        </p>
        <p class="text-gray-500">Coming soon...</p>
      </div>
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {}
