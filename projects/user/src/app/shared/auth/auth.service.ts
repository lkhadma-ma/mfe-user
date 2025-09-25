import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import type { AuthService as RemoteAuthService, StoredUser } from 'auth/AuthService';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private remote?: RemoteAuthService;
  private readyPromise?: Promise<RemoteAuthService>;

  constructor(private injector: EnvironmentInjector) {}

  private initRemote(): Promise<RemoteAuthService> {
    if (!this.readyPromise) {
      this.readyPromise = (async () => {
        const m = await loadRemoteModule({
          remoteName: 'auth',
          exposedModule: './AuthService'
        });
        this.remote = runInInjectionContext(this.injector, () => new m.AuthService()) as RemoteAuthService;
        return this.remote;
      })();
    }
    return this.readyPromise;
  }

  async authorizationHeader(retryDelay = 200, maxRetries = 10): Promise<string> {
    const remote = await this.initRemote();
    let header: string | null | undefined;
    let attempts = 0;
  
    do {
      header = await remote.authorizationHeader();
      if (header) break;
  
      attempts++;
      if (attempts >= maxRetries) {
        throw new Error('Auth header not ready after max retries');
      }
  
      await new Promise(r => setTimeout(r, retryDelay));
    } while (!header);
  
    return header;
  }
  

  async getUser$(): Promise<Observable<StoredUser | null>> {
    const remote = await this.initRemote();
    return remote.user$;
  }

  async logout() {
    const remote = await this.initRemote();
    return remote.logout();
  }
}
