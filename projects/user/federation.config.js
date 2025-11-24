const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'user',

  exposes: {
    // components
    './meRecent': './projects/user/src/app/domains/resume/feature/resume-shell.component.ts',
    './ShellMeComponent': './projects/user/src/app/domains/me/feature/shell-me.component.ts',

    // routes
    './APPLIED_JOBS_ROUTES':'./projects/user/src/app/domains/applied-jobs/feature/shell-applied-jobs.routes.ts',
    //'./ME_ROUTES':'./projects/user/src/app/domains/me/feature/me.routes.ts'
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket'
  ],

  features: {
    ignoreUnusedDeps: true
  }
  
});
