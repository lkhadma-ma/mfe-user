import { Component } from '@angular/core';

@Component({
  selector: 'mfe-user-loading',
  host: {
    class: 'mfe-user-w-full mfe-user-flex mfe-user-flex-col'
  },
  template: `
    @for (item of [1,2,3,4]; track $index) {
        <div class="mfe-user-mx-auto mfe-user-w-full mfe-user-rounded-md mfe-user-p-4">
            <div class="mfe-user-flex mfe-user-animate-pulse mfe-user-space-x-4 mfe-user-items-center">
                  <div class="mfe-user-size-14 mfe-user-rounded-2xl mfe-user-bg-gray-200"></div>
                  <div class="mfe-user-flex-1 mfe-user-space-y-4 mfe-user-py-1">
                    <div class="mfe-user-w-[--w] mfe-user-h-2 mfe-user-rounded mfe-user-bg-gray-200" [style.--w]="'50%'"></div>
                    <div class="mfe-user-w-[--w] mfe-user-h-2 mfe-user-rounded mfe-user-bg-gray-200" [style.--w]="'70%'"></div>                  </div>
            </div>
        </div>
    }
    
  `
})
export class LoadingComponent {

}
