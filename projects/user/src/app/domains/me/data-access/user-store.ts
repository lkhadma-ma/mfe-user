import { Injectable, inject, signal } from "@angular/core";
import { UserComplated } from "./user";
import { AuthHttpService } from "@shared/auth/auth-http.service";
import { AlertService } from "@shared/commun/alert.service";
import { Education } from "./education";
import { Experience } from "./experience";
import { Certification } from "./certification";



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
        },
        () => {
            this.userSignal.set(null);
            this.isCurrentUserSignal.set(false);
            this.alert.show("We couldn't load user", 'error');
        }
        );
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
        },
        () => {
          this.alert.show("We couldn't update about section", 'error');
        }
        );
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
        },
        () => {
          this.alert.show("We couldn't update services headline", 'error');
        }
        );
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
        },
        () => {
          this.alert.show("We couldn't update education", 'error');
        }
        );
        
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
        },
        ()=> {
          this.alert.show("We couldn't delete education", 'error');
        }
        );
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
        },
        ()=> {
          this.alert.show("We couldn't update experience", 'error');
        }
        );
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
        },
        ()=> {
          this.alert.show("We couldn't delete experience", 'error');
        });
    }

    deleteCertification(id: string | number) {
      this.http.delete<void>(`${this.baseUrl}/certifications/${id}`).subscribe(() => {
        const current = this.userSignal();
        if (!current) return;
    
        this.userSignal.set({
          ...current,
          certifications: current.certifications.filter(cert => cert.id !== id),
        });
        this.alert.show('Certification deleted successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't delete certification", 'error');
      });

    }
    updateCertification(certificate: Certification) {
      this.http.put<any>(`${this.baseUrl}/certifications`, certificate).subscribe((updatedCertification) => {
        const current = this.userSignal();
        if (!current) return;

        let certifications:any;
        const certificationExists = current.certifications.find((cert: { id: any; }) => cert.id === updatedCertification.id);
        
        if(certificationExists){
          certifications = current.certifications.map((cert: { id: any; }) =>
            cert.id === updatedCertification.id ? updatedCertification : cert
          );
        }else {
          certifications = [...current.certifications, updatedCertification];
        }
    
        this.userSignal.set({
          ...current,
          certifications,
        });
        this.alert.show('Certification updated successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't update certification", 'error');
      });
    }

}