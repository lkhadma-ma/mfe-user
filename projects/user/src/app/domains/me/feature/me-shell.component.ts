import { AfterViewInit, Component, OnInit, Signal, inject } from '@angular/core';
import { SectionComponent } from '@shared/ui/section/section.component';
import { MeComponent } from "../ui/me.component";
import { MeService } from '../data-access/me.service';
import { UserComplated } from '../data-access/user';


@Component({
  selector: 'mfe-user-post-shell',
  imports: [SectionComponent, MeComponent],
  template: `
    <app-section ngxClass="md:mfe-user-pt-[5rem] mfe-user-min-h-screen" >
      <div class="mfe-user-w-full mfe-user-mb-40 md:mfe-user-space-x-6 md:mfe-user-flex ">
        <div class="mfe-user-w-full">
        <mfe-user-me [me]="me"></mfe-user-me>
        </div>
        <div class="mfe-user-hidden mfe-user-w-[400px] lg:mfe-user-block">

        </div>
      </div>
    </app-section>
  `,
})
export class MeShellComponent implements OnInit {
  private meService = inject(MeService);
  me!: Signal<UserComplated | null>;

  async ngOnInit() {

      await this.meService.getMe().then(mes => {
        this.me = (() => mes) as Signal<UserComplated | null>;
      });

  }

}
