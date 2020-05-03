import PlatformBrowserDynamic from "https://dev.jspm.io/@angular/platform-browser-dynamic@9.1.4";
import { AppModule } from "./app/app.module.ts";
const { platformBrowserDynamic } = PlatformBrowserDynamic;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
