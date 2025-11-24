import { Component, OnInit, inject, computed, ViewChild, ViewContainerRef, effect, Injector } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { loadRemoteModule } from '@angular-architects/native-federation';



@Component({
  selector: 'mfe-user-me-shell',
  imports: [
    SectionComponent,
  ],
  template: `
    <mfe-user-section ngxClass="md:mfe-user-pt-[5rem]" >
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
          <div class="mfe-user-w-full mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">
          
          </div>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-flex mfe-user-flex-col mfe-user-space-y-4">

        </div>
      </div>
    </mfe-user-section>
  `,
})
export class ShellAppliedJobsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private injector = inject(Injector);
  

  ngOnInit() {

    
  }


}
