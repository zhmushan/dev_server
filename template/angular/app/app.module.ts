import { NgModule } from "https://cdn.pika.dev/@angular/core@9.1.4";
import PlatformBrowser from "https://dev.jspm.io/@angular/platform-browser@9.1.4";
import { AppComponent } from "./app.component.ts";
const { BrowserModule } = PlatformBrowser;

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
