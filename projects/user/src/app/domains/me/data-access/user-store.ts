import { Injectable, inject, signal } from "@angular/core";
import { UserComplated } from "./user";
import { AuthHttpService } from "@shared/auth/auth-http.service";
import { AlertService } from "@shared/commun/alert.service";
import { Education } from "./education";
import { Experience } from "./experience";



@Injectable({ providedIn: 'root' })
export class UserStore {
    // Inject
    private http = inject(AuthHttpService);
    private alert = inject(AlertService);

    // Constants
    private readonly baseUrl = 'http://localhost:8080/mbe-user/api/v1';
    
    // Signals
    private userSignal = signal<UserComplated | null>(null);
    private isCurrentUserSignal = signal<boolean>(false);

    // Methods
    user = this.userSignal.asReadonly();
    isCurrentUser = this.isCurrentUserSignal.asReadonly();

    // Actions
    loadUser(username: string) {
        this.http.get<{
          search: UserComplated,
          current: string
        }>(`${this.baseUrl}/users/${username}`).subscribe(user => {
            this.userSignal.set(user.search);
            this.isCurrentUserSignal.set(user.current === user.search.username);
        });
    }

    updateAbout(aboutIn: string) {
        this.http.put<{ about: string }>(`${this.baseUrl}/users/about`, { about: aboutIn }).subscribe(({ about }) => {
          const current = this.userSignal();
          if (!current) return;
      
          this.userSignal.set({
            ...current,
            about,
          });
          this.alert.show('About section updated successfully', 'success');
        });
    }

    updateServicesHeadline(servicesHeadline: string) {
        this.http.put<{ headline: string }>(`${this.baseUrl}/service/headline`, { headline : servicesHeadline }).subscribe(({ headline }) => {
          const current = this.userSignal();
          if (!current) return;
      
          this.userSignal.set({
            ...current,
            service: {
                ...current.service,
                headline,
            }
          });
          this.alert.show('Services headline updated successfully', 'success');
        });
    }

    updateEducation(education: Education) {
        this.http.put<Education>(`${this.baseUrl}/educations`, education).subscribe((updatedEducation) => {
          const current = this.userSignal();
          if (!current) return;

          let educations:any;
          const educationExists = current.educations.find(edu => edu.id === updatedEducation.id);
          
          if(educationExists){
            educations = current.educations.map(edu =>
              edu.id === updatedEducation.id ? updatedEducation : edu
            );
          }else {
            educations = [...current.educations, updatedEducation];
          }
      
          this.userSignal.set({
            ...current,
            educations,
          });

          this.alert.show('Education updated successfully', 'success');
        });
        
    }
    
    deleteEducation(id: string | number) {
        this.http.delete<void>(`${this.baseUrl}/educations/${id}`).subscribe(() => {
          const current = this.userSignal();
          if (!current) return;
      
          this.userSignal.set({
            ...current,
            educations: current.educations.filter(edu => edu.id !== id),
          });
          this.alert.show('Education deleted successfully', 'success');
        });
    }

    updateExperience(experience: Experience) {
        this.http.put<Experience>(`${this.baseUrl}/experiences`, experience).subscribe((updatedExperience) => {
          const current = this.userSignal();
          if (!current) return;

          let experiences:any;
          const experienceExists = current.experiences.find(exp => exp.id === updatedExperience.id);
          
          if(experienceExists){
            experiences = current.experiences.map(exp =>
              exp.id === updatedExperience.id ? updatedExperience : exp
            );
          }else {
            experiences = [...current.experiences, updatedExperience];
          }
      
          this.userSignal.set({
            ...current,
            experiences,
          });

          this.alert.show('Experience updated successfully', 'success');
        });
    }

    deleteExperience(id: string | number) {
        this.http.delete<void>(`${this.baseUrl}/experiences/${id}`).subscribe(() => {
          const current = this.userSignal();
          if (!current) return;
      
          this.userSignal.set({
            ...current,
            experiences: current.experiences.filter(exp => exp.id !== id),
          });
          this.alert.show('Experience deleted successfully', 'success');
        });
    }

}