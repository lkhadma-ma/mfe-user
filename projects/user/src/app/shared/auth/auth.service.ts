import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import type { AuthService as RemoteAuthService, StoredUser } from 'auth/AuthService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private remote?: RemoteAuthService;

  constructor(private injector: EnvironmentInjector) {}

  private async initRemote(): Promise<RemoteAuthService> {
    if (!this.remote) {
      const m = await loadRemoteModule({
        remoteName: 'auth',
        exposedModule: './AuthService'
      });

      this.remote = runInInjectionContext(this.injector, 
        () => new m.AuthService()) as RemoteAuthService;
    }
    return this.remote;
  }

  async getUser$(): Promise<Observable<StoredUser | null>> {
    const remote = await this.initRemote();
    return remote.user$;
  }

  async logout() {
    const remote = await this.initRemote();
    return remote.logout();
  }

  async authorizationHeader(): Promise<string | null> {
    const remote = await this.initRemote();
    return remote.authorizationHeader();
  }
}
