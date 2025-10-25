import "./chunk-Y5RQAIA6.js";

// projects/user/src/bootstrap.ts
import { bootstrapApplication } from "@angular/platform-browser";

// projects/user/src/app/app.config.ts
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

// projects/user/src/app/app.routes.ts
var routes = [];

// projects/user/src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

// projects/user/src/app/app.ts
import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import * as i0 from "@angular/core";
var App = class _App {
  title = signal("user", ...ngDevMode ? [{ debugName: "title" }] : []);
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ i0.\u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      i0.\u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [RouterOutlet], template: "\n<router-outlet />\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.\u0275setClassDebugInfo(App, { className: "App", filePath: "projects/user/src/app/app.ts", lineNumber: 10 });
})();

// projects/user/src/bootstrap.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=chunk-VKU4N7LC.js.map
