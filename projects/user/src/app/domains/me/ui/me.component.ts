import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "./about.component";
import { ServiceComponent } from "./service.component";
import { ExperienceComponent } from "./experience.component";
import { Experience } from '../data-access/experience';
import { EducationComponent } from "./education.component";
import { Education } from '../data-access/education';
import { Certification } from '../data-access/certification';
import { CertificationComponent } from "./certification.component";
import { ProjectComponent } from "./project.component";
import { Project } from '../data-access/project';
import { Skill } from '../data-access/skill';
import { SkillComponent } from "./skill.component";
import { SkillsComponent } from "./skills.component";
import { RecommendationsTabComponent } from "./recommendation.component";
import { Recommendation } from '../data-access/recommendation';


@Component({
  selector: 'mfe-user-me',
  standalone: true,
  imports: [CommonModule, AboutComponent, ServiceComponent, ExperienceComponent, EducationComponent, CertificationComponent, ProjectComponent, SkillComponent, SkillsComponent, RecommendationsTabComponent],
  host: {
    class: 'mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4'
  },
  template: `
  <div class="mfe-user-border mfe-user-rounded-xl mfe-user-bg-white">
  <!-- Header background -->
  <div class="mfe-user-relative">
    <img
      class="mfe-user-w-full mfe-user-bg-cover mfe-user-bg-center mfe-user-max-h-[201px] mfe-user-border-t-4 mfe-user-rounded-t-md mfe-user-border-[#F8C77D]"
      src="https://media.licdn.com/dms/image/v2/D4D16AQFU48bJCFCpeA/profile-displaybackgroundimage-shrink_350_1400/B4DZfEuh9cGgAc-/0/1751352221970?e=1759363200&v=beta&t=MkadpjZvTY5OqjSXddVBTtfH5isLMrrOfdt6wQe5eY0"
      alt="bg"
    />
    <p
      class="mfe-user-absolute mfe-user-text-xs mfe-user-font-medium mfe-user-tracking-widest mfe-user-text-gray-300 mfe-user-uppercase mfe-user-left-1 mfe-user-top-2">
      premium
    </p>
  </div>

  <!-- Avatar -->
  <div class="mfe-user-flex mfe-user-items-center mfe-user-justify-center max-sm:-mfe-user-mt-[2.5rem] -mfe-user-mt-[6rem] mfe-user-ml-[2rem] max-sm:mfe-user-w-[5rem] max-sm:mfe-user-h-[5rem] mfe-user-h-[150px] mfe-user-w-[150px] mfe-user-rounded-full">
    <img
      class="mfe-user-z-10  mfe-user-w-full mfe-user-h-full mfe-user-border-white mfe-user-border-4 mfe-user-rounded-full"
      [src]="user()?.photoURL ?? 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_400_400/B4DZSaPw.bGcAg-/0/1737754612249?e=1761177600&v=beta&t=xr4e3pKtdCOzu7RPkzfsmj8Nb61mngstVryeiZQRFdE'"
      alt="Me"
    />
  </div>

  <!-- Name + Skills -->
  <div class="mfe-user-flex mfe-user-flex-col mfe-user-px-4 mfe-user-py-3">
    <h1 class="mfe-user-font-semibold mfe-user-tracking-wide sm:mfe-user-text-2xl">{{user()?.name ?? 'Oussama Yaagoub'}}</h1>
    <mfe-user-skills></mfe-user-skills>
  </div>

  
</div>

  <mfe-user-about [description]="description"></mfe-user-about>

  <mfe-user-service [services]="serviceline"></mfe-user-service>

  <mfe-user-experience [experiences]="experiences"></mfe-user-experience>

  <mfe-user-education [educations]="educations"></mfe-user-education>

  <mfe-user-certification [certifications]="certifications"></mfe-user-certification>

  <mfe-user-project [projects]="projects"></mfe-user-project>

  <mfe-user-skill [skills]="skills"></mfe-user-skill>

  <mfe-user-recommendation [givenRecommendations]="givenRecommendation" [receivedRecommendations]="recievedRecommendation"></mfe-user-recommendation>
  `
})
export class MeComponent {
  user = input<{ name: string; photoURL: string }>();
  showCaption = false;
  serviceline = `Web Development, Mobile Development, Cloud Solutions, DevOps, Consulting`;
  description = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eveniet optio quidem molestiae minus labore quasi officia temporibus voluptates consectetur aliquam explicabo quibusdam beatae, est numquam, error enim in nostrum?
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda eveniet optio quidem molestiae minus labore quasi officia temporibus voluptates consectetur aliquam explicabo quibusdam beatae, est numquam, error enim in nostrum? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ipsam, quo doloribus rerum obcaecati beatae. Ducimus aliquid, laudantium, quos, dolores velit mollitia sint ullam sunt fuga rerum nesciunt accusantium molestiae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Quisquam, quidem.`;
  experiences: Experience[] = [
    {
      id: '1',
      position: 'Senior Software Engineer',
      company: 'Satec',
      employmentType: 'Full-time',
      startDate: new Date('2021-06-01'),
      endDate: null,
      currently: true,
      location: 'Casablanca, Morocco',
      locationType: 'On-site',
      description: `Leading the development of scalable web applications using Angular and Node.js. Collaborating with cross-functional teams to design and implement new features. Mentoring junior developers and conducting code reviews to ensure code quality.`,
      skills: [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'Node.js' },
        { id: 3, name: 'TypeScript' },
        { id: 4, name: 'RESTful APIs' },
        { id: 5, name: 'Agile Methodologies' }
      ]
    },
    {
      id: '2',
      position: 'Software Engineer',
      company: 'Tech Solutions',
      employmentType: 'Full-time',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2021-05-31'),
      currently: false,
      location: 'Rabat, Morocco',
      locationType: 'Remote',
      description: `Developed and maintained web applications using React and Express.js. Worked closely with designers to implement user-friendly interfaces. Participated in sprint planning and contributed to continuous improvement initiatives.`,
      skills: [
        { id: 6, name: 'React' },
        { id: 7, name: 'Express.js' },
        { id: 8, name: 'JavaScript' },
        { id: 9, name: 'MongoDB' },
        { id: 10, name: 'Git' }
      ]
    }
  ];
  educations: Education[] = [
    {
      id: 1,
      school: "Stanford University",
      description: "Studied computer science with a focus on AI and distributed systems.",
      activities: "AI Club, Programming Competitions, Research Assistant",
      grade: 3.9,
      startDate: new Date("2018-09-01"),
      endDate: new Date("2022-06-15"),
      fieldOfStudy: "Computer Science",
      degree: "Bachelor of Science",
      skills: [
        { id: 101, name: "Java" },
        { id: 102, name: "Spring Boot" },
        { id: 103, name: "Machine Learning" }
      ]
    },
    {
      id: 2,
      school: "MIT",
      description: "Master’s degree in Software Engineering with emphasis on cloud systems.",
      activities: "Cloud Computing Club, Teaching Assistant",
      grade: 4.0,
      startDate: new Date("2022-09-01"),
      endDate: new Date("2024-06-30"),
      fieldOfStudy: "Software Engineering",
      degree: "Master of Science",
      skills: [
        { id: 201, name: "Docker" },
        { id: 202, name: "Kubernetes" },
        { id: 203, name: "TypeScript" }
      ]
    }
  ];
  certifications: Certification[] = [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect – Associate',
      organization: 'Amazon Web Services (AWS)',
      url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      issueDate: new Date('2022-05-15'),
      expirationDate: new Date('2025-05-15'),
      skills: [
        { id: 1, name: 'AWS' },
        { id: 2, name: 'Cloud Architecture' },
        { id: 3, name: 'Security' }
      ]
    },
    {
      id: 2,
      name: 'Certified Kubernetes Administrator (CKA)',
      organization: 'Cloud Native Computing Foundation (CNCF)',
      url: 'https://www.cncf.io/certification/cka/',
      issueDate: new Date('2023-03-10'),
      expirationDate: null,
      skills: [
        { id: 4, name: 'Kubernetes' },
        { id: 5, name: 'Containerization' },
        { id: 6, name: 'DevOps' }
      ]
    }
  ]
  projects:Project[] = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'Developed a full-featured e-commerce platform with user authentication, product management, and payment integration using Angular and Node.js.',
      url: 'https://www.example.com/ecommerce',
      skills: [
        { id: 1, name: 'Angular' },
        { id: 2, name: 'Node.js' },
        { id: 3, name: 'TypeScript' }
      ]
    },
    {
      id: 2,
      name: 'Social Media App',
      description: 'Created a social media application with real-time chat, photo sharing, and user profiles using React and Firebase.',
      url: 'https://www.example.com/socialmedia',
      skills: [
        { id: 4, name: 'React' },
        { id: 5, name: 'Firebase' },
        { id: 6, name: 'JavaScript' }
      ]
    }
  ]
  skills:Skill[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'Node.js' },
    { id: 3, name: 'TypeScript' },
    { id: 4, name: 'React' },
    { id: 5, name: 'Firebase' },
    { id: 6, name: 'JavaScript' },
    { id: 7, name: 'Docker' },
    { id: 8, name: 'Kubernetes' },
    { id: 9, name: 'AWS' },
    { id: 10, name: 'Git' },
    { id: 11, name: 'MongoDB' },
    { id: 12, name: 'Express.js' },
    { id: 13, name: 'RESTful APIs' },
    { id: 14, name: 'Agile Methodologies' },
    { id: 15, name: 'Java' },
    { id: 16, name: 'Spring Boot' },
    { id: 17, name: 'Machine Learning' }
  ]

  givenRecommendation: Recommendation[] = [
    {
      id: 1,
      user: {
        username: 'oussama.yaagoub',
        name: 'Oussama Yaagoub',
        headline: 'Senior Software Engineer',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_100_100/B4DZSaPw.bGcAU-/0/1737754612249?e=1761782400&v=beta&t=mm5YHzEItHl1P4ZhrjFXay1H619TS0NhfozbYgV09X0'
      },
      relationship: {
        username: 'jane.smith',
        name: 'Jane Smith',
        headline: 'Project Manager at Tech Solutions',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4E03AQF_e63Ei7ggZQ/profile-displayphoto-scale_100_100/B4EZkRBVVCIUAg-/0/1756927198989?e=1761782400&v=beta&t=r17dv6HxHzdthR2QPz507pvj4NqBDdv3giWQH7NZB8s'   
      },
      recommendation: 'Jane is an exceptional project manager who excels at coordinating teams and ensuring timely delivery of projects. Her leadership and communication skills are top-notch.',
      position: 'Software Engineer',
      createdAt: new Date('2022-11-15')
    },
    {
      id: 2,
      user: {
        username: 'oussama.yaagoub',
        name: 'Oussama Yaagoub',
        headline: 'Senior Software Engineer',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_100_100/B4DZSaPw.bGcAU-/0/1737754612249?e=1761782400&v=beta&t=mm5YHzEItHl1P4ZhrjFXay1H619TS0NhfozbYgV09X0'
      },
      relationship: {
        username: 'john.doe',
        name: 'John Doe',
        headline: 'CTO at Innovative Apps',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHigBNGVqRnOA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723639491706?e=1761782400&v=beta&t=DnOLUvajdJf8761Cbsj-gJ8f01dFAJ4ck-Jqpfs7YK0'   
      },
      recommendation: 'John is a visionary CTO who drives innovation and fosters a culture of excellence. His strategic thinking and technical expertise have been instrumental in the success of our company.',
      position: 'Senior Software Engineer at Innovative Apps',
      createdAt: new Date('2023-06-20')
    }
  ]
  recievedRecommendation: Recommendation[] = [
    {
      id: 1,
      user: {
        username: 'jane.smith',
        name: 'Jane Smith',
        headline: 'Project Manager at Tech Solutions',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4E03AQF_e63Ei7ggZQ/profile-displayphoto-scale_100_100/B4EZkRBVVCIUAg-/0/1756927198989?e=1761782400&v=beta&t=r17dv6HxHzdthR2QPz507pvj4NqBDdv3giWQH7NZB8s'   
      },
      relationship: {
        username: 'oussama.yaagoub',
        name: 'Oussama Yaagoub',
        headline: 'Senior Software Engineer',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_100_100/B4DZSaPw.bGcAU-/0/1737754612249?e=1761782400&v=beta&t=mm5YHzEItHl1P4ZhrjFXay1H619TS0NhfozbYgV09X0'
      },
      recommendation: 'Oussama is a highly skilled software engineer with a strong work ethic. He consistently delivers high-quality code and is a great team player.',
      position: 'Software Engineer at Tech Solutions',
      createdAt: new Date('2022-11-15')
    },
    {
      id: 2,
      user: {
        username: 'john.doe',
        name: 'John Doe',
        headline: 'CTO at Innovative Apps',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHigBNGVqRnOA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723639491706?e=1761782400&v=beta&t=DnOLUvajdJf8761Cbsj-gJ8f01dFAJ4ck-Jqpfs7YK0'   
      },
      relationship: {
        username: 'oussama.yaagoub',
        name: 'Oussama Yaagoub',
        headline: 'Senior Software Engineer',
        photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQHsr6KATZEHSQ/profile-displayphoto-shrink_100_100/B4DZSaPw.bGcAU-/0/1737754612249?e=1761782400&v=beta&t=mm5YHzEItHl1P4ZhrjFXay1H619TS0NhfozbYgV09X0' 
      },
      recommendation: 'Oussama is a visionary software engineer who consistently pushes the boundaries of what is possible. His innovative solutions have had a significant impact on our projects.',
      position: 'Senior Software Engineer at Innovative Apps',
      createdAt: new Date('2023-06-20')
    }
  ]

}
