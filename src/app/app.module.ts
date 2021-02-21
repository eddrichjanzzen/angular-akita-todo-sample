import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './modules/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CustomMaterialModule,
    CoreModule,
    AuthenticationModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
