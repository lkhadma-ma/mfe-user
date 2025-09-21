import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { AboutComponent } from "./about.component";
import { ServiceComponent } from "./service.component";
import { ExperienceComponent } from "./experience.component";
import { Experience } from '../data-access/experience';


@Component({
  selector: 'mfe-user-me',
  standalone: true,
  imports: [CommonModule, SkillsComponent, AboutComponent, ServiceComponent, ExperienceComponent],
  host: {
    class: 'mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4'
  },
  template: `
  <div class="mfe-user-border mfe-user-rounded-lg mfe-user-bg-white">
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
  <div class="mfe-user-flex mfe-user-items-center mfe-user-justify-center max-sm:-mfe-user-mt-[2.5rem] -mfe-user-mt-[5rem] mfe-user-ml-[2rem] max-sm:mfe-user-w-[5rem] max-sm:mfe-user-h-[5rem] mfe-user-h-[130px] mfe-user-w-[130px] mfe-user-rounded-full">
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

}
