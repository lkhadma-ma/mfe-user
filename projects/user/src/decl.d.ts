declare module 'auth/AuthService' {
  import {
    AuthService,
    StoredUser,
  } from 'projects/auth-lib/src/lib/auth.service';
  export { AuthService, StoredUser };
}
declare module 'shared/AlertService' {
  import { AlertService } from 'projects/shared-lib/src/lib/alert.service';
  export { AlertService };
}
