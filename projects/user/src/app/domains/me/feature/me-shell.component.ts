import { AfterViewInit, Component } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { MeComponent } from "../ui/me.component";


@Component({
  selector: 'mfe-user-post-shell',
  imports: [SectionComponent, MeComponent],
  template: `
    <app-section ngxClass="md:mfe-user-pt-[5rem]">
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
        <mfe-user-me></mfe-user-me>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-block">

        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements AfterViewInit  {

  async ngAfterViewInit() {

    
  } 
}
