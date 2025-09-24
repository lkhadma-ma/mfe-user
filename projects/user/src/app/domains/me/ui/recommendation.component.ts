
import { Component, Input, input } from '@angular/core';
import { DescriptionComponent } from "./description.component";
import { Recommendation } from '../data-access/recommendation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-user-recommendation',
  template: `
<div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
  <div class="mfe-user-px-4 mfe-user-py-4 mfe-user-space-y-2">
    <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-xl mfe-user-mb-7">Recommendations</h1>
    
    <!-- Tab Headers -->
    <div class="mfe-user-border-b mfe-user-border-gray-200">
      <nav class="mfe-user--mfe-user-mb-px mfe-user-flex mfe-user-space-x-8">
        <button
          (click)="selectTab('received')"
          [class]="getTabClass('received')">
          Received
        </button>
        <button 
          (click)="selectTab('given')"
          [class]="getTabClass('given')">
          Given
        </button>
      </nav>
    </div>
    
    <!-- Tab Content -->
    <div class="mfe-user-mt-4">
        @if(activeTab === 'received'){
            <div class="mfe-user-space-y-4">
              <!-- Received Recommendations Content -->
              @for (recommendation of receivedRecommendations(); track $index) {
                <div class="mfe-user-border mfe-user-rounded-lg mfe-user-p-4 mfe-user-bg-gray-50">
                  <div class="mfe-user-flex mfe-user-space-x-4 mfe-user-mt-4">
                  <img class="mfe-user-w-14 mfe-user-h-14 mfe-user-rounded-full" [src]="recommendation.user.avatar" alt="">
                    <div>
                      <h3 class="mfe-user-font-medium mfe-user-text-gray-900">{{ recommendation.user.name }}</h3>
                      <p class="mfe-user-text-sm mfe-user-text-gray-600">{{ recommendation.user.headline }}</p>
                      <p class="mfe-user-text-xs mfe-user-text-gray-500">{{ recommendation.createdAt | date:'MMM yyyy' }}, {{ recommendation.user.name.split(' ')[0] }} managed {{ recommendation.relationship.name.split(' ')[0] }} directly on role {{ recommendation.position }}</p>
                    </div>
                  </div>
                  <div class="mfe-user-mt-3">
                      <mfe-user-description class="mfe-user-mb-2" [description]="recommendation.recommendation"></mfe-user-description>
                  </div>
                </div>
              } @empty {
                <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
                  <p>No recommendations received yet.</p>
                </div>
              }
              
              <!-- Add more received recommendations as needed -->
            </div>
        }
        @if(activeTab === 'given'){
            <div class="mfe-user-space-y-4">
               <!-- Given Recommendations Content -->
                @for (recommendation of givenRecommendations(); track $index) {
                  <div class="mfe-user-border mfe-user-rounded-lg mfe-user-p-4 mfe-user-bg-gray-50">
                    <div class="mfe-user-flex mfe-user-space-x-4 mfe-user-mt-4">
                    <img class="mfe-user-w-14 mfe-user-h-14 mfe-user-rounded-full" [src]="recommendation.relationship.avatar" alt="">
                      <div>
                        <h3 class="mfe-user-font-medium mfe-user-text-gray-900">{{ recommendation.relationship.name }}</h3>
                        <p class="mfe-user-text-sm mfe-user-text-gray-600">{{ recommendation.relationship.headline }}</p>
                        <p class="mfe-user-text-xs mfe-user-text-gray-500">{{ recommendation.createdAt | date:'MMM yyyy' }}, {{ recommendation.user.name.split(' ')[0] }} managed {{ recommendation.relationship.name.split(' ')[0] }} directly on role {{ recommendation.position }}</p>
                      </div>
                    </div>
                    <div class="mfe-user-mt-3">
                        <mfe-user-description class="mfe-user-mb-2" [description]="recommendation.recommendation"></mfe-user-description>
                    </div>
                  </div>
                } @empty {
                  <div class="mfe-user-text-center mfe-user-py-8 mfe-user-text-gray-500">
                    <p>No recommendations given yet.</p>
                  </div>
                }
                
                <!-- Add more given recommendations as needed -->  

            </div>
        }
    </div>
  </div>
</div>
  
  
  
  
  
  `,
  imports: [DescriptionComponent, CommonModule]
})
export class RecommendationsTabComponent {
  givenRecommendations =  input<Recommendation[]>();
  receivedRecommendations =  input<Recommendation[]>();
  activeTab: string = 'received';
  
  selectTab(tab: string): void {
    this.activeTab = tab;
  }
  
  getTabClass(tab: string): string {
    const baseClasses = 'mfe-user-py-2 mfe-user-px-1 mfe-user-font-medium mfe-user-text-sm mfe-user-whitespace-nowrap mfe-user-focus:outline-none';
    
    if (this.activeTab === tab) {
      return `${baseClasses} mfe-user-border-b-2 mfe-user-border-blue-500 mfe-user-text-blue-600`;
    } else {
      return `${baseClasses} mfe-user-border-b-2 mfe-user-border-transparent mfe-user-text-gray-500 hover:mfe-user-text-gray-700 hover:mfe-user-border-gray-300`;
    }
  }

  description = `A highly motivated and skilled software engineer with a strong foundation in computer science and a passion for developing innovative solutions. Experienced in full-stack development, cloud computing, and agile methodologies. Proven ability to work collaboratively in team environments and deliver high-quality software products. Seeking to leverage my technical expertise and problem-solving skills to contribute to cutting-edge projects in a dynamic organization.`
}