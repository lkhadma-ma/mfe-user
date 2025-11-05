import { Injectable, inject, signal } from "@angular/core";
import { UserComplated } from "./user";
import { AuthHttpService } from "@shared/auth/auth-http.service";
import { AlertService } from "@shared/commun/alert.service";
import { Education } from "./education";
import { Experience } from "./experience";
import { Certification } from "./certification";
import { Project } from "./project";
import { Skill } from "./skill";
import { Recommendation } from "./recommendation";



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

    updateProject(project: Project) {
      this.http.put<any>(`${this.baseUrl}/projects`, project).subscribe((updatedProject) => {
        const current = this.userSignal();
        if (!current) return;

        let projects:any;
        const projectExists = current.projects.find((proj: { id: any; }) => proj.id === updatedProject.id);
        
        if(projectExists){
          projects = current.projects.map((proj: { id: any; }) =>
            proj.id === updatedProject.id ? updatedProject : proj
          );
        }else {
          projects = [...current.projects, updatedProject];
        }
    
        this.userSignal.set({
          ...current,
          projects,
        });
        this.alert.show('Project updated successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't update project", 'error');
      });
    }

    deleteProject(id: string | number) {
      this.http.delete<void>(`${this.baseUrl}/projects/${id}`).subscribe(() => {
        const current = this.userSignal();
        if (!current) return;
    
        this.userSignal.set({
          ...current,
          projects: current.projects.filter(proj => proj.id !== id),
        });
        this.alert.show('Project deleted successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't delete project", 'error');
      });
    }

    deleteSkill(id: string | number) {
      this.http.delete<void>(`${this.baseUrl}/skills/${id}`).subscribe(() => {
        const current = this.userSignal();
        if (!current) return;
    
        this.userSignal.set({
          ...current,
          skills: current.skills.filter(skill => skill.value !== id),
        });
        this.alert.show('Skill deleted successfully', 'success');
      },
      (error)=> {
        this.alert.show(error.error.error, 'error');
      });
    }
    updateSkill(skill: Skill) {
      this.http.put<any>(`${this.baseUrl}/skills`, skill).subscribe((updatedSkill) => {
        const current = this.userSignal();
        if (!current) return;

        let skills:any;
        const skillExists = current.skills.find((sk: { value: any; }) => sk.value === updatedSkill.value);
        
        if(skillExists){
          skills = current.skills.map((sk: { value: any; }) =>
            sk.value === updatedSkill.value ? updatedSkill : sk
          );
        }else {
          skills = [...current.skills, updatedSkill];
        }
    
        this.userSignal.set({
          ...current,
          skills,
        });
        this.alert.show('Skill updated successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't update skill", 'error');
      });
      
    }

    fetchUserOptions(username: string) {
      return this.http.get<any[]>(`${this.baseUrl}/users/overview`, { params: { search:username } });
    }

    updateRecommendation(recommendation: Recommendation) {
      this.http.put<any>(`${this.baseUrl}/recommendations`, recommendation).subscribe((updatedRecommendation) => {
        const current = this.userSignal();
        if (!current) return;

        let recommendations:any;
        const recommendationExists = current.recommendations.find((rec: { id: any; }) => rec.id === updatedRecommendation.id);
        
        if(recommendationExists){
          recommendations = current.recommendations.map((rec: { id: any; }) =>
            rec.id === updatedRecommendation.id ? updatedRecommendation : rec
          );
        }else {
          recommendations = [...current.recommendations, updatedRecommendation];
        }
        this.userSignal.set({
          ...current,
          recommendations,
        });
        this.alert.show('Recommendation updated successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't update recommendation", 'error');
      });
    }
  
    deleteRecommendation(id: string | number) {
      this.http.delete<void>(`${this.baseUrl}/recommendations/${id}`).subscribe(() => {
        const current = this.userSignal();
        if (!current) return;
    
        this.userSignal.set({
          ...current,
          recommendations: current.recommendations.filter(rec => rec.id !== id),
        });
        this.alert.show('Recommendation deleted successfully', 'success');
      },
      ()=> {
        this.alert.show("We couldn't delete recommendation", 'error');
      });
    }

    updateHeader(data: {
      name?: string;
      headline?: string;
      avatar?:File;
      bg?:File;
      action:string;
    }) {

      switch(data.action) {
        case 'name&headline':
          this.http.put<{ name: string; headline: string }>(`${this.baseUrl}/users/header`, { name: data.name, headline: data.headline }).subscribe(({ name, headline }) => {
            const current = this.userSignal();
            if (!current) return;
        
            this.userSignal.set({
              ...current,
              name,
              headline,
            });
            this.alert.show('Header information updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update header information", 'error');
          }
          );
          break;
        case 'avatar':
          const formDatAavatar = new FormData();
          formDatAavatar.append('file', data.avatar!);
          this.http.put<{ avatar: string }>(`${this.baseUrl}/users/avatar`, formDatAavatar ).subscribe(({ avatar }) => {
            const current = this.userSignal();
            if (!current) return;
        
            this.userSignal.set({
              ...current,
              avatar,
            });
            this.alert.show('Avatar updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update avatar", 'error');
          }
          );
          break;
        case 'bg':
          const formDataBg = new FormData();
          formDataBg.append('file', data.bg!);
          this.http.put<{ bg: string }>(`${this.baseUrl}/users/bg`, formDataBg).subscribe(({ bg }) => {
            const current = this.userSignal();
            if (!current) return;
        
            this.userSignal.set({
              ...current,
              bg,
            });
            this.alert.show('Background image updated successfully', 'success');
          },
          () => {
            this.alert.show("We couldn't update background image", 'error');
          }
          );
          break;
        default:
          this.alert.show("Invalid action for updating header", 'error');
          return;
      }
      
    }
}