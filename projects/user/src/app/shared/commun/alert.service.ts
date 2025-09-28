import { loadRemoteModule } from '@angular-architects/native-federation';
import { EnvironmentInjector, Injectable, runInInjectionContext } from '@angular/core';
import type { AlertService as RemoteAlertService } from 'shared/AlertService';

@Injectable({providedIn: 'root'})
export class AlertService {


    constructor(private injector: EnvironmentInjector) { }
    
    private remote?: RemoteAlertService;
    private readyPromise?: Promise<RemoteAlertService>;


    private async initRemote(): Promise<RemoteAlertService> {
        if (!this.readyPromise) {
            this.readyPromise = (async () => {  
                const m = await loadRemoteModule({
                    remoteName: 'shared',
                    exposedModule: './AlertService'
                });
                this.remote = runInInjectionContext(this.injector, () => new m.AlertService()) as RemoteAlertService;
                return this.remote;
            })();
        }
        return this.readyPromise;
    }

    show(message: string, type: 'success' | 'error' | 'info' = 'info', timeout = 5000, icon?: string) {
        this.initRemote().then(remote => {
            remote.show(message, type, timeout, icon);
        });
    }

}

