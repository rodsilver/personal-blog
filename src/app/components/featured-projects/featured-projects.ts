import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
}

@Component({
  selector: 'app-featured-projects',
  imports: [RouterLink],
  template: `
    <section id="projects" class="py-20 bg-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            A selection of projects I've worked on. Each one taught me something new
            and helped me grow as a developer.
          </p>
        </div>

        <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of projects(); track project.title) {
            <li>
              <article class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
                <p class="text-gray-600 mb-4 grow">{{ project.description }}</p>
                <div class="space-y-4">
                  <ul class="flex flex-wrap gap-2" aria-label="Technologies used">
                    @for (tag of project.tags; track tag) {
                      <li class="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full">
                        {{ tag }}
                      </li>
                    }
                  </ul>
                  <div class="flex gap-4">
                    <a
                      [href]="project.link"
                      class="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                      <span class="sr-only">{{ project.title }}</span>
                    </a>
                    @if (project.github) {
                      <a
                        [href]="project.github"
                        class="text-gray-500 hover:text-gray-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                        <span class="sr-only">repository for {{ project.title }}</span>
                      </a>
                    }
                  </div>
                </div>
              </article>
            </li>
          }
        </ul>

        <div class="text-center mt-12">
          <a
            routerLink="/projects"
            class="inline-flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjects {
  readonly projects = signal<Project[]>([
    {
      title: 'Project Alpha',
      description: 'A full-stack web application built with Angular and Node.js for managing team workflows.',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Beta',
      description: 'An open-source CLI tool that automates repetitive development tasks.',
      tags: ['TypeScript', 'Node.js', 'CLI'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Gamma',
      description: 'A real-time dashboard for monitoring application performance metrics.',
      tags: ['Angular', 'WebSockets', 'D3.js'],
      link: '#',
    },
  ]);
}
