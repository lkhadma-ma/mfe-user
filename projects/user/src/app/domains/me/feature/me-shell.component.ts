import { Component, OnInit, signal, inject, WritableSignal, computed, ViewChild, ViewContainerRef, effect, Injector } from '@angular/core';
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
import { Observable } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/native-federation';


@Component({
  selector: 'mfe-user-me-shell',
  imports: [SectionComponent, HeaderComponent, AboutComponent, ServiceComponent, ExperienceComponent, EducationComponent, CertificationComponent, ProjectComponent, SkillComponent, RecommendationsTabComponent],
  template: `
    <app-section ngxClass="md:mfe-user-pt-[5rem] mfe-user-min-h-screen" >
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
          <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
          @let user = userInStore();
          @let isCurrentUser = isCurrentUserInStore();
          @if(user){
            <mfe-user-header [isCurrentUser]="isCurrentUser" [user]="user" (update)="updateHeader($event)"></mfe-user-header>
            
            <mfe-user-about [description]="user.about" [isCurrentUser]="isCurrentUser" (update)="updateAbout($event)"></mfe-user-about>

            <mfe-user-service (update)="updateServicesHeadline($event)" [isCurrentUser]="isCurrentUser" [service]="user?.service?.headline"></mfe-user-service>

            <mfe-user-experience (delete)="deleteExperience($event)" (update)="updateExperience($event)"  [isCurrentUser]="isCurrentUser" [experiences]="user.experiences"></mfe-user-experience>

            <mfe-user-education (delete)="deleteEducation($event)" (update)="updateEducation($event)" [isCurrentUser]="isCurrentUser" [educations]="user.educations"></mfe-user-education>

            <mfe-user-certification (delete)="deleteCertification($event)" (update)="updateCertification($event)" [certifications]="user.certifications" [isCurrentUser]="isCurrentUser"></mfe-user-certification>

            <mfe-user-project (delete)="deleteProject($event)" (update)="updateProject($event)" [isCurrentUser]="isCurrentUser" [projects]="user.projects"></mfe-user-project>

            <mfe-user-skill (delete)="deleteSkill($event)" (update)="updateSkill($event)" [isCurrentUser]="isCurrentUser" [skills]="user.skills"></mfe-user-skill>

            <mfe-user-recommendation (delete)="deleteRecommendation($event)" (update)="updateRecommendation($event)" [fetchUserOptions]="fetchUserOptions" [isCurrentUser]="isCurrentUser" [givenRecommendations]="recommendations().given" [receivedRecommendations]="recommendations().received"></mfe-user-recommendation>
          }
          </div>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-block">
          <ng-template #switchAccount></ng-template>
        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements OnInit {
  private userStore = inject(UserStore);
  private route = inject(ActivatedRoute);
  private injector = inject(Injector);

  @ViewChild('switchAccount', { read: ViewContainerRef, static: true })
  switchAccountContainer!: ViewContainerRef;
  
  userInStore = this.userStore.user;
  isCurrentUserInStore  = this.userStore.isCurrentUser;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username')!;
      this.userStore.loadUser(username);
    });
  }

  
  constructor() {
    effect(() => {
      if (this.isCurrentUserInStore()) {
        this.loadsSwitchAccountComponent();
      } else {
        this.switchAccountContainer.clear();
      }
    });
  }

  async loadsSwitchAccountComponent() {
    const switchAccountModule = await loadRemoteModule({
      remoteName: 'shared', 
      exposedModule: './ShellSwitchAccountComponent'
    });

    const shellSwitchAccountComponent = switchAccountModule.ShellSwitchAccountComponent;

    this.switchAccountContainer.createComponent(shellSwitchAccountComponent, { injector: this.injector });
  }

  recommendations = computed(() => {
    const user = this.userInStore();
    if (!user) return { given: [], received: [] };
  
    const given = user.recommendations.filter(rec => rec.user.username === user.username);
    const received = user.recommendations.filter(rec => rec.relationship.username === user.username);
  
    return { given, received };
  });

  updateAbout(about: string) {
    this.userStore.updateAbout(about);
  }

  updateServicesHeadline(servicesHeadline: string) {
    this.userStore.updateServicesHeadline(servicesHeadline);
  }

  updateEducation(education: object) {
    this.userStore.updateEducation(education as any);
  }

  deleteEducation(id: string | number) {
    this.userStore.deleteEducation(id);
  }

  updateExperience(experience: object) {
    this.userStore.updateExperience(experience as any);
  }

  deleteExperience(id: string | number) {
    this.userStore.deleteExperience(id);
  }

  updateCertification(certification: object) {
    this.userStore.updateCertification(certification as any);
  }

  deleteCertification(id: string | number) {
    this.userStore.deleteCertification(id);
  }

  deleteProject(id: string | number) {
    this.userStore.deleteProject(id);
  }

  updateProject(project: object) {
    this.userStore.updateProject(project as any);
  }

  updateSkill(skill: object) {
    this.userStore.updateSkill(skill as any);
  }

  deleteSkill(id: string | number) {
    this.userStore.deleteSkill(id);
  }

  fetchUserOptions = (username: string): Observable<any[]> => {
    return this.userStore.fetchUserOptions(username);
  }

  updateRecommendation(recommendation: object) {
    this.userStore.updateRecommendation(recommendation as any);
  }

  deleteRecommendation(id: string | number) {
    this.userStore.deleteRecommendation(id);
  }

  updateHeader(data: { name?: string; headline?: string; avatar?:File; bg?:File; action:string; }) {
    this.userStore.updateHeader(data);
  }
}
