import { TokenInterceptor } from './../../../../../../../../02_Esercizi e Progetti/01_Progetti/Capstone/healthdesk-fe/src/app/auth/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { tokenInterceptor } from './auth/token.interceptor';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapArrowDown,
  bootstrapArrowUp,
  bootstrapFloppy,
  bootstrapSearch,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgIconsModule.withIcons({
      bootstrapSearch,
      bootstrapFloppy,
      bootstrapArrowUp,
      bootstrapArrowDown,
      bootstrapXLg,
    }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
