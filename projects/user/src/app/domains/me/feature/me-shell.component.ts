import { AfterViewInit, Component } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';


@Component({
  selector: 'app-post-shell',
  imports: [SectionComponent],
  template: `
    <app-section ngxClass="md:pt-[5rem]">
      <div class="mb-40 md:space-x-6 md:flex ">
        <div>
hola
        </div>
        <div class="hidden w-[300px] lg:block">

        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements AfterViewInit  {

  async ngAfterViewInit() {

    
  } 
}
