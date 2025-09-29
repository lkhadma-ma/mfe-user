import { Component, OnInit, signal, inject, WritableSignal } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { UserComplated } from '../data-access/user';
import { UserStore } from '../data-access/user-store';
import { HeaderComponent } from "../ui/header.component";
import { AboutComponent } from "../ui/about.component";
import { ServiceComponent } from "../ui/service.component";
import { ExperienceComponent } from "../ui/experience.component";
import { EducationComponent } from "../ui/education.component";
import { CertificationComponent } from "../ui/certification.component";
import { ProjectComponent } from "../ui/project.component";
import { SkillComponent } from "../ui/skill.component";
import { RecommendationsTabComponent } from "../ui/recommendation.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'mfe-user-post-shell',
  imports: [SectionComponent, HeaderComponent, AboutComponent, ServiceComponent, ExperienceComponent, EducationComponent, CertificationComponent, ProjectComponent, SkillComponent, RecommendationsTabComponent],
  template: `
    <app-section ngxClass="md:mfe-user-pt-[5rem] mfe-user-min-h-screen" >
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
          <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
          @let user = userInStore();
          @if(user){
            <mfe-user-header [user]="user"></mfe-user-header>
            
            <mfe-user-about [description]="user.about" (update)="updateAbout($event)"></mfe-user-about>

            <mfe-user-service (update)="updateServicesHeadline($event)" [service]="user?.service?.headline"></mfe-user-service>

            <mfe-user-experience [experiences]="user.experiences"></mfe-user-experience>

            <mfe-user-education [educations]="user.educations"></mfe-user-education>

            <mfe-user-certification [certifications]="user.certifications"></mfe-user-certification>

            <mfe-user-project [projects]="user.projects"></mfe-user-project>

            <mfe-user-skill [skills]="user.skills"></mfe-user-skill>

            <mfe-user-recommendation [givenRecommendations]="recommendation('given')" [receivedRecommendations]="recommendation('received')"></mfe-user-recommendation>
          }
          </div>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-block">

        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements OnInit {
  private userStore = inject(UserStore);
  private route = inject(ActivatedRoute);
  userInStore = this.userStore.user;

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.userStore.loadUser(username);
  }

  recommendation(type: 'given' | 'received') {
    switch (type) {
      case 'given':
        return this.userInStore()?.recommendations.filter(rec => rec.user.username === this.userInStore()?.username) || [];
      case 'received':
        return this.userInStore()?.recommendations.filter(rec => rec.relationship.username === this.userInStore()?.username) || [];
      default:
        return [];
    }
  }

  updateAbout(about: string) {
    this.userStore.updateAbout(about);
  }

  updateServicesHeadline(servicesHeadline: string) {
    this.userStore.updateServicesHeadline(servicesHeadline);
  }
}
